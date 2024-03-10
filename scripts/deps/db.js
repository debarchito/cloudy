/**
 * Database setup for scripts.
 * @script_deps
 */

// @ts-check

import { config } from "dotenv";
import pg from "pg";

// Only use the .env file in the root directory.
config({
  path: "../.env",
});

/**
 * A Postgres client.
 */
export const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
});
