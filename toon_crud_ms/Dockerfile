FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY dist/package*.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm" , "run" , "dev" ]
