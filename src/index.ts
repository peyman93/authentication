import { Hono } from "hono";
import authRoute from "./routes/auth";
import { logger } from "hono/logger";
import usersRoute from "./routes/users";

const app = new Hono();

const loggerMiddleware = logger();
app.use(loggerMiddleware);

app.route("/auth", authRoute);
app.route("/users", usersRoute);

export default {
  port: 8000,
  fetch: app.fetch,
};
