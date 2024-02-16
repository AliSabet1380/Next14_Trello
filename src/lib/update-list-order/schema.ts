import { z } from "zod";

export const UpdateListOrderSchema = z.object({
  items: z.array(
    z.object({
      title: z.string(),
      id: z.string(),
      order: z.number(),
      createAt: z.date(),
      updateAt: z.date(),
    })
  ),
});
