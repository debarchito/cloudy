import { db } from "$lib/server/db";
import { fsr } from "$lib/server/fsr";
import { auth } from "$lib/server/auth";

/**
 * @description FSR instance.
 */
const fsrInstance = fsr(db);

export const handle = async ({ event, resolve }) => {
  const sessionId = event.cookies.get(auth.sessionCookieName);

  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    event.locals.fsr = null;
    return resolve(event);
  }

  const { session, user } = await auth.validateSession(sessionId);

  if (session && session.fresh) {
    const sessionCookie = auth.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  if (!session) {
    const sessionCookie = auth.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes,
    });
  }

  event.locals.user = user;
  event.locals.session = session;
  event.locals.fsr = fsrInstance;
  return resolve(event);
};
