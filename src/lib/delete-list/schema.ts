import { z } from "zod";

export const DeleteListSchema = z.object({
  listId: z.string(),
  boardId: z.string(),
});
