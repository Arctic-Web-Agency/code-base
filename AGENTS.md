# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by Turborepo with `pnpm` workspaces: apps live in `apps/` (`web` for Next.js, `api` for NestJS), shared code in `packages/` (`shared` UI utilities, `types` for shared TypeScript contracts).
- Root configs (`tsconfig.json`, `turbo.json`, `.prettierrc`) define cross-project standards; app-specific configs sit under each app (for example `apps/web/tsconfig.json`, `apps/api/tsconfig.json`).
- Keep features colocated: React feature components under `apps/web/src/features`, Redux state under `apps/web/src/stores`, and Nest modules/controllers under `apps/api/src`.

## Build, Test, and Development Commands
- Run everything: `pnpm dev` (all dev servers), `pnpm build` (full build), `pnpm lint` (ESLint across workspace), `pnpm format` (Prettier).
- App-specific examples: `pnpm --filter web dev` (Next.js with Turbopack), `pnpm --filter api start:dev` (NestJS watch mode).
- Tests: `pnpm --filter api test` for unit tests, `pnpm --filter api test:cov` for coverage, `pnpm --filter api test:e2e` for e2e suites.
- Containers: `docker compose -f docker-compose.dev.yml up --build` for local stack; use `docker-compose.yml` for production-like runs.

## Coding Style & Naming Conventions
- Prettier rules: 4-space indent, single quotes, semicolons, trailing commas (es5), 80-char width; Tailwind plugin enabled for web app formatting.
- TypeScript strict mode is on; prefer explicit types over `any`. Keep imports ordered and dead code removed.
- Naming: React components and files in `features/` use PascalCase (e.g., `ChangeTheme.tsx`); Redux slices live under `stores/` and end with `Slice`. NestJS files follow `*.module.ts`, `*.controller.ts`, `*.service.ts`.

## Testing Guidelines
- API uses Jest with `*.spec.ts` (see `apps/api/src/app.controller.spec.ts`). Place unit tests near the code under test.
- Aim for meaningful coverage via `test:cov`; add e2e cases when touching controllers/routes.
- For web features, add React tests alongside components (e.g., `ChangeTheme.spec.tsx`) and favor integration-style checks over snapshots.

## Commit & Pull Request Guidelines
- Commits: keep short, imperative subjects (e.g., `api: add health check`, `web: fix locale middleware`); group related changes and avoid mixed concerns.
- Pull requests: include a succinct summary, testing notes (`pnpm --filter api test`, `pnpm --filter web lint`), linked issue/feature, and UI screenshots or Loom when UI changes occur.
- Ensure new code passes `pnpm lint` and relevant tests before requesting review.

## Security & Configuration
- Never commit secrets; `.env` belongs at repo root and is excluded from Git. Keep API/DB credentials out of sample configs.
- When adding new config values, document them in `.env` (or an example file) and wire them through `@nestjs/config` or Next.js runtime envs as appropriate.
