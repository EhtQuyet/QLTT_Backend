FROM ubuntu:18.04

RUN apt-get update \
 && apt-get install -y curl \
 && curl -sL https://deb.nodesource.com/setup_12.x | bash - \
 && apt-get install -y nodejs \
 && apt-get install -y nginx

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build
RUN cp -rf ./public/reportDesign ./build/
RUN cp -rf ./public/stimulsoft ./build/
RUN cp ./nginx-cf/nginx.conf /etc/nginx/
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
