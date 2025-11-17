FROM node:20

WORKDIR /app

COPY package.json .

COPY ./dist ./dist
COPY ./config.js ./config.mjs

EXPOSE 5173

ENTRYPOINT ["npm", "run", "serve"]