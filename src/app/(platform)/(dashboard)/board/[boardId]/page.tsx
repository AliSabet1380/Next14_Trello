import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/DB";

import ListContanier from "@/components/other/Board/ListContanier";

type Props = {
  params: { boardId: string };
};

const BoardIdPage = async ({ params: { boardId } }: Props) => {
  const { orgId } = auth();
  if (!orgId) redirect("/select-org");

  const lists = await db.list.findMany({
    where: {
      boardId,
      board: {
        orgId: orgId!,
      },
    },
    include: {
      cards: {
        orderBy: {
          order: "asc",
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });

  return (
    <div className="p-9 h-full overflow-x-auto text-neutral-800">
      <ListContanier boardId={boardId} data={lists} />
    </div>
  );
};
export default BoardIdPage;
