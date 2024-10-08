import { auth } from "@clerk/nextjs";

import { db } from "./DB";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = auth();

  if (!orgId) return false;

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
      select: {
        stripeCurrentPeriodEnd: true,
        stripeCustomerId: true,
        stripePriceId: true,
        stripeSubscriptionId: true,
      },
    });

    if (!orgSubscription) return false;

    const isValid =
      orgSubscription.stripePriceId &&
      orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS >
        Date.now();

    return !!isValid;
  } catch (error) {
    throw new Error("Server Error");
  }
};
