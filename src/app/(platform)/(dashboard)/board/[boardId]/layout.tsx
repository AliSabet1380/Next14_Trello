import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";

import { db } from "@/lib/DB";

import BoardNavbar from "@/components/other/Board/BoardNavbar";

type Props = {
  children: React.ReactNode;
  params: { boardId: string };
};

export const generateMetadata = async ({ params: { boardId } }: Props) => {
  const { orgId } = auth();

  if (!orgId) return { title: "Board" };

  const board = await db.board.findUnique({
    where: {
      orgId,
      id: boardId,
    },
  });

  return {
    title: board?.title || "Board",
  };
};

const boardIdLayout = async ({ children, params: { boardId } }: Props) => {
  const { orgId } = auth();

  if (!orgId) return redirect("/select-org");

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });
  if (!board) return notFound();

  return (
    <div
      className="bg-center bg-cover bg-no-repeat relative h-full"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/30 " />
      <main className="pt-28 px-10 relative h-full">{children}</main>
    </div>
  );
};
export default boardIdLayout;
