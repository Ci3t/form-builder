"use client";
import FormUi from "@/app/edit-form/_components/FormUi";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function LiveForm({ params }) {
  const [record, setRecord] = useState();
  const [jsonForm, setJsonForm] = useState([]);
  useEffect(() => {
    console.log(params.formid);
    params && GetFormData();
  }, []);

  const GetFormData = async () => {
    const res = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.id, Number(params?.formid)));

    setRecord(res[0]);
    setJsonForm(JSON.parse(res[0].jsonform));
    console.log(res);
  };
  return (
    <div
      className="p-10 flex justify-center items-center h-screen"
      style={{
        backgroundImage: record?.background,
      }}
    >
      {record && (
        <FormUi
          jsonform={jsonForm}
          onFieldUpdate={() => console.log()}
          deleteField={() => console.log()}
          selectedBorder={JSON.parse(record?.style)}
          selectedTheme={record?.theme}
          editable={false}
        />
      )}
      <Link
        href={"/"}
        className="flex justify-center gap-2 items-center px-3 py-1 rounded-full bg-black text-white fixed bottom-5 left-5"
      >
        <Image src={"/logo.svg"} alt="logo" width={100} height={100} />
        <br />
        <p> &copy; https://github.com/Ci3t</p>
      </Link>
    </div>
  );
}

export default LiveForm;
