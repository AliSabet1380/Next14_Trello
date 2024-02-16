"use server";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";
import { InputType, ReturnType } from "./types";
import { UpdateCardSchema } from "./schema";
import { createAuditLog } from "../create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) return { error: "Unauthorized!" };

  const { boardId, cardId, ...values } = data;
  let card;
  try {
    card = await db.card.update({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });

    await createAuditLog({
      action: ACTION.UPDATE,
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
    });
  } catch (error) {
    return { error: "Fail to update." };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCardSchema, handler);
