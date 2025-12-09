# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Arctic Web** is a Turborepo monorepo containing a Next.js frontend and NestJS backend with shared TypeScript packages. The project uses PNPM workspaces and includes internationalization (i18n), theming, and Redux state management.

## Development Commands

### Root-level Commands (run from project root)
- `pnpm dev` - Start all dev servers concurrently (frontend on :3000, backend on :3001)
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Run ESLint across all workspaces
- `pnpm format` - Format code with Prettier

### Frontend (apps/web)
Navigate to `apps/web` for these commands:
- `pnpm dev` - Start Next.js dev server with Turbopack
- `pnpm build` - Production build (outputs to `.next/`)
- `pnpm start` - Start production server
- `pnpm lint` - Run Next.js linter

### Backend (apps/api)
Navigate to `apps/api` for these commands:
- `pnpm dev` or `pnpm start:dev` - Start NestJS in watch mode
- `pnpm build` - Build to `dist/` directory
- `pnpm start` - Start without watch mode
- `pnpm start:prod` - Start production build (runs `dist/main.js`)
- `pnpm test` - Run Jest unit tests
- `pnpm test:e2e` - Run end-to-end tests
- `pnpm test:watch` - Run tests in watch mode

## Architecture

### Monorepo Structure
```
apps/
  web/          # Next.js 16 frontend
  api/          # NestJS backend
packages/
  types/        # Shared TypeScript types (referenced as @acw/types)
  shared/       # Shared utilities/components (currently minimal)
```

The root `tsconfig.json` uses TypeScript project references to link all workspaces. Turborepo manages build orchestration with task dependencies defined in `turbo.json`.

### Frontend Architecture (apps/web)

**Internationalization:**
- Uses `next-intl` for i18n with UK (Ukrainian) as default locale
- Routing: `apps/web/src/i18n/routing.ts` defines available locales (uk, en)
- Translations: `apps/web/messages/{locale}.json`
- Middleware: `apps/web/src/middleware.ts` handles locale detection and routing
- All routes are prefixed with locale: `/{locale}/...`

**State Management:**
- Redux Toolkit with a single store in `apps/web/src/stores/store.ts`
- Currently manages settings slice (theme, language)
- Store Provider: Wraps app in `apps/web/src/stores/providers/StoreProvider.tsx`
- Hooks: `apps/web/src/stores/hooks.ts` exports typed `useAppDispatch` and `useAppSelector`

**Theming:**
- CSS-based theming with light/dark modes
- Theme styles: `apps/web/src/shared/styles/themes.css`
- Theme is persisted to localStorage
- Initial theme script in `apps/web/src/app/[locale]/layout.tsx` prevents flash of unstyled content
- Theme state managed via Redux settings slice

**Code Organization:**
- `features/` - Feature-specific components (e.g., ChangeLang, ChangeTheme)
- `shared/ui/` - Reusable UI components (UiLogo, UiSelect, UiSwitch)
- `shared/icons/` - SVG icon components
- `shared/config/` - Environment variable loading
- `shared/seo/` - SEO metadata configuration
- `stores/` - Redux store, slices, and selectors

**Next.js Configuration:**
- Output mode: `standalone`
- Uses `next-intl` plugin
- Turbopack enabled for dev mode
- Tailwind CSS v4 for styling

### Backend Architecture (apps/api)

**NestJS Structure:**
- Entry point: `apps/api/src/main.ts` (listens on port 4000 by default)
- Module-based architecture with `AppModule` as root
- MongoDB connection via Mongoose (`@nestjs/mongoose`)
- CORS enabled for all origins with credentials

**Environment Configuration:**
- Centralized in `apps/api/src/config/env.ts`
- Required vars: `MONGODB_URI`, `MONGODB_DB_NAME`
- Optional: `PORT` (defaults to 4000)
- Uses helper function that throws on missing required variables

**Modules:**
- `modules/kv/` - Key-value store module (example implementation)
  - Schema defined in `kv.schema.ts`
  - Service layer in `kv.service.ts`
  - REST controller in `kv.controller.ts`

**Testing:**
- Jest configuration in `apps/api/package.json`
- Unit tests: `*.spec.ts` files
- E2E tests: `test/` directory with separate config (`test/jest-e2e.json`)

### Shared Packages

**@acw/types (packages/types):**
- Exports TypeScript types used across frontend and backend
- Example: `CLang` constant and `TLang` type for language codes
- Import as: `import { CLang } from '@acw/types'`

**packages/shared:**
- Currently minimal, intended for shared utilities/components

## Environment Variables

Create a `.env` file in the project root:

```env
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/myapp
MONGODB_DB_NAME=myapp
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production, use MongoDB Atlas URI:
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.example.mongodb.net/myapp
```

## Key Technical Details

- **Package Manager:** PNPM 10.20.0 (specified in `package.json`)
- **TypeScript:** v5.9.3 with strict mode enabled
- **Build Tool:** Turborepo with task caching (dev tasks have `cache: false`)
- **Frontend Framework:** Next.js 16 with App Router
- **Backend Framework:** NestJS with Express platform
- **Database:** MongoDB via Mongoose ODM
- **Styling:** Tailwind CSS v4 with custom themes
- **Font:** Mulish (Google Fonts) with Cyrillic and Latin subsets

## Important Notes

- The monorepo uses TypeScript project references - changes to `packages/*` are automatically picked up by dependent apps
- Frontend uses standalone output mode, suitable for deployment
- All locale-aware routes must be prefixed with `[locale]` dynamic segment
- Theme initialization script must run before React hydration to prevent flashing
