FROM node:12.22-slim

RUN mkdir -p /mon-frontend

WORKDIR /mon-frontend

COPY . .

RUN rm -fr node_modules

COPY package*.json ./

RUN yarn install --production && yarn cache clean --force

ENV NODE_ENV=production

RUN yarn add --dev typescript @types/node
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]