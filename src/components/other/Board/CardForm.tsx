import { useParams } from "next/navigation";
import { Plus, X } from "lucide-react";
import { ElementRef, forwardRef, useRef } from "react";

import { Button } from "@/components/ui/button";
import FormTextArea from "@/components/Form/FormTextArea";
import FormSubmitButton from "@/components/Form/FormSubmitButton";

import { useAction } from "@/hooks/useAction";
import { createCard } from "@/lib/create-card";
import { toast } from "sonner";

type Props = {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
};

const CardForm = forwardRef<HTMLElement, Props>(
  ({ disableEditing, isEditing, enableEditing, listId }, ref) => {
    const { excute, isLoading, fieldError } = useAction(createCard, {
      onSuccess(data) {
        toast.success(`card  "${data.title}"  created`);
        formRef.current?.reset();
        disableEditing();
      },
      onError(error) {
        toast.error(error);
      },
    });

    const formRef = useRef<ElementRef<"form">>(null);
    const textareaRef = useRef<ElementRef<"textarea">>(null);
    const params = useParams();

    const submitForm = (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = params.boardId as string;

      excute({ title, listId, boardId });
    };

    if (isEditing)
      return (
        <form
          className="pt-2 w-full space-y-2"
          ref={formRef}
          action={submitForm}
        >
          <FormTextArea
            placeholder="Enter a title for card"
            id="title"
            disabled={isLoading}
            errors={fieldError}
            ref={textareaRef}
          />
          <input hidden name="listId" id="listId" defaultValue={listId} />
          <div className="flex w-full items-center gap-3 px-3">
            <FormSubmitButton variant="lime" className="w-1/2">
              Create
            </FormSubmitButton>
            <Button type="button" variant={"ghost"} onClick={disableEditing}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </form>
      );

    return (
      <div className="pt-2 px-2">
        <Button
          onClick={enableEditing}
          className="flex items-center gap-2 w-full"
          variant={"lime"}
        >
          <Plus className="h-4 w-4" />
          Add a card
        </Button>
      </div>
    );
  }
);

CardForm.displayName = "CardForm";
export default CardForm;
