import pg from "pg";
import * as schema from "./schema";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { DATABASE_URL } from "$env/static/private";
import { drizzle } from "drizzle-orm/node-postgres";

/**
 * A Postgres connection pool.
 */
export const pool = new pg.Pool({
  connectionString: DATABASE_URL,
});

/**
 * The database instance.
 */
export const db = drizzle(pool, { schema });

// Run migrations
migrate(db, {
  migrationsFolder: "./drizzle",
});
