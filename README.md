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

### Install the backend dependencies
```bash
cd onudemo/backend
yarn # or npm install
```


### Run the server
Back in the `onudemo` directory, run `yarn dev` to start the server 

In a new terminal window, cd into `onudemo/backend` and also run `yarn dev` to start up the backend server


You can now navigate to http://localhost:3000 to see the dashboard.


## Rebuild Tailwind styles
```bash
npx tailwindcss -i ./styles/globals.css -o ./dist/output.css --watch
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

