"use client";
import { useParams } from "next/navigation";
import { useState, useRef, ElementRef } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

import FormInput from "@/components/Form/FormInput";
import { useAction } from "@/hooks/useAction";
import { Button } from "@/components/ui/button";
import { createList } from "@/lib/create-list";
import FormSubmitButton from "@/components/Form/FormSubmitButton";

import ListWrapper from "./ListWrapper";

const ListForm = () => {
  const { excute, isLoading, fieldError } = useAction(createList, {
    onSuccess(data: { title: string }) {
      toast.success(`list "${data.title}" created`);
      closeForm();
    },
    onError(error) {
      toast.error(error);
    },
  });
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const params = useParams();

  const openForm = () => {
    setIsFormOpen(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const closeForm = () => {
    setIsFormOpen(false);
  };

  const submitForm = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    excute({ boardId, title });
  };

  if (isFormOpen)
    return (
      <ListWrapper>
        <form
          className="w-full p-3 rounded-md bg-white space-y-2 shadow-md relative"
          action={submitForm}
          ref={formRef}
        >
          <Button
            type="button"
            className="absolute top-0 right-0"
            variant={"link"}
            onClick={closeForm}
            size={"icon"}
          >
            <X className="w-4 h-4" />
          </Button>
          <p className="text-center text-sm font-semibold">Create List</p>
          <FormInput
            errors={fieldError}
            disabled={isLoading}
            ref={inputRef}
            id="title"
            placeholder="Title for list..."
            className="text-sm p-5 h-7 font-medium border transition border-neutral-800 mt-6"
          />
          <input hidden value={params.boardId} name="boardId" />
          <FormSubmitButton
            variant={"lime"}
            className="w-full disabled:opacity-80! disabled:cursor-not-allowed!"
          >
            Create List
          </FormSubmitButton>
        </form>
      </ListWrapper>
    );

  return (
    <ListWrapper>
      <button
        onClick={openForm}
        className="w-full gap-2 rounded-md bg-white/80 hover:bg-white/60 transition p-3 flex items-center font-medium text-sm"
      >
        <Plus className="h-4 w-5" />
        Add a list
      </button>
    </ListWrapper>
  );
};
export default ListForm;
