FROM ruby:2.5.3-alpine

RUN cd /tmp \
    && apk --no-cache add \
    curl \
    curl-dev \
    nodejs \
    libstdc++ \
    libxml2-dev \
    libxslt-dev \
    linux-headers \
    mysql-client \
    mysql-dev \
    pcre \
    ruby-dev \
    ruby-json \
    tzdata \
    yaml \
    yaml-dev \
    bash \
    build-base \
    zlib-dev

RUN mkdir /myapp
WORKDIR /myapp

COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

RUN bundle install
COPY . /myapp

RUN mkdir -p tmp/sockets

VOLUME $APP_ROOT/public
VOLUME $APP_ROOT/tmp

# RUN apt-get update -qq && \
#     apt-get install -y build-essential \ 
#     libpq-dev \        
#     nodejs           

# RUN mkdir /languageMemoApp
# ENV APP_ROOT /languageMemoApp
# WORKDIR $APP_ROOT

# ADD ./Gemfile $APP_ROOT/Gemfile
# ADD ./Gemfile.lock $APP_ROOT/Gemfile.lock

# RUN bundle install
# ADD . $APP_ROOT
# RUN mkdir -p tmp/sockets

# VOLUME $APP_ROOT/public
# VOLUME $APP_ROOT/tmp
