/**
 * Database setup for scripts.
 * @script_deps
 */

import { config } from "dotenv";
import { createClient } from "@libsql/client";

// Only use the .env file in the root directory.
config({
  path: "../.env",
});

/**
 * A libSQL client.
 */
export const client = createClient({
  url: process.env.DATABASE_URL,
  authToken:
    process.env.DATABASE_LOCATION === "remote" ? process.env.DATABASE_AUTH_TOKEN : undefined,
});
