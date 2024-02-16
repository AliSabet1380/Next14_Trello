"use server";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";

import { UpdateListSchema } from "./schema";
import { InputType, ReturnType } from "./types";
import { createAuditLog } from "../create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  if (!orgId || !userId) return { error: "Unauthoried!" };

  const { title, listId, boardId } = data;
  let list;
  try {
    list = await db.list.update({
      where: {
        boardId,
        id: listId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });

    await createAuditLog({
      action: ACTION.UPDATE,
      entityId: list.id,
      entityTitle: list.title,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (error) {
    return { error: "Fail to Update list." };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateListSchema, handler);
