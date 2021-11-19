FROM node:17 as builder
WORKDIR /usr/src/app
COPY ./packages/app ./
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm ci
RUN npm run build

FROM node:17
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/build ./
RUN npm install -g serve
EXPOSE 3000/tcp
CMD serve -l 3000 -s .
