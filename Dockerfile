# Build image from this Dockerfile using the command
# docker build -t <image name>:<image version> --no-cache  .
# ex
# docker build -t sweetimage:1.3 --no-cache  .

FROM node:12.11.1-alpine AS build

WORKDIR /opt/ng
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm run ngcc
ENV PATH="./node_modules/.bin:$PATH"

COPY . ./

RUN ng build --base-href "/datacatalog/"

FROM nginx:alpine
# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
EXPOSE 80
COPY --from=build /opt/ng/dist /usr/share/nginx/html
