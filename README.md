# How to set up Onu:

### Clone this repo

```bash
git clone git@github.com:onuhq/onudemo.git
```

### cd into the directory and install the dependncies using yarn
```bash
cd onudemo/
yarn # or npm install
```

### Install the backend dependencies
```bash
cd onudemo/backend
yarn # or npm install
```

You can now navigate to http://localhost:3000 to see the dashboard.





## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Rebuild Tailwind styles
```bash
npx tailwindcss -i ./styles/globals.css -o ./dist/output.css --watch
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

