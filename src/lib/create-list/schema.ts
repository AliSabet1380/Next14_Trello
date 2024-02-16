import { z } from "zod";

export const CreateListSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title is required!",
      required_error: "Title is required!",
    })
    .min(3, {
      message: "Title for List is too short!",
    }),
  boardId: z.string(),
});
