import { Skeleton } from "@/components/ui/skeleton";

const NavItemSkeleton = () => {
  return (
    <div className="flex items-center gap-x-2 p-2">
      <div className="w-10 h-10 shrink-0 relative">
        <Skeleton className="h-full w-full absolute bg-slate-200" />
      </div>
      <Skeleton className="h-10 w-full bg-slate-200" />
    </div>
  );
};
export default NavItemSkeleton;
