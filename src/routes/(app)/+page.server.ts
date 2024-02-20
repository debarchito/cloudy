import { redirect } from "@sveltejs/kit";

export const load = async ({ locals }) => {
  if (!locals.user) {
    redirect(302, "/login");
  }

  return {
    userId: locals.user.id,
    username: locals.user.name,
    sessionId: locals.session!.id,
  };
};
