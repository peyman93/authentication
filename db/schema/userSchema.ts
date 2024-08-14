import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { applyPasswordValidation } from "../../src/utils/passwordValidation";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  password: text("password").notNull(),
  email: text("email").notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const selectUserSchema = createSelectSchema(users);

export const insertUserSchema = applyPasswordValidation(
  createInsertSchema(users, {
    email: z.string().email(),
    password: z.string().min(8),
  })
);
