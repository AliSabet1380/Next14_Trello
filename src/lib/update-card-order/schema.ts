import { z } from "zod";

export const UpdateCardOrderSchema = z.object({
  items: z.array(
    z.object({
      title: z.string(),
      id: z.string(),
      order: z.number(),
      listId: z.string(),
      createAt: z.date(),
      updateAt: z.date(),
    })
  ),
});
