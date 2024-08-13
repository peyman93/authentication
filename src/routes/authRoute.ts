import { Context, Hono } from "hono";
import { eq } from "drizzle-orm";
import db from "../../db/db";
import { users, type NewUser, type User } from "../../db/schema/userSchema";
import { BlankEnv, BlankInput } from "hono/types";

const usersRoute = new Hono();

usersRoute.get("/", getAllUsers);

usersRoute.post("/", insertNewUser);

usersRoute.delete("/:id", deleteUsers);

async function insertNewUser(c: Context<BlankEnv, "/", BlankInput>) {
  const { email, password } = await c.req.json();

  const newUser: NewUser = { email, password };

  const insertedUser = await db.insert(users).values(newUser).returning();

  c.status(201);

  return c.json(insertedUser);
}

async function deleteUsers(c: Context<BlankEnv, "/:id", BlankInput>) {
  const { id } = c.req.param();

  const matchFn = eq(users.id, parseInt(id));

  const deletedUser = await db.delete(users).where(matchFn).returning();

  return c.json(deletedUser);
}

async function getAllUsers(c: Context<BlankEnv, "/", BlankInput>) {
  const allUsers: User[] = await db.select().from(users).all();

  return c.json(allUsers);
}

export default usersRoute;
