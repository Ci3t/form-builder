"use client";
import FormUi from "@/app/edit-form/_components/FormUi";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LiveForm({ params }) {
  const [record, setRecord] = useState();
  const [jsonForm, setJsonForm] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  useEffect(() => {
    params && GetFormData();
  }, []);

  const GetFormData = async () => {
    const res = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.id, Number(params?.formid)));

    setRecord(res[0]);
    setJsonForm(JSON.parse(res[0].jsonform));
  };
  return (
    <div
      className="p-10 flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: record?.background,
      }}
    >
      {isSubmited ? (
        <Card className="shadow-sm shadow-indigo-400 rounded-lg p-4 bg-[#472B89] h-full bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-40 backdrop-saturate-50 backdrop-contrast-100 border-[1px] border-violet-300 border-opacity-30 text-[#FBFCF6]">
          <CardHeader>
            <CardTitle>Form Submitted!🎉</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Thank you for submitting!✨</p>
          </CardContent>
        </Card>
      ) : (
        record && (
          <FormUi
            jsonform={jsonForm}
            onFieldUpdate={() => console.log()}
            deleteField={() => console.log()}
            selectedBorder={JSON.parse(record?.style)}
            selectedTheme={record?.theme}
            editable={false}
            formId={record?.id}
            enableSignIn={record?.enableSignIn}
            setIsSubmited={setIsSubmited}
          />
        )
      )}
      <Link
        href={"/"}
        className="flex justify-center gap-2 items-center px-3 py-1 rounded-full bg-black text-white fixed bottom-5 left-5"
      >
        <Image src={"/logo.png"} alt="logo" width={100} height={100} />
        <br />
        <p> &copy; https://github.com/Ci3t</p>
      </Link>
    </div>
  );
}

export default LiveForm;
