FROM node:latest
RUN mkdir /test
RUN ps -ef | grep java
WORKDIR /app
ENV appDir /app
RUN apt-get update && apt-get install -y \
	git \
	mysql
COPY package*.json /app
RUN npm install
COPY . /app
EXPOSE 8080
CMD ["node", "index.js"]
