/// <reference types="lucia" />

declare global {
  namespace App {
    interface Locals {
      auth: import("$lib/server/auth").Auth;
      user: import("lucia").User | null;
      session: import("lucia").Session | null;
      fsr: import("$lib/server/fsr").FSR | null;
    }
  }
}

declare module "lucia" {
  interface Register {
    Lucia: import("$lib/server/auth").Auth;
    DatabaseUserAttributes: {
      name: string;
    };
  }
}

export {};
