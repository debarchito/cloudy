import { users } from "./auth.schema";
import { sql, relations } from "drizzle-orm";
import {
  type AnyPgColumn,
  pgTable,
  varchar,
  text,
  jsonb,
  timestamp,
  bigint,
} from "drizzle-orm/pg-core";

/**
 * Represents the files table in the database.
 */
export const files = pgTable("files", {
  id: varchar("id", { length: 128 }).notNull().primaryKey(),
  userId: varchar("user_id", { length: 16 })
    .notNull()
    .references(() => users.id),
  name: varchar("name", { length: 128 }).notNull(),
  chunkURLs: text("chunk_urls").array().notNull(),
  properties: jsonb("properties").notNull(),
  parentDirId: varchar("parent_dir_id", { length: 128 })
    .notNull()
    .references(() => dirs.id),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  size: bigint("size", { mode: "number" }).default(0).notNull(),
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
    .references((): AnyPgColumn => dirs.id),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  size: bigint("size", { mode: "number" }).default(0).notNull(),
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
