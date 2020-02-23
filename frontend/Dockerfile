FROM node:8.15.0-alpine

WORKDIR /frontend

RUN apk update && \
    npm install -g npm && \
    npm install -g @vue/cli && \
    npm install -g @vue/cli-init \
    npm install -g @nuxtjs/axios

RUN apk update && \
    apk add python && \
    apk add python make g++

ADD frontend ./frontend
COPY frontend ./frontend

ENV HOST 0.0.0.0
EXPOSE 3000

CMD ["/bin/ash"]
