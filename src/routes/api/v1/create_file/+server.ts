import { z } from "zod";
import { json } from "@sveltejs/kit";

/**
 * @description Schema for the form data used to create a file.
 */
const formSchema = z.object({
  name: z.string(),
  chunkURLs: z.array(z.string()),
  properties: z.record(z.string()),
  parentDirId: z.string(),
  size: z.number().min(0),
});

export async function POST({ locals, request }) {
  if(!locals.user) {
    return json({
      status: 401,
      message: "Unauthorized",
      result: null,
    });
  }

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const validate = formSchema.safeParse(data);

  if(!validate.success) {
    return json({
      status: 400,
      message: "Invalid form data",
      result: null,
    });
  }

  try {
    const result = await locals.fsr?.createFile({
      userId: locals.session!.userId!,
      ...validate.data
    });
    return json({
      status: 200,
      message: "OK",
      result,
    });
  } catch(err) {
    console.error(err);
    return json({
      status: 500,
      message: "Internal Server Error",
      result: null,
    });
  }
}
