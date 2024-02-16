"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnTpe } from "./types";
import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";
import { UpdateCardOrderSchema } from "./schema";

const handler = async (data: InputType): Promise<ReturnTpe> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) return { error: "Unauthorized!" };

  const { items } = data;

  let cards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },
        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    cards = await db.$transaction(transaction);
  } catch (error) {
    return { error: "Fail to reorder." };
  }

  return { data: cards };
};

export const updateCardOrder = createSafeAction(UpdateCardOrderSchema, handler);
