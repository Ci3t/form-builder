"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import FormResponse from "./_components/FormResponse";
import ResponseTable from "./view-response/page";

function Responses() {
  const { user } = useUser();
  const [forms, setForms] = useState([]);
  const getForms = async () => {
    const res = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress));

    setForms(res);
  };

  useEffect(() => {
    user && getForms();
  }, [user]);

  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl flex items-center justify-between text-white">
        Responses
      </h2>
      <div className="grid grid-cols-1  gap-5">
        {forms.map((form, i) => (
          <div key={i + form}>
            <FormResponse
              key={i + form}
              form={JSON.parse(form.jsonform)}
              formRecord={form}
            />
            {/* <div className="hidden">
              <ResponseTable
                key={i + form}
                form={JSON.parse(form.jsonform)}
                formRecord={form}
              />
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Responses;
