import Info from "@/components/other/Dashboard/organization/Info";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";

import { ActivityList } from "./_components/activity-list";
import { checkSubscription } from "@/lib/subscription";

const ActivityPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full p-10">
      <Info isPro={isPro} />
      <Separator className="bg-slate-900 my-2" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};
export default ActivityPage;
