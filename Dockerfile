# Stage 1: Build angular
FROM node:22.13 AS build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm ci
RUN npm run build -- --output-path=./dist/out --configuration=production

# Stage 2: Serve nginx
FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/local/app/dist/out/browser /usr/share/nginx/html
EXPOSE 80