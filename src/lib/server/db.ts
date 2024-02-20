import * as schema from "./schema";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { DATABASE_URL, DATABASE_AUTH_TOKEN, DATABASE_LOCATION } from "$env/static/private";

/**
 * A libSQL client.
 */
export const client = createClient({
  url: DATABASE_URL,
  authToken: DATABASE_LOCATION === "remote" ? DATABASE_AUTH_TOKEN : undefined,
});

/**
 * The database instance.
 */
export const db = drizzle(client, { schema });
