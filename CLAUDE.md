# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Arctic Web (acw) is a Turborepo monorepo with a Next.js frontend, NestJS backend, and shared packages. The project is containerized with Docker and uses pnpm workspaces.

## Tech Stack

- **Frontend**: Next.js 16 with App Router, React 19, TailwindCSS 4, Redux Toolkit, next-intl for i18n
- **Backend**: NestJS with MongoDB (Mongoose), ConfigModule for environment management
- **Monorepo**: Turborepo with pnpm workspaces
- **Package Manager**: pnpm 10.20.0
- **TypeScript**: Project references for cross-package type checking

## Common Commands

### Development

```bash
# Run all apps in dev mode
pnpm dev

# Run specific app
pnpm --filter ./apps/web dev
pnpm --filter ./apps/api dev

# API-specific dev commands
cd apps/api
pnpm start:dev          # Standard dev mode
pnpm start:debug        # Debug mode with watch
```

### Build and Lint

```bash
# Build all apps (Turbo will handle dependencies)
pnpm build

# Lint all apps
pnpm lint

# Format code with Prettier
pnpm format

# Build specific app
pnpm --filter ./apps/web build
pnpm --filter ./apps/api build
```

### Testing (API)

```bash
cd apps/api
pnpm test              # Run unit tests
pnpm test:watch        # Watch mode
pnpm test:cov          # Coverage report
pnpm test:e2e          # E2E tests
pnpm test:debug        # Debug tests
```

### Docker

```bash
# Development with local MongoDB
docker compose -f docker-compose.dev.yml up --build

# Production (requires Atlas MongoDB URI in .env)
docker compose up --build -d

# Stop containers
docker compose -f docker-compose.dev.yml down
docker compose down
```

## Architecture

### Monorepo Structure

The project uses TypeScript project references (`tsconfig.json` at root) to ensure proper type checking across packages:

- `apps/web` → Next.js frontend (depends on `@acw/types`)
- `apps/api` → NestJS backend
- `packages/types` → Shared TypeScript types (`@acw/types`)
- `packages/shared` → Shared utilities (`@acw/shared`)

### Frontend Architecture (apps/web)

**App Router Pattern**: Uses Next.js App Router with internationalized routing via `[locale]` dynamic segment.

**State Management**: Redux Toolkit with custom hooks (`@/stores/hooks`), providers in `StoreProvider`.

**Feature-Sliced Design**: Features organized in `src/features/` (e.g., `change-theme`, `change-lang`), shared UI in `src/shared/ui/`.

**Theme System**: Client-side theme switching with localStorage persistence and SSR flash prevention via inline script in layout.

**Internationalization**: next-intl with locale routing, messages in `messages/` directory.

**Path Aliases**: Uses `@/` for `src/` directory (configured in `tsconfig.json`).

### Backend Architecture (apps/api)

**Module Pattern**: NestJS modules in `src/modules/` (e.g., `kv` module for key-value storage).

**Database**: MongoDB with Mongoose, connection configured in `app.module.ts` using environment variables.

**Configuration**: Environment variables loaded via `@nestjs/config` and typed in `src/config/env.ts`.

**CORS**: Enabled globally with credentials support in `main.ts`.

### Shared Packages

**@acw/types**: TypeScript types exported from `src/index.ts`, consumed directly (no build step).

**@acw/shared**: Compiled utilities with build step (`tsc -b`), outputs to `dist/`.

### Docker Architecture

**Development**: Uses `docker-compose.dev.yml` with local MongoDB container, hot reloading enabled via polling for compatibility.

**Production**: Uses `docker-compose.yml` expecting external MongoDB Atlas URI.

**Build Strategy**: Multi-stage Dockerfiles for both apps, using pnpm with frozen lockfile and workspace filtering.

## Environment Variables

Required variables in `.env`:

```env
NODE_ENV=production
WEB_PORT=3000
API_PORT=3001
MONGODB_URI=mongodb://localhost:27017  # or Atlas URI for production
MONGODB_DB_NAME=myapp
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Code Style

- **Prettier**: Single quotes, 4-space tabs, semicolons, 80-char width
- **Tailwind Plugin**: Applied only to `apps/web` files
- **ESLint**: Configured per-app (Next.js for web, TypeScript ESLint for api)

## Key Patterns

### Adding a New API Module

1. Create module directory in `apps/api/src/modules/`
2. Create module, controller, service, and schema files
3. Import module in `app.module.ts`

### Adding a Shared Type

1. Export from `packages/types/src/index.ts`
2. Use in web with `@acw/types` import
3. No build step required (direct TypeScript consumption)

### Adding a Redux Slice

1. Create slice in `apps/web/src/stores/<name>/`
2. Export from `index.ts` with selectors
3. Register in `store.ts`
4. Use via custom hooks from `@/stores/hooks`

### Working with Internationalization

1. Add translations to `apps/web/messages/<locale>.json`
2. Use `useTranslations()` hook in components
3. Locale routing handled automatically via middleware
