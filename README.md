# CodeBase

An internal repository of universal components and patterns designed for reuse across real projects.

---

## 🎯 Overview

We are building **CodeBase** — an internal site and repository containing universal components and patterns designed for reuse across real projects. The goal is to standardize development, speed up delivery, and eliminate duplicated logic across teams.

### Component Requirements

#### 1. Maximum Universality

- Suitable for any company project
- No dependency on specific designs, business logic, or external systems

#### 2. Well-designed, deep logic

- Clean, generic, and stable API
- Supports common usage variations without code changes
- Handles typical states, interactions, and edge cases

#### 3. Minimal Styling

- Styles serve only as a basic example
- All styling can be easily replaced or extended
- Functionality comes first; UI is not enforced

#### 4. "Building Block" Approach

- Components should be easy to reuse, adapt, or extend without modifying the core
- Previews in CodeBase show possible variations, not final design

---

## 📁 Project Structure

<pre>
code-base/
├── apps/                     # Main applications
│   ├── web/                  # Frontend (Next.js)
│   └── api/                  # Backend (NestJS)
│
├── packages/                 # Shared packages
│   ├── shared/               # Shared utilities
│   └── types/                # Shared TypeScript types
│
├── .env                      # Environment variables
│
├── .gitignore                # Git ignore rules
├── .prettierrc               # Prettier config
├── .prettierignore           # Prettier ignore
│
├── .dockerignore             # Docker ignore
├── docker-compose.dev.yml    # Dev environment in Docker
├── docker-compose.yml        # Production environment in Docker
│
├── package.json              # Scripts and dependencies
├── pnpm-lock.yaml
├── pnpm-workspace.yaml       # Monorepo workspace
├── tsconfig.json             # TypeScript config with project references
└── turbo.json                # Turborepo config
</pre>

---

## ⚙️ Scripts

| Command       | Description                        |
| ------------- | ---------------------------------- |
| `pnpm dev`    | Run dev servers                    |
| `pnpm build`  | Build all applications             |
| `pnpm lint`   | Lint code                          |
| `pnpm format` | Format code with Prettier          |

---

## 🧰 Technologies

- 🔷 **Next.js 16** — Frontend with App Router and React 19
- 🟦 **NestJS** — Backend with MongoDB
- ✨ **TypeScript** — Type safety across the project
- 🚀 **Turborepo** — Monorepo management
- 🎨 **TailwindCSS 4** — Utility-first styling
- 🧹 **Prettier + ESLint** — Code formatting and quality
- 📦 **PNPM Workspaces** — Dependency management

---

## 🚀 Quick Start

### 1️⃣ Installation

Clone the repository:

```bash
git clone https://github.com/Arctic-Web-Agency/code-base.git
cd code-base
```

---

### 2️⃣ Docker Setup

Ensure you have installed:

- **Docker**
- **Docker Compose**

---

### 3️⃣ Create `.env` file in root

Example content:

```env
NODE_ENV=production
WEB_PORT=3000
API_PORT=3001
MONGODB_DB_NAME=myapp
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> For production, specify a real Atlas URI:
>
> ```
> MONGODB_URI=mongodb+srv://user:pass@cluster.example.mongodb.net/myapp
> ```

---

### 4️⃣ Run for Development (with local MongoDB)

```bash
docker compose -f docker-compose.dev.yml up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)
- MongoDB: port 27017 (for verification if needed)

Stop:

```bash
docker compose -f docker-compose.dev.yml down
```

---

### 5️⃣ Run for Production (Atlas DB)

1. Add your Atlas `MONGODB_URI` to `.env`
2. Run:

    ```bash
    docker compose up --build -d
    ```

3. Open:
    - Frontend → [http://localhost:3000](http://localhost:3000)
    - Backend → [http://localhost:3001](http://localhost:3001)

Stop:

```bash
docker compose down
```

---

### 6️⃣ You're All Set

- All code (frontend, backend, shared packages) is already connected through **Turborepo**
- No need to install anything locally
- All dependencies are installed inside containers

---

## 📚 Documentation

For detailed development guidelines, see [CLAUDE.md](./CLAUDE.md)
