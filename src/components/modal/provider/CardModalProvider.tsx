"use client";
import { useState, useEffect } from "react";

import CardModal from "../card-modal/CardModal";
import { ProModal } from "../ProModal";

const CardModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};

export default CardModalProvider;
