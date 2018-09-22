FROM node:8

WORKDIR /eos_graphql

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "node", "index.js" ]
