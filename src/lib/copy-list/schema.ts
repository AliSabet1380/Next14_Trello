import { z } from "zod";

export const CopyListSchema = z.object({
  listId: z.string(),
  boardId: z.string(),
});
