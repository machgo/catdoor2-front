FROM node:latest

RUN apt-get update && apt-get install -y --no-install-recommends nginx-light

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g angular-cli

COPY . /usr/src/app
RUN ng build --prod -o /var/www/html/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]