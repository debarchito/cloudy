import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Represents the users table in the database.
 */
export const users = sqliteTable("users", {
  id: text("id", { length: 16 }).notNull().primaryKey(),
  name: text("name", { length: 128 }).notNull(),
  password: text("password").notNull(),
});

/**
 * Defines the relations for the users table.
 */
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
}));

/**
 * Represents the sessions table in the database.
 */
export const sessions = sqliteTable("sessions", {
  id: text("id", { length: 16 }).notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

/**
 * Defines the relations for the sessions table.
 */
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
