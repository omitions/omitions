FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN apk update && \
    apk upgrade

RUN npm install

ENV SECRET=${SECRET} 

RUN npm run build

FROM node:20-alpine
COPY --from=builder ./app ./app

WORKDIR /app

EXPOSE 3000
CMD npm run start
