import { Skeleton } from "@/components/ui/skeleton";

const InfoSkeleton = () => {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-14 h-14 relative">
        <Skeleton className="w-full h-full absolute bg-slate-200" />
      </div>
      <div className="flex flex-col w-52 h-10 gap-2">
        <Skeleton className="h-1/2 w-full bg-slate-200" />
        <div className="h-1/2 flex gap-2">
          <Skeleton className="w-1/12 bg-slate-200" />
          <Skeleton className="w-7/12 bg-slate-200" />
        </div>
      </div>
    </div>
  );
};
export default InfoSkeleton;
