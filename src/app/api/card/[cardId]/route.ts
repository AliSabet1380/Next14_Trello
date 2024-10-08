import { db } from "@/lib/DB";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params: { cardId } }: { params: { cardId: string } }
) => {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId)
      return new NextResponse("Unauthorized!", { status: 401 });

    const card = await db.card.findUnique({
      where: {
        id: cardId,
        list: {
          board: {
            orgId,
          },
        },
      },
      include: {
        list: {
          select: {
            title: true,
          },
        },
      },
    });

    return NextResponse.json(card);
  } catch (error) {
    return new NextResponse("Error Happend!", { status: 500 });
  }
};
