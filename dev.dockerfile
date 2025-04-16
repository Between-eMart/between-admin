FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN corepack enable

RUN yarn install --immutable

COPY . .

RUN yarn install --immutable --check-cache

RUN yarn run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80
