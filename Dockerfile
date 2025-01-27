FROM node:22-alpine as deps

RUN apk add --update git build-base python3

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .

RUN corepack enable
RUN yarn workspaces focus --production

FROM node:22-alpine as builder

RUN apk add --update git build-base python3

WORKDIR /app

COPY package.json .
COPY yarn.lock .
COPY .yarnrc.yml .

RUN corepack enable
RUN yarn --immutable --inline-builds

COPY . /app/

ENV NX_DAEMON false

RUN npx nx run-many -t build-storybook --verbose

FROM nginx:stable-alpine

ARG TARGET

COPY --from=builder /app/apps/${TARGET}/storybook-static /var/www

EXPOSE 80
