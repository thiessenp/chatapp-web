FROM postgres:12.2-alpine
COPY .env .env
COPY ./init.sql /docker-entrypoint-initdb.d/
