"use client";
import { Copy, Trash } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { CardWithList } from "../../../types";

import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { copyCard } from "@/lib/copy-card";
import { deleteCard } from "@/lib/delete-card";
import { useCardModal } from "@/hooks/useCardModal";

type Props = {
  data: CardWithList;
};

const Actions = ({ data }: Props) => {
  const params = useParams();
  const { onClose } = useCardModal((state) => state);
  const { excute: copyCardExcute, isLoading: copyLoading } = useAction(
    copyCard,
    {
      onSuccess(data) {
        onClose();
        toast.success(`card "${data.title}" created.`);
      },
      onError(error) {
        toast.error(error);
      },
    }
  );
  const { excute: deleteCardExcute, isLoading: deleteLoading } = useAction(
    deleteCard,
    {
      onSuccess(data) {
        onClose();
        toast.success(`card "${data.title}" deleted.`);
      },
      onError(error) {
        toast.error(error);
      },
    }
  );

  const onCopy = () => {
    const boardId = params.boardId as string;

    copyCardExcute({ boardId, cardId: data.id });
  };
  const onDelete = () => {
    const boardId = params.boardId as string;

    deleteCardExcute({ boardId, cardId: data.id });
  };

  return (
    <div className="col-span-1">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        disabled={copyLoading}
        onClick={onCopy}
        variant={"lime"}
        className="mt-4 flex w-full items-center gap-2 text-sm"
      >
        Copy
        <Copy className="w-4 h-4" />
      </Button>
      <Button
        disabled={deleteLoading}
        onClick={onDelete}
        variant={"destructive"}
        className="mt-2 flex w-full items-center gap-2 text-sm"
      >
        Delete
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};
export default Actions;
