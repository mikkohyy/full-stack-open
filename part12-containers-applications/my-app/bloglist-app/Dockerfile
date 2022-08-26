FROM node:16 AS test-stage
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run test

FROM node:16 AS setup-stage
WORKDIR /usr/src/app
COPY --from=test-stage ./usr/src/app .
RUN npm ci --only=production

FROM node:16 AS final-stage
WORKDIR /usr/src/app
COPY --from=setup-stage --chown=node:node /usr/src/app .
USER node
CMD ["npm", "start"]