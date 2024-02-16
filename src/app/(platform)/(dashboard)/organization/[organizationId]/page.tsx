import { Suspense } from "react";

import BoardList from "@/components/other/Dashboard/organization/BoardList";
import BoardListSkeleton from "@/components/other/Dashboard/organization/BoardListSkeleton";
import Info from "@/components/other/Dashboard/organization/Info";

import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";

const OrganizationIdPage = async ({
  params,
}: {
  params: { organizationId: string };
}) => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full mb-20 p-10 space-y-2">
      <Info isPro={isPro} />
      <Separator className="bg-sky-600" />
      <Suspense fallback={<BoardListSkeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
};
export default OrganizationIdPage;
