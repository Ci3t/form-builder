import { auth } from "@clerk/nextjs/server";
import { db } from ".";
import { userSubscription } from "./schema";
import { eq } from "drizzle-orm";

export const checkSubscription = async () => {
  const DAY_IN_MS = 1000 * 60 * 60 * 24;
  const { userId } = await auth();
  if (!userId) {
    return false;
  }

  const _userSubscription = await db
    .select()
    .from(userSubscription)
    .where(eq(userSubscription.userId, userId));

  if (!_userSubscription[0]) {
    return false;
  }

  const userSubscription2 = _userSubscription[0];

  const isValid =
    userSubscription2.stripePriceId &&
    userSubscription2.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS >
      Date.now();

  return !!isValid;
};
