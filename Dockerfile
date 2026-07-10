FROM oven/bun:1

WORKDIR /app

COPY package.json .

RUN bun install --production

COPY ./dist ./dist
COPY ./config.js ./config.mjs

EXPOSE 5173

ENTRYPOINT ["bun", "run", "serve"]