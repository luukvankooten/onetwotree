FROM node:17 as builder
WORKDIR /usr/src/app
COPY . ./
ENV NODE_OPTIONS=--openssl-legacy-provider
ENV GENERATE_SOURCEMAP=false
RUN npm ci
RUN npm run build -w @12tree/app
RUN npm run build -w @12tree/server

FROM node:17
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/packages/app/build ./build/
COPY --from=builder /usr/src/app/packages/server/dist/index.js ./index.js
ENV PORT=4000
ENV SERVE_PATH=./build/
CMD node ./index.js
