// import { Button } from "@/components/ui/button";

import CreateForm from "./_components/CreateForm";
import Forms from "./_components/Forms";
// import { db } from "@/configs";
// import { JsonForms } from "@/configs/schema";
// import { useUser } from "@clerk/nextjs";
// import { desc, eq } from "drizzle-orm";
// import { usePathname } from "next/navigation";
// import React, { useEffect, useState } from "react";

const Dashboard = () => {
  // const [formList, setFormList] = useState([]);
  // const [percentForm, setPercentForm] = useState(0);
  // const path = usePathname();
  // const { user } = useUser();
  // useEffect(() => {
  //   user && GetFormList();
  // }, [user]);

  // const GetFormList = async () => {
  //   const res = await db
  //     .select()
  //     .from(JsonForms)
  //     .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
  //     .orderBy(desc(JsonForms.id));

  //   setFormList(res);
  //   console.log(res);

  //   const percent = (res.length / 3) * 100;
  //   setPercentForm(percent);
  // };
  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl flex items-center justify-between">
        Dashboard
        <CreateForm />
      </h2>
      {/* Forms */}

      <Forms />
    </div>
  );
};

export default Dashboard;
