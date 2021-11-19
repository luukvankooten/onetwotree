FROM node:17 as builder
WORKDIR /usr/src/app
COPY . ./
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm ci
RUN npm run build -w @12tree/app

FROM node:17
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/packages/app/build ./
RUN npm install -g serve
CMD serve -l $PORT -s .
