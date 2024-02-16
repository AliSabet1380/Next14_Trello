import { z } from "zod";

export const UpdateCardSchema = z.object({
  description: z.optional(z.string()),
  title: z.optional(
    z
      .string({
        invalid_type_error: "Title is required!",
      })
      .min(3, {
        message: "title is too short!",
      })
  ),
  boardId: z.string(),
  cardId: z.string(),
});
