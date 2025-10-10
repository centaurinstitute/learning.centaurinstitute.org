import * as platform from "@canmingir/link-express";

import { Server } from "socket.io";
import config from "./config";
import dotenv from "dotenv";
import https from 'https';
import fs from 'fs';

dotenv.config();

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
});

process.on("unhandledRejection", (reason) => {
  console.log(`Unhandled Rejection: ${reason}`);
});

const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/api.centaurinstitute.org/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/api.centaurinstitute.org/fullchain.pem'),
};

platform.init(config).then(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const app = require("./src/app").default;
  const server = https.createServer(sslOptions, app);

  server.listen(process.env.PORT || 4000, () => {
    console.log(`Server is running on port ${process.env.PORT || 4000}`);
  });
});
