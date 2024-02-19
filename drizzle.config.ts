import { defineConfig } from "drizzle-kit";
import "dotenv/config";

const driverConfig = {
  driver: "libsql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};

if (process.env.DATABASE_IS_ON_TURSO === "true") {
  driverConfig.driver = "turso";
  // @ts-expect-error This will work.
  driverConfig.dbCredentials.authToken = process.env.DATABASE_AUTH_TOKEN!;
}

export default defineConfig({
  schema: ["./src/lib/server/schema/*.ts"],
  ...driverConfig,
  verbose: true,
  strict: true,
  out: "./drizzle",
});
