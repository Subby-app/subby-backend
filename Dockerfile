FROM node:18.12.1-alpine3.17

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 4574

ENTRYPOINT ["npm", "start"]
