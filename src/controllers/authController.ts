import { Context } from "hono";
import { eq } from "drizzle-orm";
import db from "../../db/db";
import { users, type NewUser, type User } from "../../db/schema/userSchema";
import { BlankEnv, BlankInput } from "hono/types";
import { hashPassword } from "../utils/passHash";

async function registerNewUser(c: Context<BlankEnv, "/", BlankInput>) {
  const { email, password } = await c.req.json();

  const hashedPass = await hashPassword(password);

  const newUser: NewUser = { email, password: hashedPass };

  const insertedUser = await db.insert(users).values(newUser).returning();

  c.status(201);

  return c.json(insertedUser);
}

async function loginUser(c: Context<BlankEnv, "/", BlankInput>) {
  const { email, password } = await c.req.json();

  const matchedUsers = await db.select().from(users).where(eq(users.email, email));

  if (matchedUsers.length == 0) {
    c.status(404);

    return c.json({ msg: "No Such User" });
  }

  if (matchedUsers.length > 1) {
    c.status(500);

    return c.json({ msg: "User is not unique!" });
  }

  const user = matchedUsers[0];

  const passwordVerified = await Bun.password.verify(password, user.password);

  if (!passwordVerified) {
    c.status(401);

    return c.json({ msg: "Password is not correct" });
  }

  c.status(201);

  return c.json({ jwt: "you Are Good :)" });
}

export { registerNewUser, loginUser };
