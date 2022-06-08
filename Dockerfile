FROM node:17.9.1-alpine
USER node
RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node ./ ./

RUN npm install

EXPOSE 3000
CMD ["npm","start"]
