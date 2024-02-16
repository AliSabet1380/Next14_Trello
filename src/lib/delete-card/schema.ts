import { z } from "zod";

export const DeleteCardSchema = z.object({
  cardId: z.string(),
  boardId: z.string(),
});
