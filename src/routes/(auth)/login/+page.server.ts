import { z } from "zod";
import { db } from "$lib/server/db";
import { auth } from "$lib/server/auth";
import { Argon2id } from "oslo/password";
import { fail, redirect } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { superValidate } from "sveltekit-superforms/server";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const load = async ({ locals }) => {
  if (locals.user) {
    redirect(307, "/");
  }

  const form = await superValidate(zod(formSchema));
  return { form };
};

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, zod(formSchema));

    if (!form.valid) {
      form.errors.username = ["Invalid form submission."];
      return fail(400, { form });
    }

    try {
      const user = await db.query.users.findFirst({
        where: (table, { eq }) => eq(table.name, form.data.username),
      });

      if (!user) {
        form.errors.username = ["Invalid username or password."];
        return fail(400, { form });
      }

      const isValidPassword = await new Argon2id().verify(user.password, form.data.password);

      if (!isValidPassword) {
        form.errors.username = ["Invalid username or password."];
        return fail(400, { form });
      }

      const session = await auth.createSession(user.id, {});
      const sessionCookie = auth.createSessionCookie(session.id);

      cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    } catch (e) {
      form.errors.username = ["Something went wrong..."];
      return fail(500, { form });
    }

    redirect(302, "/");
  },
};
