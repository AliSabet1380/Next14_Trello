"use server";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { absolutUrl } from "../utils";
import { db } from "../DB";
import { createSafeAction } from "../create-safe-action";
import { stripe } from "../stripe";

import { ReturnType } from "./types";
import { StripeRedirectSchema } from "./schema";

const handler = async (): Promise<ReturnType> => {
  const { orgId, userId } = auth();
  const user = await currentUser();

  if (!orgId || !userId || !user)
    return {
      error: "Unauthorized!",
    };

  const settingsUrl = absolutUrl(`/organization/${orgId}`);
  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSesstion = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      url = stripeSesstion.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        customer_email: user?.emailAddresses[0].emailAddress,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Taskify Pro",
                description: "Unlimited board for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "year",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });

      url = stripeSession.url || "";
    }
  } catch (error) {
    return { error: "Server Error" };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirectSchema, handler);
