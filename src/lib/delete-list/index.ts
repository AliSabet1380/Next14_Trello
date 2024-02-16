"use server";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteListSchema } from "./schema";
import { createAuditLog } from "../create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) return { error: "Unauthorized!" };

  const { listId, boardId } = data;

  let list;
  try {
    list = await db.list.delete({
      where: {
        id: listId,
        boardId,
        board: {
          orgId,
        },
      },
    });

    await createAuditLog({
      action: ACTION.DELETE,
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    return { error: "Fail to Delete." };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deleteList = createSafeAction(DeleteListSchema, handler);
