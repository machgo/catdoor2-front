FROM node:9.8.0

RUN apt-get update && apt-get install -y --no-install-recommends nginx-light

 RUN mkdir -p /usr/src/app
 WORKDIR /usr/src/app

 RUN npm install -g vue-cli

 COPY . /usr/src/app

 RUN npm install
 RUN npm run build

 RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]