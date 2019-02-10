FROM node:dubnium-slim

WORKDIR /website

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY src src
COPY .babelrc.js .babelrc.js
COPY .eslintrc.js .eslintrc.js
COPY postcss.config.js postcss.config.js
COPY webpack.config.js webpack.config.js

RUN npm run build:prod

FROM nginx

COPY --from=0 /website/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN rm -rf /website

EXPOSE 80