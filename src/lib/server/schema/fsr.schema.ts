import { users } from "./auth.schema";
import { relations } from "drizzle-orm";
import { pgTable, varchar, text, jsonb, type AnyPgColumn } from "drizzle-orm/pg-core";

/**
 * Represents the files table in the database.
 */
export const files = pgTable("files", {
  id: varchar("id", { length: 128 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 16 })
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 128 }).notNull(),
  chunkURLArray: text("chunk_url_array").array().notNull(),
  properties: jsonb("properties").notNull(),
  parentDirId: varchar("parent_dir_id", { length: 128 })
    .notNull()
    .default("root")
    .references(() => dirs.id),
});

/**
 * Defines the relations for the files table.
 */
export const filesRelations = relations(files, ({ one }) => ({
  user: one(users, {
    fields: [files.userId],
    references: [users.id],
  }),
  parentDir: one(dirs, {
    fields: [files.parentDirId],
    references: [dirs.id],
  }),
}));

/**
 * Represents the dirs table in the database.
 */
export const dirs = pgTable("dirs", {
  id: varchar("id", { length: 128 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 16 })
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 128 }).notNull(),
  properties: jsonb("properties").notNull(),
  parentDirId: varchar("parent_dir_id", { length: 128 })
    .notNull()
    .default("root")
    .references((): AnyPgColumn => dirs.id),
});

/**
 * Defines the relations for the dirs table.
 */
export const dirsRelations = relations(dirs, ({ one, many }) => ({
  user: one(users, {
    fields: [dirs.userId],
    references: [users.id],
  }),
  parentDir: one(dirs, {
    fields: [dirs.parentDirId],
    references: [dirs.id],
  }),
  files: many(files),
  subDirs: many(dirs),
}));
