import { Skeleton } from "@/components/ui/skeleton";

const BoardListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-200" />
      <Skeleton className="aspect-video h-full w-full p-2 bg-slate-200" />
    </div>
  );
};
export default BoardListSkeleton;
