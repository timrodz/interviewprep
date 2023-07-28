# Interview Prep Helper

## About

Stack: [T3](https://create.t3.gg/)

- NextJS
- Tailwind
- Prisma (ORM)
- tRPC (Queries)

## Development

Setup:

1. Install [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) (Node Version Manager)
2. `nvm use`: install the same Node version (as defined by `.nvmrc`)
3. `npm install`: to install dependencies
4. `npx prisma db push` to create the DB schema

Install the same Node version (defined by `.nvmrc`)

```shell
nvm use
```

Install project dependencies

```shell
npm install
```

Create and update the database schema (if prompted to overwrite, select y)

```shell
npx prisma db push
```

Seed the database with starting data

```shell
npm run db-seed
```

Run the project

```shell
npm run dev
```
