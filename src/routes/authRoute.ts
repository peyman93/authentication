import { Hono } from "hono";
import {
  getAllUsers,
  insertNewUser,
  deleteUser,
} from "../controllers/authController";
import { validator } from "hono/validator";
import { insertUserSchema } from "../../db/schema/userSchema";

const authRoute = new Hono();

authRoute.get("/", getAllUsers);

const insertUserValidator = validator("json", (value, c) => {
  const parsed = insertUserSchema.safeParse(value);

  if (!parsed.success) {
    const error = parsed.error;
    c.status(400);

    return c.json({ error });
  }

  return parsed.data;
});

authRoute.post("/", insertUserValidator, insertNewUser);

authRoute.delete("/:id", deleteUser);

export default authRoute;
