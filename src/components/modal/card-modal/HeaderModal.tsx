"use client";

import { ElementRef, useRef, useState } from "react";
import { Layout } from "lucide-react";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { useAction } from "@/hooks/useAction";
import { updateCard } from "@/lib/update-card";
import FormInput from "@/components/Form/FormInput";
import { CardWithList } from "../../../types";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  data: CardWithList;
};

const HeaderModal = ({ data }: Props) => {
  const { excute, isLoading } = useAction(updateCard, {
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["card-log", data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      toast.success(`Renamed to "${data.title}"`);
      setTitle(data.title);
    },
    onError(error) {
      toast.error(error);
    },
  });

  const queryClient = useQueryClient();
  const params = useParams();
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.title);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = (formData: FormData) => {
    const newTitle = formData.get("title") as string;
    const cardId = data.id;
    const boardId = params.boardId as string;

    if (newTitle === title) return;

    excute({ title: newTitle, cardId, boardId });
  };

  return (
    <div className="flex items-start gap-x-3 mb-6 w-full">
      <Layout className="w-5 h-5 mt-3 text-neutral-700" />
      <div className="w-full">
        <form action={onSubmit}>
          <FormInput
            onBlur={onBlur}
            disabled={isLoading}
            id="title"
            ref={inputRef}
            defaultValue={title}
            className="font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-sky-800 border-2 mb-0.5 truncate"
          />
          <p className="text-xs font-medium text-neutral-700">
            in list{" "}
            <span className="text-sky-900 font-semibold">
              {" "}
              ({data.list.title})
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
export default HeaderModal;
