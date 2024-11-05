"use client";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { toast } from "sonner";

import { ListWithCards } from "@/types";
import { useAction } from "@/hooks/useAction";
import { updateListOrder } from "@/lib/update-list-order";

import ListForm from "./ListForm";
import ListItem from "./ListItem";
import { updateCardOrder } from "@/lib/update-card-order";

type Props = {
  boardId: string;
  data: ListWithCards[];
};

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

const ListContanier = ({ boardId, data }: Props) => {
  const { excute: listReorderExcute } = useAction(updateListOrder, {
    onSuccess(data) {
      toast.success(`your list moved.`);
    },
    onError(error) {
      toast.error(error);
    },
  });
  const [orderdData, setOrderdData] = useState(data);

  useEffect(() => {
    setOrderdData(data);
  }, [data]);
  const { excute: cardReorderExcute } = useAction(updateCardOrder, {
    onSuccess(data) {
      toast.success("cards reorderd!");
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onDragEnd = (result: any) => {
    const { destination, source, type } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // User Darg a List
    if (type === "list") {
      const items = reorder(orderdData, source.index, destination.index).map(
        (item, idx) => ({ ...item, order: idx })
      );

      console.log(items);

      setOrderdData(items);

      listReorderExcute({ items });
    }

    // User Drag a Card
    if (type === "card") {
      let newOrderedData = [...orderdData];

      //find list of card
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      if (!sourceList.cards) sourceList.cards = [];
      if (!destList.cards) destList.cards = [];

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;

        setOrderdData(newOrderedData);

        cardReorderExcute({ items: reorderedCards });
      } else {
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        movedCard.listId = destination.droppableId;

        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        destList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderdData(newOrderedData);
        console.log(destList.cards);

        cardReorderExcute({ items: destList.cards });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list" type={"list"} direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-3 h-max flex-wrap"
          >
            {orderdData.map((list, i) => (
              <ListItem key={list.id} index={i} data={list} />
            ))}
             {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ListContanier;
