import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "../create-safe-action";
import { UpdateListSchema } from "./schema";

export type InputType = z.infer<typeof UpdateListSchema>;
export type ReturnType = ActionState<InputType, List>;
