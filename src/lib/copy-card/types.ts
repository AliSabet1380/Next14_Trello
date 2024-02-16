import { z } from "zod";

import { ActionState } from "../create-safe-action";
import { Card } from "@prisma/client";

import { CopyCardSchema } from "./schema";

export type InputType = z.infer<typeof CopyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
