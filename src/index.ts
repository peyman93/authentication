import { Hono } from "hono";
import authRoute from "./routes/authRoute";
import { logger } from "hono/logger";

const app = new Hono();

const loggerMiddleware = logger();
app.use(loggerMiddleware);

app.route("/auth", authRoute);

export default {
  port: 8000,
  fetch: app.fetch,
};
