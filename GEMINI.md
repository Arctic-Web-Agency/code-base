# Gemini Project Context: CodeBase

This document provides a comprehensive overview of the CodeBase project, its structure, and development conventions to be used as a context for AI-powered development with Gemini.

## Project Overview

CodeBase is a monorepo project built with PNPM workspaces and Turborepo. It contains a collection of universal components and patterns intended for reuse across various projects. The project is structured as a full-stack application with a Next.js frontend and a NestJS backend.

*   **Frontend (`apps/web`):** A Next.js application using React 19 and TailwindCSS for styling. It serves as a showcase for the reusable components.
*   **Backend (`apps/api`):** A NestJS application providing API endpoints. It uses MongoDB as its database.
*   **Shared Packages (`packages/*`):** Contains shared code and types for use across the frontend and backend, ensuring consistency.
*   **Tooling:** The project is standardized with TypeScript, ESLint for linting, and Prettier for code formatting.

## Building and Running

The project is designed to be run within a Docker environment.

### Key Scripts (run from the root directory)

*   `pnpm dev`: Starts the development servers for both the web and API applications using Turborepo.
*   `pnpm build`: Builds the applications for production.
*   `pnpm lint`: Lints the entire codebase.
*   `pnpm format`: Formats the entire codebase using Prettier.

### Running with Docker

1.  **Create a `.env` file** in the root of the project. An example is provided in the `README.md`.
2.  **For development (with a local MongoDB instance):**
    ```bash
    docker compose -f docker-compose.dev.yml up --build
    ```
    *   Frontend will be available at `http://localhost:3000`.
    *   Backend will be available at `http://localhost:3001`.

3.  **For production (with a remote MongoDB, like Atlas):**
    ```bash
    docker compose up --build -d
    ```

## Development Conventions

*   **Monorepo Structure:** All code is within the `apps` and `packages` directories. Turborepo orchestrates the dependencies and build process.
*   **Code Style:** Code formatting is enforced by Prettier. Run `pnpm format` before committing.
*   **Linting:** ESLint is used for static code analysis. Run `pnpm lint` to check for issues.
*   **Dependencies:** Use `pnpm` to manage dependencies. For example, to add a dependency to the web app: `pnpm --filter web add <package-name>`.
*   **Environment Variables:** All environment variables should be defined in the `.env` file at the project root. The frontend has access to variables prefixed with `NEXT_PUBLIC_`.
*   **Types:** Shared types between the `api` and `web` apps should be placed in the `packages/types` directory.
