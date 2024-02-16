import { z } from "zod";

export const DeleteBoardSchema = z.object({
  id: z.string({
    invalid_type_error: "board id is invalid",
    required_error: "board id is invalid",
  }),
});
