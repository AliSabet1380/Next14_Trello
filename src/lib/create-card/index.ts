"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";

import { InputType, ReturnType } from "./types";
import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";
import { CreateCardSchema } from "./schema";
import { createAuditLog } from "../create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized!" };

  const { listId, title, boardId } = data;
  let card;
  try {
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: {
          orgId,
        },
      },
    });
    if (!list) return { error: "List not found." };

    const lastCard = await db.card.findFirst({
      where: {
        listId,
      },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });

    await createAuditLog({
      action: ACTION.CREATE,
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
    });
  } catch (error) {
    return { error: "Can not create card." };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const createCard = createSafeAction(CreateCardSchema, handler);
