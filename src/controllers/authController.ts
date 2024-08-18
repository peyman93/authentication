import { Context } from "hono";
import { eq } from "drizzle-orm";
import db from "../../db/db";
import { users, type NewUser, type User } from "../../db/schema/userSchema";
import { BlankEnv, BlankInput } from "hono/types";
import { hashPassword } from "../utils/passHash";

async function insertNewUser(c: Context<BlankEnv, "/", BlankInput>) {
  const { email, password } = await c.req.json();

  const hashedPass = await hashPassword(password);

  const newUser: NewUser = { email, password: hashedPass };

  const insertedUser = await db.insert(users).values(newUser).returning();

  c.status(201);

  return c.json(insertedUser);
}

async function deleteUser(c: Context<BlankEnv, "/:id", BlankInput>) {
  const { id } = c.req.param();

  const matchFn = eq(users.id, parseInt(id));

  const deletedUser = await db.delete(users).where(matchFn).returning();

  return c.json(deletedUser);
}

async function getAllUsers(c: Context<BlankEnv, "/", BlankInput>) {
  const allUsers: User[] = await db.select().from(users).all();

  return c.json(allUsers);
}

export { getAllUsers, insertNewUser, deleteUser };
