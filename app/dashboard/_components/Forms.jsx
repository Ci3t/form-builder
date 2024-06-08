"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import SubForm from "./SubForm";

function Forms() {
  const { user } = useUser();
  const [formsList, setFormList] = useState([]);
  const GetFormList = async () => {
    const res = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));

    setFormList(res);
    console.log(res);
  };

  useEffect(() => {
    user && GetFormList();
  }, [user]);

  return (
    <div className="mt-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
      {formsList.map((form, i) => (
        <div key={i + form}>
          <SubForm
            form={JSON.parse(form.jsonform)}
            formRecord={form}
            refreshData={GetFormList}
          />
        </div>
      ))}
    </div>
  );
}

export default Forms;
