FROM node:12-alpine AS alpine

COPY .env .env

RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --production \
 && npm ls \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules

COPY . /app

COPY $RSA_PRIVATE_KEY_FILE .
COPY $RSA_PUBLIC_KEY_FILE .

CMD ["npm", "run", "start"]
