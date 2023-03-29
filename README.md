# NestJS + Prisma = ❤️

This is a sample project demonstrating how you could use Prisma within a NestJS project.

## Set Up

Set up steps to follow before you can start the API.

1. Restore node modules

  ```bash
  # pnpm
  pnpm i

  # yarn
  yarn

  # npm
  npm i
  ```

2. Create a `.env` with the value below

  ```bash
  DATABASE_URL="file:./dev.db"
  ```

3. Restore Prisma types

  ```bash
  npx prisma generate
  ```

4. Run database migration

  ```bash
  npx prisma migrate deploy
  ```

5. Run database seeding

  ```bash
  npx prisma db seed
  ```

## Running the API

You can run the API using any of the following scripts:

```bash
pnpm start

# restarts the server when files change
pnpm start:dev
```

## Running tests

```bash
# runs the unit tests
pnpm test

# runs the end-to-end tests
pnpm test:e2e
```