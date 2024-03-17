import { json } from "@sveltejs/kit";

export async function GET({ locals, params }) {
  if (!locals.user) {
    return json({
      status: 401,
      message: "Unauthorized",
      result: null,
    });
  }

  const { dir_id: dirId } = params;
  const userId = locals.session?.userId;
  const data = await locals.fsr?.list(userId!, dirId);
  const result = data?.rows[0].result;

  if (result?.size === null) {
    return json({
      status: 404,
      message: "Invalid directory id",
      result: null,
    });
  }

  return json({
    status: 200,
    message: "OK",
    result,
  });
}
