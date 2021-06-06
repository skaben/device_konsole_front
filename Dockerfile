FROM node:10.15.3-alpine

WORKDIR /app

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ADD ./vue .

ENV HOST=0.0.0.0 \
    CHOKIDAR_USEPOLLING=true

RUN npm ci

EXPOSE 8080
