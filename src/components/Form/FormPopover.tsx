"use client";

import { useRouter } from "next/navigation";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/useAction";
import { createBoard } from "@/lib/create-board";
import { useProModal } from "@/hooks/useProModal";

import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { Button } from "../ui/button";
import FormPicker from "./FormPicker";

type Props = {
  children: React.ReactNode;
  side?: "left" | "top" | "right" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};

const FormPopover = ({
  children,
  side = "bottom",
  sideOffset = 0,
  align,
}: Props) => {
  const { onOpen } = useProModal();
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);
  const { excute, fieldError, isLoading } = useAction(createBoard, {
    onSuccess(data: { id: string }) {
      toast.success("board created!");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError(error) {
      toast.error(error);
      onOpen();
    },
  });

  const formSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;

    excute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-slate-800 pb-4">
          Create Board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            variant={"outline"}
            className="absolute top-0 right-0 w-auto h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-4" action={formSubmit}>
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldError} />
            <FormInput
              errors={fieldError}
              id="title"
              disabled={isLoading}
              placeholder="title"
              label="Board Title"
            />
          </div>
          <FormSubmitButton disabled={isLoading} className="w-full">
            Create
          </FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
export default FormPopover;
