import config from "./config";
import dotenv from "dotenv";
import http from "http";
import platform from "@canmingir/link-express";

dotenv.config();

process.on("uncaughtException", (err) => {
  console.error(`Uncaught Exception: ${err.message}`);
});

process.on("unhandledRejection", (reason) => {
  console.log(`Unhandled Rejection: ${reason}`);
});

platform.init(config).then(() => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const app = require("./src/app").default;
  const server = http.createServer(app);

  server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});
