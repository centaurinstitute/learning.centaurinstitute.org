FROM node:20

WORKDIR /app

COPY . .

RUN npm rebuild sqlite3


EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]