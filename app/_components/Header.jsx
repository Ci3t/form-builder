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
      <div className="p-5 border-b border-b-blue-950 shadow-sm bg-gradient-to-t from-gray-900 to-black">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <Image src={"/logo.png"} width={180} height={50} alt="logo" />
          </Link>

          {isSignedIn ? (
            <div className="flex items-center  gap-5">
              <Link href={"/dashboard"}>
                <Button
                  size="sm"
                  className="bg-[#76a22f] btn text-white hover:bg-[#407c35]"
                >
                  Dashaboard
                </Button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <SignInButton>
              <Button
                className="bg-[#76a22f] btn text-white hover:bg-[#407c35]"
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
