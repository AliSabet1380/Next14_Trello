import { Skeleton } from "@/components/ui/skeleton";

const ActivitySkeleton = () => {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="bg-slate-400 h-6 w-6" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 bg-slate-400 mb-2" />
        <Skeleton className="w-full h-10 bg-slate-400" />
      </div>
    </div>
  );
};
export default ActivitySkeleton;
