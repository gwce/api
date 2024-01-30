FROM mhart/alpine-node

EXPOSE 80
WORKDIR /app
COPY /dist /app
COPY package.json /app
RUN cd /app && npm install --production
CMD ["node", "server.js"]