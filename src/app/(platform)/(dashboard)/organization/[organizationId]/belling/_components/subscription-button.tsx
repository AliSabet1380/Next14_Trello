"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/lib/stripe-redirect";
import { useProModal } from "@/hooks/useProModal";

type Props = {
  isPro: boolean;
};

export const SubscriptionButton = ({ isPro }: Props) => {
  const proModal = useProModal();

  const { excute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data;
    },
    onError(error) {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) excute({});
    else proModal.onOpen();
  };

  return (
    <Button
      onClick={onClick}
      className=""
      disabled={isLoading}
      variant={"secondary"}
    >
      {isPro ? "Manage subscription" : "Upgrade to pro"}
    </Button>
  );
};
