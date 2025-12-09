# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by Turborepo and PNPM workspaces; root configs live beside `pnpm-workspace.yaml`, `tsconfig.json`, and `turbo.json`.
- Apps: `apps/web` (Next.js frontend) and `apps/api` (NestJS backend). Use `src/` within each app for feature code; public assets stay under each app’s `public/`.
- Shared code: `packages/shared` for reusable UI pieces and `packages/types` for cross-cutting TypeScript contracts. Prefer importing from these packages instead of duplicating logic.

## Build, Test, and Development Commands
- `pnpm dev` — runs all dev servers via Turbo (`web` on `:3000`, `api` on `:3001`).
- `pnpm --filter web dev` / `pnpm --filter api start:dev` — work on a single app.
- `pnpm build` — builds all apps; outputs land in `.next/` (web) and `dist/` (api).
- `pnpm lint` — runs linting for every package; `pnpm format` — Prettier write across the repo.
- API tests: `pnpm --filter api test` (unit), `test:watch`, `test:cov`, or `test:e2e` for the e2e suite.

## Coding Style & Naming Conventions
- Language: TypeScript everywhere. Keep modules small and co-locate tests with the code when practical.
- Prettier: single quotes, trailing commas (es5), tabs set to 4 spaces, semicolons enforced, `printWidth` 80; Tailwind class sorting is enabled for `apps/web`.
- ESLint: Next.js rules in `apps/web`; NestJS/TypeScript rules in `apps/api`. Resolve lint warnings before pushing.
- Naming: camelCase for variables/functions, PascalCase for React components and Nest providers, SCREAMING_SNAKE_CASE for constants. Prefer `*.tsx` for React components and `*.spec.ts` for tests.

## Testing Guidelines
- Backend: Jest with `*.spec.ts` under `apps/api/src`; coverage output lives in `apps/api/coverage` when using `test:cov`. Add unit specs alongside new providers/controllers and mock external services.
- Frontend: add component/integration tests near the feature (Testing Library + Jest is the expected stack even if not yet scaffolded). At minimum, cover critical UI states and locale-dependent rendering.
- Keep tests deterministic; avoid live network/DB calls by stubbing or using in-memory fixtures.

## Commit & Pull Request Guidelines
- Commits: concise, imperative subjects (e.g., `Add user locale switcher`); group related changes and keep noise low.
- PRs: include a summary of the change, linked issue/task, testing notes (`pnpm test`, `pnpm lint`, etc.), and screenshots or API examples when UI or contract changes occur.
- Ensure `.env` values are provided locally but never committed; document new env keys in PR descriptions and update `.env.example` if added.
