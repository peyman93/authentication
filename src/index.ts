import { Hono } from "hono";
import users from "./routes/authRoute";

const app = new Hono();

app.route('/users', users)

export default {
  port: 8000,
  fetch: app.fetch,
};
