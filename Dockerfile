FROM oven/bun:1

WORKDIR /app

COPY package.json .

RUN bun install --production

COPY ./dist ./dist
COPY ./config.js ./config.mjs

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD bun -e "fetch('http://127.0.0.1:5173/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["bun", "run", "serve"]