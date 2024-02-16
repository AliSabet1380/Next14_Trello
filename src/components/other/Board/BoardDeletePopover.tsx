"use client";
import { toast } from "sonner";
import { MoreHorizontal, X } from "lucide-react";

import { deleteBoard } from "@/lib/delete-board";
import { useAction } from "@/hooks/useAction";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  id: string;
};

const BoardDeletePopover = ({ id }: Props) => {
  const { excute, isLoading } = useAction(deleteBoard, {
    onError(error) {
      toast.error(error);
    },
  });
  const deleteHandler = () => {
    excute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger>
        <MoreHorizontal className="hover:text-red-500/50" />
      </PopoverTrigger>
      <PopoverContent
        align={"end"}
        className="w-80 pt-3"
        side={"bottom"}
        sideOffset={10}
      >
        <p className=" text-center text-sm font-semibold text-neutral-700">
          Board Actions
        </p>
        <Button
          onClick={deleteHandler}
          disabled={isLoading}
          variant={"destructive"}
          className="w-full p-2 mt-8"
        >
          Delete Board
        </Button>
        <PopoverClose asChild>
          <Button
            variant={"ghost"}
            className="absolute top-1 right-1 w-auto h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};
export default BoardDeletePopover;
