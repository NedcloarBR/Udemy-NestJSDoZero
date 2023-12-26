FROM node:lts-alpine

RUN apk add --no-cache bash

RUN npm install -g @nestjs/cli prisma

WORKDIR /home/node/app

USER node
