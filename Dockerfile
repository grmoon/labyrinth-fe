FROM node:dubnium-slim

WORKDIR /website

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src src
COPY .babelrc.js .babelrc.js
COPY .eslintrc.js .eslintrc.js
COPY postcss.config.js postcss.config.js
COPY webpack.config.js webpack.config.js

RUN npm ci
RUN npm run build:prod

FROM nginx

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=0 /website/dist /usr/share/nginx/html

EXPOSE 80