import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";

import { db } from "@/lib/DB";

import { Skeleton } from "@/components/ui/skeleton";
import ActivityItem from "@/components/modal/card-modal/ActivityItem";

export const ActivityList = async () => {
  const { orgId } = auth();

  if (!orgId) redirect("/select-org");

  const activity = await db.auditLog.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createAt: "desc",
    },
    take: 10,
  });

  return (
    <ol className="space-y-4 mt-4">
      {activity.length === 0 ? (
        <p className="text-xs text-center text-muted-foreground">No Activity</p>
      ) : (
        activity.map((item) => <ActivityItem key={item.id} data={item} />)
      )}
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14 bg-slate-400" />
      <Skeleton className="w-[50%] h-14 bg-slate-400" />
      <Skeleton className="w-[60%] h-14 bg-slate-400" />
      <Skeleton className="w-[70%] h-14 bg-slate-400" />
      <Skeleton className="w-[75%] h-14 bg-slate-400" />
    </ol>
  );
};
