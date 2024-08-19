import { Hono } from "hono";
import {
  registerNewUser,
  loginUser,
} from "../controllers/authController";
import { validator } from "hono/validator";
import {
  insertUserSchema,
  registerUserSchema,
} from "../../db/schema/userSchema";

const authRoute = new Hono();

const insertUserValidator = validator("json", (value, c) => {
  const parsed = insertUserSchema.safeParse(value);

  if (!parsed.success) {
    const error = parsed.error;
    c.status(400);

    return c.json({ error });
  }

  return parsed.data;
});

authRoute.post("/register", insertUserValidator, registerNewUser);

const loginValidator = validator("json", (value, c) => {
  const parsed = registerUserSchema.safeParse(value);

  if (!parsed.success) {
    const error = parsed.error;
    c.status(400);

    return c.json({ error });
  }

  return parsed.data;
});

authRoute.post("/login", loginValidator, loginUser);

export default authRoute;
