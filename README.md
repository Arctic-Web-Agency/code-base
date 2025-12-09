# Arctic Web

Цей репозиторій використовує **Turborepo** для організації монорепозиторію з фронтендом, бекендом і спільними пакетами.

---

## 📁 Структура проєкту

<pre>
acw/
├── apps/                     # Основні застосунки
│   ├── web/                  # Фронтенд (Next.js)
│   └── api/                  # Бекенд (NestJS)
│
├── packages/                 # Спільні пакети
│   ├── shared/               # Компоненти інтерфейсу
│   └── types/                # Спільні типи TypeScript
│
├── .env                      # Змінні середовища
│
├── .gitignore                # Правила ігнорування для Git
├── .prettierrc               # Конфіг Prettier
├── .prettierignore           # Ігнор для Prettier
│
├── package.json              # Скрипти та загальні залежності
├── pnpm-lock.yaml
├── pnpm-workspace.yaml       # Робоча область для монорепозиторію
├── tsconfig.json             # Головний конфіг TypeScript з project references
└── turbo.json                # Конфіг Turborepo
</pre>

---

## ⚙️ Скрипти

| Команда       | Опис                             |
| ------------- | -------------------------------- |
| `pnpm dev`    | Запуск dev-серверів              |
| `pnpm build`  | Збірка всіх застосунків          |
| `pnpm lint`   | Лінтинг коду                     |
| `pnpm format` | Форматування коду через Prettier |

---

## 🧰 Технології

- 🔷 **Next.js** — фронтенд
- 🟦 **NestJS** — бекенд
- ✨ **TypeScript** — типізація в усьому проєкті
- 🚀 **Turborepo** — керування монорепозиторієм
- 🧹 **Prettier + ESLint** — форматування та перевірка якості коду
- 📦 **PNPM Workspaces** — керування залежностями

---

## 🚀 Швидкий старт

### 1️⃣ Завантаження

* Скачай архів цього репозиторію у будь-яку теку.
* **Не роби `git clone`** — просто розпакуй архів.

---

### 2️⃣ Встановлення залежностей

Переконайся, що встановлено:

* **Node.js** (версія 18 або новіша)
* **PNPM** (рекомендується версія 10+)

Встанови залежності:

```bash
pnpm install
```

---

### 3️⃣ Створи файл `.env` у корені

Приклад вмісту:

```env
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/myapp
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001
```

> У продакшні потрібно буде вказати реальний Atlas URI:
>
> ```
> MONGODB_URI=mongodb+srv://user:pass@cluster.example.mongodb.net/myapp
> ```

---

### 4️⃣ Запуск для розробки

Запусти всі dev-сервери одночасно:

```bash
pnpm dev
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:3001](http://localhost:3001)

> **Примітка:** Переконайся, що MongoDB запущена локально на порту 27017 або використовуй Atlas URI у `.env`.

---

### 5️⃣ Збірка проєкту

```bash
pnpm build
```

---

### 6️⃣ Все готово

* Весь код (фронт, бек, спільні пакети) вже зв'язані через **Turborepo**.
* Використовуй `pnpm dev` для розробки та `pnpm build` для збірки.

