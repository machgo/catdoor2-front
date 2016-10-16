FROM node:latest

RUN apt-get update && apt-get install -y --no-install-recommends nginx-light

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g angular-cli

COPY . /usr/src/app
RUN ng build --prod -o /var/www/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]