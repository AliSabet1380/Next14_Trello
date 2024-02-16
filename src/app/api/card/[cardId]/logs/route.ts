import { db } from "@/lib/DB";
import { auth } from "@clerk/nextjs";
import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params: { cardId } }: { params: { cardId: string } }
) => {
  try {
    const { userId, orgId } = auth();
    if (!userId || !orgId)
      return new NextResponse("Unauthorized!", { status: 401 });

    const auditLog = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: {
        createAt: "desc",
      },
      take: 3,
    });

    return NextResponse.json(auditLog);
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
