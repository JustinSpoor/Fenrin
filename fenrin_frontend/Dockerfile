FROM node:18 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Stage 2: Serve Angular app using Nginx
FROM alpine:latest

# Install Nginx and other necessary dependencies
RUN apk update && apk add --no-cache nginx

# Set the working directory
WORKDIR /frontend

# Copy the built Angular app to the Nginx HTML directory
COPY --from=build /app/dist/fenrin_frontend/ /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf

# Expose the default HTTP port for Nginx
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
