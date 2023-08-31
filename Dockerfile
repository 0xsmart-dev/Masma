FROM node:14 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/
COPY . .
RUN yarn install
RUN yarn build

# 👇 new migrate and start app script
CMD ["yarn", "run", "start:docker" ]