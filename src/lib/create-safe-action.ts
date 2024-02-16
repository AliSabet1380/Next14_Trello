import { z } from "zod";

export type FiledsError<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  filedsErrors?: FiledsError<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validationData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationData = schema.safeParse(data);

    if (!validationData.success) {
      return {
        filedsErrors: validationData.error.flatten()
          .fieldErrors as FiledsError<TInput>,
      };
    }

    return handler(validationData.data);
  };
};
