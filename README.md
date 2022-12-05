# How to set up Onu:

### Check your Node version
```
node -v
```

To use this demo, Node must be at one of these versions: `^12.22.0 || ^14.17.0 || >=16.0.0`. You can use the instructions here to update your node version.


### Clone this repo

```bash
git clone git@github.com:onuhq/onudemo.git
```

### cd into the directory and install the dependncies using yarn
```bash
cd onudemo/
yarn # or npm install
```

To make sure this command worked, there should now be a `node_modules/` directory when you run `ls`

### Install the backend dependencies
```bash
cd onudemo/backend
yarn # or npm install
```

To make sure this command worked, there should now be a `node_modules/` directory when you run `ls`


### Run the server
Back in the `onudemo` directory, run `yarn dev` to start the server 

In a new terminal window, cd into `onudemo/backend` and also run `yarn dev` to start up the backend server


You can now navigate to http://localhost:3000 to see the dashboard.


### Create a .env file
You'll need to create a `.env` in onudemo/backend with the following config. There's a .env.example file with an example config you can use

```bash
PORT=8000  # The port that the backend server should run on
CLIENT_PORT=3000  # The port that the frontend app should run on
```



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

