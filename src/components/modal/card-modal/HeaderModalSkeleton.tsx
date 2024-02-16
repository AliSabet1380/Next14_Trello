import { Skeleton } from "@/components/ui/skeleton";

const HeaderModalSkeleton = () => {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="h-6 w-6 mt-1 bg-slate-400" />
      <div className="">
        <Skeleton className="w-24 h-6 mb-1 bg-slate-400" />
        <Skeleton className="w-12 h-4  bg-slate-400" />
      </div>
    </div>
  );
};
export default HeaderModalSkeleton;
