import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: ["./src/lib/server/schema/*.ts"],
  driver: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    authToken: process.env.DATABASE_AUTH_TOKEN!,
  },
  verbose: true,
  strict: true,
  out: "./drizzle",
});
