import { useState, useCallback } from "react";

import { ActionState, FiledsError } from "@/lib/create-safe-action";

type Action<TInput, TOutput> = (
  data: TInput
) => Promise<ActionState<TInput, TOutput>>;

interface useActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (erorr: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>,
  option?: useActionOptions<TOutput>
) => {
  const [fieldError, setFieldError] = useState<FiledsError<TInput> | undefined>(
    undefined
  );
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const excute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);

      try {
        const result = await action(input);
        if (!result) return;

        setFieldError(result.filedsErrors);

        if (result.data) {
          setData(result.data);
          option?.onSuccess?.(result.data);
        }

        if (result.error) {
          setError(result.error);
          option?.onError?.(result.error);
        }

        //
      } finally {
        setIsLoading(false);
        option?.onComplete?.();
      }
    },
    [action, option]
  );

  return {
    excute,
    isLoading,
    data,
    fieldError,
    error,
  };
};
