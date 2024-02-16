import Info from "@/components/other/Dashboard/organization/Info";
import { Separator } from "@/components/ui/separator";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "./_components/subscription-button";

const BillingPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="w-full p-10">
      <Info isPro={isPro} />
      <Separator className="bg-slate-900 my-2" />
      <SubscriptionButton isPro={isPro} />
    </div>
  );
};
export default BillingPage;
