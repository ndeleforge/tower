FROM node:22
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 7771
CMD ["node", "server.js"]
