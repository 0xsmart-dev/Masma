# 3Wallet Web App

### Prisma Setup

### How to run on local

- Configure Environments
Copy `.env.example` to `.env` and Configure environment variables.

```
JWT_SECRET=<YOUR_JWT_SECRET>
JWT_REFRESH_TOKEN_SECRET=<YOUR_REFRESH_TOKEN_SECRET>
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>?schema=public"
```

- Install dependencies
```sh
yarn install
```

- DB setup

// This will be only for local environment.
```sh
npx prisma migrate dev
```

- Run local server 
```sh
yarn dev
```

### How to add new component?
Check [Template repo](https://github.com/Join3Wallet/3wallet-mui-template) and clone the components whatever you want.

**This project is built based on Materialize Theme**



[LiveDemo](https://pixinvent.com/demo/materialize-mui-react-nextjs-admin-template/demo-1/dashboards/crm/)

[Document](https://pixinvent.com/demo/materialize-mui-react-nextjs-admin-template/documentation/guide/)
