"use server";
import { auth } from "@clerk/nextjs";

import { InputType, ReturnType } from "./types";

import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";
import { DeleteBoardSchema } from "./schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAuditLog } from "../create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decrementAvailableCount } from "../org-limit";
import { checkSubscription } from "../subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { orgId, userId } = auth();

  const isPro = await checkSubscription();

  if (!orgId || !userId) return { error: "Fail to delete board." };

  const { id } = data;

  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) await decrementAvailableCount();

    await createAuditLog({
      action: ACTION.DELETE,
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
    });
  } catch (error) {
    return { error: "Fail to delete board" };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoardSchema, handler);
