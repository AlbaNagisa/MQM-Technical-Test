# MQM-Technical-Test

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

Node.JS  
npm

## Getting Started

First, clone the project

```sh
git clone https://github.com/AlbaNagisa/MQM-Technical-Test.git
cd MQM-Technical-Test
```

Then, install all dependencies

```sh
npm install
#or
yarn install
#or
pnpm install
#or
bun install
```

After install run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Poppins, a custom Google Font.

## How it works

I use [this terminologies api](https://api.gouv.fr/les-api/api-terminologies-sante) to request some information about medical terminologies and differents medical concepts

### Endpoints used

URL base is : https://smt.esante.gouv.fr

`GET: /wp-json/ans/terminologies/zip` to download terminologies zip file

`GET: /api/terminologies/list` to get a terminologies list

`GET: /api/terminologies/search` to search terminologies

`GET: /api/terminologies/home` to get some default terminologies

`POST: /api/concepts/search` to search concepts

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
