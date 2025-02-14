FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM alpine:latest

WORKDIR /frontend

COPY --from=build /app/dist/fenrin_frontend/ /frontend

# Optionally, copy a custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 (Nginx default)
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
