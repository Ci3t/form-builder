"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  return (
    !path.includes("live-form") && (
      <div className="p-5 border-b border-b-violet-950 ">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image src={"/logo.png"} width={180} height={50} alt="logo" />
          </Link>

          {isSignedIn ? (
            <div className="flex items-center  gap-5">
              <Link href={"/dashboard"}>
                <Button
                  size="sm"
                  className="bg-[#472B89]  text-white hover:bg-[#FBFCF6] hover:text-[#472B89] hover:border-2 hover:border-[#472B89] border-transparent border-[2px] "
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
    )
  );
};

export default Header;
