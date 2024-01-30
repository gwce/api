FROM mhart/alpine-node

EXPOSE 3002
WORKDIR /app
COPY /dist /app
COPY package.json /app
RUN cd /app && npm install --production
CMD ["node", "server.js"]