"use client";
import Pricing from "@/app/_themeData/Pricing";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import Sub from "./_components/Sub";

function Upgrade() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);

  const handleSubscription = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/stripe");

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const res = await axios.get("/api/check-sub");

        setIsPro(res.data.isPro);
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    checkSubscriptionStatus();
  }, []);

  return (
    <div className="p-10">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8 ">
          {Pricing.map((price, i) => (
            <div
              key={i + price.price}
              className="  sm:px-8 lg:p-12 shadow-sm shadow-indigo-400 rounded-lg p-4 bg-[#472B89] h-full w-full  bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-15 backdrop-saturate-50 backdrop-contrast-100 border-[1px] border-violet-300 border-opacity-30"
            >
              <div className="text-center">
                <h2 className="text-lg font-medium text-[#FBFCF6]">
                  {price.duration}
                </h2>

                <p className="mt-2 sm:mt-4">
                  <strong className="text-3xl font-bold text-violet-300 sm:text-4xl">
                    {" "}
                    {price.price}$
                  </strong>

                  <span className="text-sm font-medium text-[#FBFCF6]">
                    /{price.duration}
                  </span>
                </p>
              </div>

              <ul className="mt-6 space-y-2">
                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-purple-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-[#FBFCF6]"> Infinite Forms </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-purple-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-[#FBFCF6]"> No Limit </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-purple-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-[#FBFCF6]"> Email support </span>
                </li>

                <li className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-purple-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>

                  <span className="text-[#FBFCF6]"> Help center access </span>
                </li>
              </ul>

              <Sub isPro={isPro} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
