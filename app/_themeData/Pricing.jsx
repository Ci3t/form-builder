export default [
  {
    link: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PAYMENT_LINK,
    price: 7.99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICEID,
    duration: "Monthly",
  },
];
