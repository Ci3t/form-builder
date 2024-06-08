// import { Button } from "@/components/ui/button";

import { checkSubscription } from "@/configs/subscription";
import CreateForm from "./_components/CreateForm";
import Forms from "./_components/Forms";

// import { db } from "@/configs";
// import { JsonForms } from "@/configs/schema";
// import { useUser } from "@clerk/nextjs";
// import { desc, eq } from "drizzle-orm";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";

const Dashboard = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="p-10 ">
      <h2 className="font-bold text-2xl flex items-center justify-between text-[#1D3853] border-b border-b-slate-500 pb-2">
        Dashboard
        <CreateForm isPro={isPro} />
      </h2>
      {/* Forms */}

      <Forms />
    </div>
  );
};

export default Dashboard;
