import { Hono } from "hono";
import authRoute from "./routes/authRoute";

const app = new Hono();

app.route('/auth', authRoute)

export default {
  port: 8000,
  fetch: app.fetch,
};
