"use client";

import { ElementRef, useRef } from "react";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

import { useAction } from "@/hooks/useAction";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import FormSubmitButton from "@/components/Form/FormSubmitButton";
import { List } from "@prisma/client";
import { Separator } from "@/components/ui/separator";
import { deleteList } from "@/lib/delete-list";
import { copyList } from "@/lib/copy-list";

type Props = {
  data: List;
  onAddCard: () => void;
};

const ListOptions = ({ data, onAddCard }: Props) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  // UseActions
  const { excute: deleteExcute } = useAction(deleteList, {
    onSuccess(data) {
      toast.success(`board "${data.title}" deleted.`);
      closeRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });

  const { excute: copyExcute } = useAction(copyList, {
    onSuccess(data) {
      toast.success(`board "${data.title}" created.`);
      closeRef.current?.click();
    },
    onError(error) {
      toast.error(error);
    },
  });

  //

  const deleteFormSubmit = (formData: FormData) => {
    const listId = formData.get("listId") as string;
    const boardId = formData.get("boardId") as string;

    deleteExcute({ boardId, listId });
  };

  const copyFormSubmit = (formData: FormData) => {
    const listId = formData.get("listId") as string;
    const boardId = formData.get("boardId") as string;

    copyExcute({ listId, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger className="h-auto w-auto p-1">
        <MoreHorizontal className="w-5 h-4 " />
      </PopoverTrigger>
      <PopoverContent
        className="space-y-2"
        side="bottom"
        align="end"
        sideOffset={10}
      >
        <p className="text-center text-sm font-semibold pb-4">List Actions</p>
        <PopoverClose ref={closeRef}>
          <Button className="absolute top-0 right-0" variant={"link"}>
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-md w-full h-auto p-2 px-5 justify-start text-sm"
          variant={"lime"}
        >
          Add New Card+
        </Button>
        <form action={copyFormSubmit}>
          <input hidden name="listId" id="listId" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmitButton
            variant="default"
            className="rounded-md w-full h-auto p-2 px-5 justify-start text-sm"
          >
            Copy List...
          </FormSubmitButton>
        </form>
        <Separator className=" bg-neutral-900 " />
        <form action={deleteFormSubmit}>
          <input hidden name="listId" id="listId" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmitButton
            variant="destructive"
            className="rounded-md w-full h-auto p-2 px-5 justify-start text-sm"
          >
            Delete List
          </FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
export default ListOptions;
