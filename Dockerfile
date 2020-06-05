FROM node:14.3.0-alpine as ts-build
# Arguments
ARG NODE_ENV
ARG NPM_TOKEN
ENV NODE_ENV=$NODE_ENV \
    SERVICE_PORT=$SERVICE_PORT \
    APP_DIR="/usr/src/auth" \
    YARN_CACHE="/tmp/ycache"
RUN mkdir -p $APP_DIR
RUN mkdir -p $YARN_CACHE
RUN apk --no-cache add \
      bash \
      g++ \
      ca-certificates \
      lz4-dev \
      musl-dev \
      cyrus-sasl-dev \
      openssl-dev \
      make \
      python
RUN apk add --no-cache --virtual .build-deps gcc zlib-dev libc-dev bsd-compat-headers py-setuptools bash
WORKDIR $APP_DIR
# Install app dependencies
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
COPY yarn.lock $APP_DIR
COPY package* $APP_DIR
RUN yarn config set cache-folder $YARN_CACHE
RUN yarn install
 # Bundle app source
COPY . .
# Compile TS to JS
RUN yarn build
FROM node:14.3.0-alpine as build
# Create app directory
ENV APP_DIR=/usr/src/auth \
YARN_CACHE="/tmp/ycache" \
    NODE_ENV=$NODE_ENV \
    NPM_TOKEN=$NPM_TOKEN
RUN mkdir -p $APP_DIR
RUN mkdir -p $YARN_CACHE
COPY --from=ts-build $YARN_CACHE $YARN_CACHE
WORKDIR $APP_DIR
# Install app dependencies
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > ~/.npmrc
COPY --from=ts-build $APP_DIR/package.json $APP_DIR/package.json
COPY --from=ts-build $APP_DIR/yarn.lock $APP_DIR/yarn.lock
RUN yarn install --prod --cache-folder $YARN_CACHE
COPY --from=ts-build $APP_DIR/lib $APP_DIR/lib
COPY --from=ts-build $APP_DIR/config $APP_DIR/config
COPY --from=ts-build $APP_DIR/scripts $APP_DIR/scripts
COPY --from=ts-build $APP_DIR/.env $APP_DIR/.env
# Production container
FROM node:14.3.0-alpine
# Arguments
ARG NODE_ENV
RUN echo $NODE_ENV
# Configuration
ENV SERVICE_PORT=4021 \
    SERVICE_USER=api \
    SERVICE_USER_ID=1001 \
    SERVICE_GROUP=api \
    SERVICE_GROUP_ID=1001 \
    APP_DIR=/usr/src/auth \
    NODE_ENV=$NODE_ENV
RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR
RUN addgroup -g $SERVICE_GROUP_ID $SERVICE_GROUP \
  && adduser -D -u $SERVICE_USER_ID -G $SERVICE_GROUP $SERVICE_USER \
  && chown -R $SERVICE_USER:$SERVICE_GROUP $APP_DIR
USER $SERVICE_USER
COPY --chown=$SERVICE_USER:$SERVICE_GROUP --from=build $APP_DIR/ $APP_DIR/
EXPOSE $SERVICE_PORT
CMD ["yarn", "start"]