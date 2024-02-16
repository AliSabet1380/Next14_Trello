"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "../DB";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../create-safe-action";
import { DeleteCardSchema } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "../create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  if (!orgId || !userId) return { error: "Unauthorized!" };

  const { cardId, boardId } = data;
  let card;
  try {
    card = await db.card.delete({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    await createAuditLog({
      action: ACTION.DELETE,
      entityId: card.id,
      entityTitle: card.title,
      entityType: ENTITY_TYPE.CARD,
    });
  } catch (error) {
    return { error: "Fail to delete." };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const deleteCard = createSafeAction(DeleteCardSchema, handler);
