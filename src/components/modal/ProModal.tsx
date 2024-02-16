"use client";
import Image from "next/image";
import { toast } from "sonner";

import { useProModal } from "@/hooks/useProModal";
import { useAction } from "@/hooks/useAction";
import { stripeRedirect } from "@/lib/stripe-redirect";

import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";

export const ProModal = () => {
  const { excute, isLoading } = useAction(stripeRedirect, {
    onSuccess(data) {
      window.location.href = data;
    },
    onError(error) {
      toast.error(error);
    },
  });
  const { isOpen, onClose, onOpen } = useProModal();

  const onClick = () => {
    excute({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center ">
          <Image src={"/hero.svg"} alt="image" fill className="object-cover" />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6">
          <h2 className="font-semibold text-xl">
            Upgrade to Taskify Pro today!
          </h2>
          <p className="text-xs font-semibold text-neutral-600">
            Explore the best of Taskify
          </p>
          <div className="pl-3">
            <ul className="text-sm list-disc">
              <li>Unlimited Boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            onClick={onClick}
            disabled={isLoading}
            className="w-full capitalize"
            variant={"secondary"}
          >
            upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
