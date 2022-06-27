		FROM node:lts-alpine
		ADD . /mini-API/src/app 
		WORKDIR /mini-API/src/app 
		COPY package.json /mini-API/src/app 
		RUN npm install
		COPY . /mini-API/src/app 
		EXPOSE 5000
		CMD ["npm","start"]