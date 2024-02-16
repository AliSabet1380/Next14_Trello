"use server";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";

import { InputType, ReturnType } from "./types";
import { CopyListSchema } from "./schema";
import { createAuditLog } from "../create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) return { error: "Unauthorized!" };

  const { listId, boardId } = data;
  let list;
  try {
    const existingList = await db.list.findUnique({
      where: {
        id: listId,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!existingList) return { error: "List not found!" };

    const lastListItem = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const lastOrder = lastListItem ? lastListItem.order + 1 : 1;

    list = await db.list.create({
      data: {
        boardId: existingList.boardId,
        title: `${existingList.title}_Copy`,
        order: lastOrder,
        cards: {
          createMany: {
            data: existingList.cards.map((card) => ({
              order: card.order,
              title: card.title,
              description: card.description,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });

    await createAuditLog({
      action: ACTION.COPY,
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    return { error: "Fail to copy list." };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const copyList = createSafeAction(CopyListSchema, handler);
