FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY .. .

RUN npm run build --prod

# Stage 2: Serve Angular app using Nginx
FROM nginx:alpine

# Copy the built Angular app to the Nginx HTML directory
COPY --from=build /app/dist/fenrin_frontend/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/conf.d/default.conf
