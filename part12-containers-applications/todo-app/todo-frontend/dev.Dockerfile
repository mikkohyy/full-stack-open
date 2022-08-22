FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["REACT_APP_BACKEND_URL=http://localhost:3001/", "npm", "start"]