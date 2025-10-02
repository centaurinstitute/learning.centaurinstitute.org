import "express";

import * as platform from "@canmingir/link-express";

import learning from "./routes/learning";

declare module "express-serve-static-core" {
  interface Request {
    session: {
      userId: string;
      appId: string;
      organizationId: string;
      projectId: string;
    };
  }
}

const { authorization } = platform;

const app = platform.express();

app.use(authorization.verify);
app.use(authorization.authorize("ADMIN"));

app.use("/videos", learning);

export default app;
