import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { HelpCircle, User2 } from "lucide-react";

import { db } from "@/lib/DB";

import Hint from "./Hint";
import FormPopover from "@/components/Form/FormPopover";
import { numberOfAvailbleCount } from "@/lib/org-limit";
import { MAX_FREE_BOARDS } from "@/components/constant";
import { checkSubscription } from "@/lib/subscription";

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) return redirect("/select-org");

  const board = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createAt: "desc",
    },
  });

  const boardsRemaining = await numberOfAvailbleCount();
  const isPro = await checkSubscription();

  return (
    <div className="space-y-2 ">
      <div className="flex items-center gap-2">
        <User2 className="w-5 h-5" />
        <span className="font-medium">Your Board</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {board.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
            className="bg-cover bg-no-repeat aspect-video relative group bg-center bg-sky-700 rounded-md h-full w-full p-2 overflow-hidden"
          >
            <div className="absolute inset-0 group-hover:bg-black/50 bg-black/30 transition" />
            <p className="text-white relative font-semibold">{board.title}</p>
          </Link>
        ))}
        <FormPopover side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-65 transition bg-slate-200"
          >
            <p className="text-sm">create new board</p>
            <span>
              {isPro
                ? "Unlimit"
                : `${MAX_FREE_BOARDS - boardsRemaining} reamining`}
            </span>
            <Hint
              description="with free plan, you can only have 5 board. for unlimited board subscribe to taskify."
              sideOffset={30}
            >
              <HelpCircle className="absolute bottom-2 right-2 w-4 h-4" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
export default BoardList;
