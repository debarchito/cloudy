import { auth } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const GET = async ({ locals }) => {
  if (!locals.user) {
    redirect(302, "/login");
  }

  await auth.invalidateSession(locals.session!.id);

  locals.session = null;
  locals.user = null;

  redirect(302, "/login");
};
