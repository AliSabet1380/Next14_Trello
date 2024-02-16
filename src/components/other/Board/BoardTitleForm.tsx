"use client";

import { ElementRef, useRef, useState } from "react";
import { Board } from "@prisma/client";
import { toast } from "sonner";

import { updateBoard } from "@/lib/update-board";
import { useAction } from "@/hooks/useAction";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/Form/FormInput";

type Props = {
  data: Board;
};

const BoardTitleForm = ({ data }: Props) => {
  const { excute, fieldError, isLoading } = useAction(updateBoard, {
    onSuccess(data: { title: string }) {
      toast.success(`Board "${data.title}" Update Succussfully`);
      setTitle(data.title);
      disableEditing();
    },
    onError(error) {
      toast.error(error);
      disableEditing();
    },
  });
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(data.title);

  const enableEditing = () => {
    // Focus input;
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
    const title = formData.get("title") as string;

    excute({ title, id: data.id });
  };

  const onBlur = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form
        action={submitForm}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          onBlur={onBlur}
          disabled={isLoading}
          errors={fieldError}
          ref={inputRef}
          id="title"
          defaultValue={title}
          className="font-smibold text-lg px-[7px] py-2 h-7 bg-transparent border border-white "
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant={"transparent"}
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
};
export default BoardTitleForm;
