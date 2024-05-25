"use client";
import {
  DiamondPlus,
  Library,
  LineChart,
  MessageCircleMore,
} from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav() {
  const menu = [
    { id: 1, name: "My Forms", icon: Library, path: "/dashboard" },
    {
      id: 1,
      name: "Responses",
      icon: MessageCircleMore,
      path: "/dashboard/responses",
    },
    { id: 1, name: "Analytics", icon: LineChart, path: "/dashboard/analytics" },
    { id: 1, name: "Upgrade", icon: DiamondPlus, path: "/dashboard/upgrade" },
  ];

  const path = usePathname();

  useEffect(() => {}, [path]);

  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {menu.map((m, i) => (
          <h2
            key={i}
            className={`flex items-center gap-3 mb-3 p-4 hover:bg-primary hover:text-white rounded-lg cursor-pointer text-gray-500 ${
              path == m.path && "bg-primary text-[#fff]"
            }`}
          >
            <m.icon />
            {m.name}
          </h2>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
