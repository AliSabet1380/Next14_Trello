"use client";

import { useState, useRef, ElementRef } from "react";
import { List } from "@prisma/client";
import { toast } from "sonner";

import { useAction } from "@/hooks/useAction";
import FormInput from "@/components/Form/FormInput";
import { updateList } from "@/lib/update-list";
import ListOptions from "./ListOptions";
import { Separator } from "@/components/ui/separator";

type Props = {
  data: List;
  onAddCard: () => void;
};

const ListHeader = ({ data, onAddCard }: Props) => {
  const { excute, isLoading, fieldError } = useAction(updateList, {
    onSuccess(data: { title: string }) {
      toast.success(`list "${data.title}" updated.`);
      setTitle(data.title);
      disableEditing();
    },
    onError(erorr) {
      toast.error(erorr);
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const submitForm = (formData: FormData) => {
    const newTitle = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;
    const listId = formData.get("listId") as string;

    // Gaurd
    if (newTitle === title) return disableEditing();

    excute({ title: newTitle, boardId, listId });
  };

  const blurHandler = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="py-3 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={submitForm} className="w-full relative">
          <FormInput
            onBlur={blurHandler}
            disabled={isLoading}
            className="border border-neutral-800"
            ref={inputRef}
            id="title"
            errors={fieldError}
            defaultValue={title}
          />
          <input hidden name="boardId" value={data.boardId} id="boardId" />
          <input hidden name="listId" value={data.id} id="listId" />
          <button hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent hover:cursor-pointer"
        >
          {title}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
export default ListHeader;
