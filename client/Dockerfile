# Build layer as build
FROM node:12-alpine AS build

COPY .env .env

# Dir auto created but can set permissions like `RUN mkdir -p /app`
WORKDIR /app

COPY package.json package-lock.json ./

# Silent to remove some noise
RUN npm install --silent

RUN npm install react-scripts -g --silent

COPY . ./

# note: produces artifact on image build in /app
RUN npm run build


# Run layer (not re-used)  -- could also use nginx:stable-alpine
FROM nginx:1.18

# Use Build step build files
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Default Nginx port is 80 but state here for clarity
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
