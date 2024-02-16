import { Board } from "@prisma/client";
import BoardTitleForm from "./BoardTitleForm";
import BoardDeletePopover from "./BoardDeletePopover";

type Props = {
  data: Board;
};

const BoardNavbar = async ({ data }: Props) => {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-20 flex items-center justify-between px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
      <BoardDeletePopover id={data.id} />
    </div>
  );
};
export default BoardNavbar;
