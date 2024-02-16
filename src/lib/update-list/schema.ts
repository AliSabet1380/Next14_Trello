import { z } from "zod";

export const UpdateListSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title is required!",
      required_error: "Title is required!",
    })
    .min(3, {
      message: "Title is too short",
    }),
  listId: z.string(),
  boardId: z.string(),
});
