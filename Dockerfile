# Dockerfile

FROM node:19.3.0 as build

LABEL maintainer="juldrixx@gmail.com"

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.23.3
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist .
ENV ENV_FILE_PATH /usr/share/nginx/html
EXPOSE 80

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod a+x /usr/local/bin/docker-entrypoint.sh

# Copy plugin entrypoint
COPY /docker-entrypoint.d/* /docker-entrypoint.d/
RUN chmod a+x /docker-entrypoint.d/*
ONBUILD COPY /docker-entrypoint.d/* /docker-entrypoint.d/
ONBUILD RUN chmod a+x /docker-entrypoint/*
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
