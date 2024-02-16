"use server";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";

import { InputType, ReturnType } from "./types";
import { CopyCardSchema } from "./schema";
import { createAuditLog } from "../create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!orgId || !userId) return { error: "Unauthorized!" };

  const { cardId, boardId } = data;
  let card;
  try {
    const existingCard = await db.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
    });
    if (!existingCard) return { error: "Card not found." };

    const lastCard = await db.card.findFirst({
      where: { listId: existingCard.listId },
      orderBy: {
        order: "desc",
      },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title: `${existingCard.title} _ Copy`,
        order: newOrder,
        listId: existingCard.listId,
        description: existingCard.description,
      },
    });

    await createAuditLog({
      action: ACTION.COPY,
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
    });
  } catch (error) {
    return { error: "Fail to copy" };
  }

  revalidatePath(`board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCardSchema, handler);
