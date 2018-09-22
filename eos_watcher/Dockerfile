FROM node:8

WORKDIR /eos_watcher

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]
