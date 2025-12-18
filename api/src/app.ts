import "express";

import learning from "./routes/learning";
import platform from "@canmingir/link-express";

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

const { express: app, authorization } = platform;

app.use(authorization.verify);
app.use(authorization.authorize("ADMIN"));

app.use("/videos", learning);

export default app;
