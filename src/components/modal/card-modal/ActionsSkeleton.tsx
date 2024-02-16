import { Skeleton } from "@/components/ui/skeleton";

const ActionsSkeleton = () => {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-slate-400" />
      <Skeleton className="w-full h-8 bg-slate-400" />
      <Skeleton className="w-full h-8 bg-slate-400" />
    </div>
  );
};
export default ActionsSkeleton;
