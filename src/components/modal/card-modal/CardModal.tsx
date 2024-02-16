"use client";

import { useQuery } from "@tanstack/react-query";

import { AuditLog } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useCardModal } from "@/hooks/useCardModal";
import { CardWithList } from "../../../types";

import HeaderModal from "./HeaderModal";
import HeaderModalSkeleton from "./HeaderModalSkeleton";
import CardDescription from "./CardDescription";
import CardDescriptionSkeleton from "./CardDescriptionSkeleton";
import Actions from "./Actions";
import ActionsSkeleton from "./ActionsSkeleton";
import Activity from "./Activity";

const CardModal = () => {
  const { id, isOpen, onClose } = useCardModal((state) => state);

  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/card/${id}`),
  });

  const { data: auditLogData } = useQuery<AuditLog[]>({
    queryKey: ["card-log", id],
    queryFn: () => fetcher(`/api/card/${id}/logs`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <HeaderModal data={cardData} /> : <HeaderModalSkeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? (
                <CardDescription data={cardData} />
              ) : (
                <CardDescriptionSkeleton />
              )}
            </div>
          </div>
          {cardData ? <Actions data={cardData} /> : <ActionsSkeleton />}
          <div className="w-max">
            {auditLogData ? (
              <Activity data={auditLogData} />
            ) : (
              <ActionsSkeleton />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CardModal;
