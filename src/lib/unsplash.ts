import { createApi } from "unsplash-js";

export const unspalsh = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY!,
});
