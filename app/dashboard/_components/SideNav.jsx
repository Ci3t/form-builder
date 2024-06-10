"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/configs";
import { FreeTierTracking, JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import {
  DiamondPlus,
  Library,
  LineChart,
  MessageCircleMore,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import CreateForm from "./CreateForm";

function SideNav({ isPro }) {
  const [formList, setFormList] = useState([]);
  const [percentForm, setPercentForm] = useState(0);
  const menu = [
    { id: 1, name: "My Forms", icon: Library, path: "/dashboard" },
    {
      id: 2,
      name: "Responses",
      icon: MessageCircleMore,
      path: "/dashboard/responses",
    },
    // { id: 3, name: "Analytics", icon: LineChart, path: "/dashboard/analytics" },
    { id: 4, name: "Upgrade", icon: DiamondPlus, path: "/dashboard/upgrade" },
  ];

  const path = usePathname();
  const { user } = useUser();
  useEffect(() => {
    user && GetFormList();
  }, [user, formList]);

  const GetFormList = async () => {
    const res = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(res);

    const percentFromDB = await db
      .select()
      .from(FreeTierTracking)
      .where(eq(FreeTierTracking.userId, user?.id))
      .orderBy(desc(FreeTierTracking.id));

    const percent = ((percentFromDB[0]?.formsCreated || 0) / 3) * 100;
    setPercentForm(percent);
  };

  return (
    <div className="h-screen shadow-md border-r border-r-violet-800 shadow-violet-800 bg-[radial-gradient(circle,_#242424_10%,_transparent_11%),radial-gradient(circle_at_bottom_left,_#242424_5%,_transparent_6%),radial-gradient(circle_at_bottom_right,_#242424_5%,_transparent_6%),radial-gradient(circle_at_top_left,_#242424_5%,_transparent_6%),radial-gradient(circle_at_top_right,_#242424_5%,_transparent_6%)] [background-size:1em_1em] bg-[#000000]">
      <div className="absolute top-2/4 left-2/4 w-full bg-[radial-gradient(circle,_rgba(123,_67,_255,_0.6),_transparent_60%)] filter blur-[100px] -translate-x-[70%] -translate-y-[10%] z-0 h-full"></div>
      <div className="relative z-12"></div>
      <div className="p-5">
        {menu.map((m, i) => (
          <Link
            href={m.path}
            key={i}
            className={`flex items-center gap-3 mb-3 p-4 hover:bg-[#472B89] hover:text-[#FBFCF6] rounded-lg cursor-pointer w-[90%] text-white ${
              path == m.path && "bg-[#472B89] text-[#FBFCF6] w-[90%]"
            }`}
          >
            <m.icon />
            {m.name}
          </Link>
        ))}
      </div>
      <div className="fixed bottom-7 p-6 w-64">
        <div className="w-full">
          <CreateForm isPro={isPro} className={"w-full"} />
        </div>
        {isPro ? (
          <h2 className="text-sm mt-2 text-violet-200 text-center">
            Pro Account
          </h2>
        ) : (
          <div className="my-5">
            <Progress value={percentForm} />
            <h2 className="text-sm mt-2 text-violet-200">
              <strong>{((percentForm / 100) * 3).toFixed(0)} </strong>Out of{" "}
              <strong>3</strong> File Created
            </h2>
            <h2 className="text-sm mt-2 text-violet-200">
              Upgrade to Pro for unlimited AI Form
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideNav;
