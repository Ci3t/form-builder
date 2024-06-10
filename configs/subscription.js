import { auth } from "@clerk/nextjs/server";
import { db } from ".";
import { userSubscription } from "./schema";
import { eq } from "drizzle-orm";

export const checkSubscription = async () => {
  try {
    const DAY_IN_MS = 1000 * 60 * 60 * 24;
    const { userId } = await auth();

    if (!userId) {
      console.log("No userId found");
      return false;
    }

    const _userSubscription = await db
      .select()
      .from(userSubscription)
      .where(eq(userSubscription.userId, userId));
    console.log("User Subscription:", _userSubscription); // Log subscription details

    if (!_userSubscription[0]) {
      console.log("No subscription found");
      return false;
    }

    const userSubscription2 = _userSubscription[0];
    console.log("User Subscription Details:", userSubscription2); // Log subscription details

    const isValid =
      userSubscription2.stripePriceId &&
      userSubscription2.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS >
        Date.now();

    console.log("Is Valid:", isValid); // Log validity check

    return !!isValid;
  } catch (error) {
    console.error("Error in checkSubscription:", error); // Log any error
    throw error; // Rethrow to be caught in the API route
  }
};
