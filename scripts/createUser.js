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

try {
  const userId = generateId(16);
  const hashedPassword = await new Argon2id().hash(pswd);

  await client.connect();
  await client
    .query(`INSERT INTO users (id, name, password) VALUES ($1, $2, $3)`, [
      userId,
      name,
      hashedPassword,
    ])
    .then(() => console.log("[+] User created successfully!"));
  await client.end().then(() => console.log("[+] Database connection closed."));
} catch (err) {
  console.log("[!] An error occurred! Additional info: \n");
  console.error(err);
}
