# Interview Prep Helper

There's a unique skillset involved with interview preparation. The main problem is you're often asked about things you learned 3-4 years ago, or stuff you no longer fully remember, which can make you appear as a non-ideal candidate. This project should solve that problem!

Tech stack: [T3](https://create.t3.gg/)

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
