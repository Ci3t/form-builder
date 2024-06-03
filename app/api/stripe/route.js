import { db } from "@/configs";
import { userResponses, userSubscription } from "@/configs/schema";
import { stripe } from "@/configs/transaction";
import { auth, currentUser } from "@clerk/nextjs/server";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  console.log("1st GET");
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    const _userSubscription = await db
      .select()
      .from(userSubscription)
      .where(eq(userSubscription.userId, userId));

    if (_userSubscription[0] && _userSubscription[0].stripeCustomerId) {
      // trying to cancel at the billing portal
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: _userSubscription[0].stripeCustomerId,
        return_url: process.env.NEXT_PUBLIC_BASE_URL + "/",
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    //first time subscribe
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: process.env.NEXT_PUBLIC_BASE_URL + "/",
      cancel_url: process.env.NEXT_PUBLIC_BASE_URL + "/",
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user?.primaryEmailAddress?.emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Live Ai Form Creator",
              description: "Create your forms quickly with a single prompt",
            },
            unit_amount_decimal: 799,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log(`2nd Get`);
    console.log("error", error);
    return new NextResponse(error, { status: 500 });
  }
}
