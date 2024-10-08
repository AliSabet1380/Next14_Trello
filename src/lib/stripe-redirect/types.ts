import { z } from "zod";

import { StripeRedirectSchema } from "./schema";

import { ActionState } from "../create-safe-action";

export type InputType = z.infer<typeof StripeRedirectSchema>;
export type ReturnType = ActionState<InputType, string>;
