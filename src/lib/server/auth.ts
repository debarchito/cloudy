import { db } from "./db";
import { Lucia, TimeSpan } from "lucia";
import { users, sessions } from "./schema";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";

/**
 * Drizzle adapter for Lucia.
 */
const adapter = new DrizzleSQLiteAdapter(db, sessions, users);

/**
 * An authentication middleware.
 */
export const auth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(7, "d"),
  sessionCookie: {
    name: "session",
    expires: true,
    attributes: {
      secure: true,
      sameSite: "strict",
    },
  },
  getUserAttributes({ name }) {
    return { name };
  },
});

/**
 * Type signature of the authentication middleware.
 */
export type Auth = typeof auth;
