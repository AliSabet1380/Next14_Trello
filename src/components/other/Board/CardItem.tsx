"use client";

import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@prisma/client";
import { useCardModal } from "@/hooks/useCardModal";

type Props = {
  data: Card;
  index: number;
};

const CardItem = ({ data, index }: Props) => {
  const { onOpen } = useCardModal();
  return (
    <Draggable index={index} draggableId={data.id}>
      {(provided) => (
        <div
          onClick={() => onOpen(data.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="truncate border-2 border-transparent font-medium hover:border-black p-3 text-sm bg-slate-400/60 rounded-md shadow-md"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  );
};
export default CardItem;
