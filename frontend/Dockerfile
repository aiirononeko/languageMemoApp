FROM node:12.16.3

WORKDIR /frontend

RUN rm -rf /node_modules

RUN npm install && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init && \
    npm install -g @nuxtjs/axios && \
    npm install -g @nuxtjs/auth && \
    npm install -g @nuxtjs/dotenv

RUN npm build

ADD . .

ENV HOST 0.0.0.0
EXPOSE 3000
