import { Context } from "hono";
import db from "../../db/db";
import { BlankEnv, BlankInput } from "hono/types";
import { User, users } from "../../db/schema/userSchema";
import { eq } from "drizzle-orm";

async function getAllUsers(c: Context<BlankEnv, "/", BlankInput>) {
  const allUsers: User[] = await db.select().from(users).all();

  return c.json(allUsers);
}

async function deleteUser(c: Context<BlankEnv, "/:id", BlankInput>) {
  const { id } = c.req.param();

  const matchFn = eq(users.id, parseInt(id));

  const deletedUser = await db.delete(users).where(matchFn).returning();

  return c.json(deletedUser);
}

export { getAllUsers, deleteUser };
