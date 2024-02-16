import { z } from "zod";

export const CopyCardSchema = z.object({
  boardId: z.string(),
  cardId: z.string(),
});
