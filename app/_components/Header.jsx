"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideNav from "../dashboard/_components/SideNav";
import axios from "axios";
import { Menu } from "lucide-react";
const Header = () => {
  const { user, isSignedIn } = useUser();
  const [isPro, setIsPro] = useState(false);

  const path = usePathname();
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
    !path.includes("live-form") && (
      <div
        className={` ${
          path.includes("/dashboard") &&
          " sticky top-0 z-50 bg-[radial-gradient(circle,_#242424_10%,_transparent_11%),radial-gradient(circle_at_bottom_left,_#242424_5%,_transparent_6%),radial-gradient(circle_at_bottom_right,_#242424_5%,_transparent_6%),radial-gradient(circle_at_top_left,_#242424_5%,_transparent_6%),radial-gradient(circle_at_top_right,_#242424_5%,_transparent_6%)] [background-size:1em_1em] bg-[#000000]"
        }`}
      >
        {path.includes("/dashboard") && (
          <div className="absolute top-2/4 left-2/4 w-full bg-[radial-gradient(circle,_rgba(123,_67,_255,_0.6),_transparent_60%)] filter blur-[100px] -translate-x-[70%] -translate-y-[50%] z-0 h-full"></div>
        )}
        <div className="p-5 border-b border-b-violet-950 ">
          <div className="flex items-center justify-between">
            <Link className="w-[120px] md:w-[180px] mr-2" href={"/"}>
              <Image
                src={"/logo.png"}
                width={180}
                height={50}
                alt="logo"
                className="md:drop-shadow-[2px_0px_0px_rgba(112,73,205,1)] "
              />
            </Link>

            {isSignedIn ? (
              <div className="flex items-center gap-5">
                <Sheet>
                  <SheetContent className="p-0 text-white">
                    <SideNav isPro={isPro} />
                  </SheetContent>

                  <SheetTrigger className="md:hidden">
                    <Button
                      size="sm"
                      className="bg-[#472B89] text-white hover:bg-[#FBFCF6] hover:text-[#472B89] hover:border-2 hover:border-[#472B89] border-transparent border-[2px] inline-block "
                    >
                      <Menu />
                    </Button>
                  </SheetTrigger>
                </Sheet>

                <Link href={"/dashboard"}>
                  <Button
                    size="sm"
                    className="bg-[#472B89]  text-white hover:bg-[#FBFCF6] hover:text-[#472B89] hover:border-2 hover:border-[#472B89] border-transparent border-[2px]  "
                  >
                    Dashaboard
                  </Button>
                </Link>

                <UserButton />
              </div>
            ) : (
              <SignInButton>
                <Button
                  className="bg-[#472B89]  text-white hover:bg-[#FBFCF6] hover:text-[#472B89] hover:border-2 hover:border-[#472B89] border-transparent border-[2px] "
                  size="sm"
                >
                  Get Started
                </Button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
