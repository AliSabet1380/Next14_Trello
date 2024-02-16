import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "../create-safe-action";
import { UpdateCardOrderSchema } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrderSchema>;
export type ReturnTpe = ActionState<InputType, Card[]>;
