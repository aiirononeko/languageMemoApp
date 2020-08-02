FROM node:12.16.3-alpine

WORKDIR /frontend

RUN rm -rf /node_modules

RUN apk update && \
    npm install && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init && \
    npm install -g @nuxtjs/axios && \
    npm install -g @nuxtjs/auth && \
    npm install -g @nuxtjs/dotenv

ADD . .

ENV HOST 0.0.0.0
EXPOSE 3000

WORKDIR /frontend/frontend/
