import { create } from "zustand";

type ProModalProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useProModal = create<ProModalProps>((state) => ({
  isOpen: false,
  onOpen: () => state({ isOpen: true }),
  onClose: () => state({ isOpen: false }),
}));
