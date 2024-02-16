"use client";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import InfoSkeleton from "./InfoSkeleton";

type Props = {
  isPro: boolean;
};

const Info = ({ isPro }: Props) => {
  const { organization, isLoaded } = useOrganization();

  if (!isLoaded) return <InfoSkeleton />;

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-14 h-14 relative">
        <Image
          src={organization?.imageUrl!}
          alt="org"
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div>
        <p className="text-md font-semibold">{organization?.name}</p>
        <div className="flex items-center gap-2 text-xs">
          <CreditCard className="w-3 h-3" />
          <span className="font-semibold text-slate-500">
            {isPro ? "Pro" : "Free"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Info;
