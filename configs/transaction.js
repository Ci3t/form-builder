import Stripe from "stripe";
import { cwd } from "node:process";

import { loadEnvConfig } from "@next/env";

loadEnvConfig(cwd());
export const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10",
});
