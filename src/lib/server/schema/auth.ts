import { files, dirs } from "./fsr";
import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

/**
 * Represents the users table in the database.
 */
export const users = pgTable("users", {
  id: varchar("id", { length: 16 }).notNull().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

/**
 * Defines the relations for the users table.
 */
export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  files: many(files),
  dirs: many(dirs),
}));

/**
 * Represents the sessions table in the database.
 */
export const sessions = pgTable("sessions", {
  id: varchar("id", { length: 128 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 16 })
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
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
