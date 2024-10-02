FROM node:18-alpine

EXPOSE 80
WORKDIR /app
COPY /dist /app
COPY package.json /app
RUN cd /app && npm install
CMD ["node", "server.js"]