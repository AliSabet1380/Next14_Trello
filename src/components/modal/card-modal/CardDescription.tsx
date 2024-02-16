"use client";
import { useState, useRef, ElementRef } from "react";
import { AlignLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

import FormTextArea from "@/components/Form/FormTextArea";
import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/lib/update-card";
import { CardWithList } from "../../../types";
import FormSubmitButton from "@/components/Form/FormSubmitButton";
import { Button } from "@/components/ui/button";

type Props = {
  data: CardWithList;
};

const CardDescription = ({ data }: Props) => {
  const { excute, isLoading } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card-log", data.id],
      });
      toast.success(`card "${data.title}" update`);
      disableEditing();
    },
    onError(error) {
      toast.error(error);
    },
  });
  const queryClient = useQueryClient();
  const params = useParams();

  const textareaRef = useRef<ElementRef<"textarea">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const [isEditing, setIsEditing] = useState(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };
  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: FormData) => {
    const desc = formData.get("desc") as string;
    const boardId = params.boardId as string;
    const cardId = data.id as string;

    if (!desc || !desc.trim()) return;

    excute({ description: desc, boardId, cardId });
  };

  const onBlur = () => {
    textareaRef.current?.form?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form className="space-y-2" action={onSubmit} ref={formRef}>
        <FormTextArea
          disabled={isLoading}
          onBlur={onBlur}
          ref={textareaRef}
          id="desc"
          placeholder={data.description || "Add descrition ..."}
          className="bg-white border-black"
        />
        <div className="flex items-center gap-3">
          <FormSubmitButton variant={"secondary"}>Save</FormSubmitButton>
          <Button type="button" variant={"ghost"} onClick={disableEditing}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="w-5 h-5 mt-1" />
      <div className="w-full text-base font-semibold text-neutral-700 space-y-2">
        <p>Description</p>
        <div
          onClick={enableEditing}
          role="button"
          className="min-h-[89px] bg-neutral-200 text-sm font-medium py-3 px-3.5 rounded-md"
        >
          <p className="text-sm font-medium text-slate-900">
            {data.description || "Add more info ..."}
          </p>
        </div>
      </div>
    </div>
  );
};
export default CardDescription;
