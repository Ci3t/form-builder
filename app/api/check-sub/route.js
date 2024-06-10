// /app/api/check-subscription/route.js
import { NextResponse } from "next/server";
import { checkSubscription } from "@/configs/subscription";

export async function GET() {
  try {
    const isPro = await checkSubscription();

    return NextResponse.json({ isPro });
  } catch (error) {
    console.error("Error in API route:", error); // Log detailed error
    return NextResponse.json(
      { error: "Failed to check subscription" },
      { status: 500 }
    );
  }
}
