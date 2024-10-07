FROM postgres:12.1

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=test

COPY init.sql /docker-entrypoint-initdb.d/