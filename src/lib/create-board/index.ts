"use server";

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "../DB";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "../create-safe-action";
import { CreateBoardSchema } from "./schema";
import { createAuditLog } from "../create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { incrementAvailableCount, hasAvailableCount } from "../org-limit";
import { checkSubscription } from "../subscription";

const hander = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId)
    return {
      error: "Unauthorized",
    };

  const isPro = await checkSubscription();
  const canCreateNewBoard = await hasAvailableCount();

  if (!canCreateNewBoard && !isPro)
    return {
      error:
        "You have reached your limit of free boards. please upgrade to premium to create more boards.",
    };

  const { title, image } = data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");
  if (
    !imageId ||
    !imageLinkHTML ||
    !imageFullUrl ||
    !imageThumbUrl ||
    !imageUserName
  )
    return { error: "Missing Fields. fail to create Board" };

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });

    if (!isPro) await incrementAvailableCount();

    await createAuditLog({
      action: ACTION.CREATE,
      entityId: board.id,
      entityTitle: board.title,
      entityType: ENTITY_TYPE.BOARD,
    });
  } catch (error) {
    return { error: "Fail To Create." };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoardSchema, hander);
