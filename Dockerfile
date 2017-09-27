FROM node:6.11.3-alpine

EXPOSE 8000

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app
# ENTRYPOINT ["/sbin/tini", "--"]

CMD ["npm", "start"]