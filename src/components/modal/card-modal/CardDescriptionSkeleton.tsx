import { Skeleton } from "@/components/ui/skeleton";

const CardDescriptionSkeleton = () => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="bg-slate-400 h-6 w-6 " />
      <div className="w-full">
        <Skeleton className="w-24 h-6 mb-2  bg-slate-400" />
        <Skeleton className="w-full h-[78px] bg-slate-400" />
      </div>
    </div>
  );
};
export default CardDescriptionSkeleton;
