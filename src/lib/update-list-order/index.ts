"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateListOrderSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized!" };

  const { items } = data;

  let lists;

  try {
    const transaction = items.map((item) =>
      db.list.update({
        where: {
          id: item.id,
          board: {
            orgId,
          },
        },
        data: {
          order: item.order,
        },
      })
    );

    lists = await db.$transaction(transaction);
  } catch (error) {
    return { error: "Fail to reorder" };
  }

  return { data: lists };
};

export const updateListOrder = createSafeAction(UpdateListOrderSchema, handler);
