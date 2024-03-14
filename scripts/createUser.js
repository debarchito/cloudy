#!/usr/bin/env node

/**
 * Creates a user in the database.
 * @script
 */

// @ts-check

import { generateId } from "lucia";
import { client } from "./deps/db.js";
import { Argon2id } from "oslo/password";
import { input, password } from "@inquirer/prompts";

const name = await input({ message: "Enter username: " });
const pswd = await password({ message: "Enter password: " });
const confirmPswd = await password({ message: "Confirm password: " });

if (pswd !== confirmPswd) {
  console.error("[!] Passwords do not match! Retry.");
  process.exit(1);
}

await client.connect().catch(console.error);

try {
  const userId = generateId(16);
  const rootId = `root_${userId}`;
  const hashedPassword = await new Argon2id().hash(pswd);

  const createUser = {
    text: "INSERT INTO users (id, name, password) VALUES ($1, $2, $3)",
    values: [userId, name, hashedPassword],
  };
  const createRootForUser = {
    text: "INSERT INTO dirs (id, user_id, name, properties, parent_dir_id) VALUES ($1, $2, $3, '{}'::jsonb, $4)",
    values: [rootId, userId, rootId, rootId],
  };

  await client.query("BEGIN");
  await client.query(createUser).then(() => console.log("[+] User created successfully!"));
  await client.query(createRootForUser).then(() => console.log("[+] Created root dir for user!"));
  await client.query("COMMIT");
} catch (err) {
  await client.query("ROLLBACK");
  console.log("[!] An error occurred! Transaction rolled back. Additional info: \n");
  console.error(err);
}

await client
  .end()
  .then(() => console.log("[?] Database connection closed."))
  .catch(console.error);
