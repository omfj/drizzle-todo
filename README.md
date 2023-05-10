# Drizzle TODO

Example of a TODO list app using [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm/tree/main) in Next.js with migrations.

## Getting Started

Start the database

```bash
docker-compose up -d
```

```bash
cp .env.example .env
```

Install dependencies

```bash
pnpm i
```

Run migrations

```bash
pnpm db:migrate
```

Start the app

```bash
pnpm dev
```
