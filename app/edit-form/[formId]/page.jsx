"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import { json } from "drizzle-orm/mysql-core";
import { toast } from "sonner";
import Controller from "../_components/Controller";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const router = useRouter();

  const getFormData = async () => {
    const res = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params?.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    setRecord(res[0]);
    setJsonForm(JSON.parse(res[0].jsonform));
  };
  const onFieldUpdate = (value, i) => {
    jsonForm.formFields[i].label = value.label;
    jsonForm.formFields[i].placeholder = value.placeholder;
    setUpdateTrigger(Date.now());

    console.log(jsonForm.formFields[i]);
  };
  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonDB();
    }
  }, [updateTrigger]);
  useEffect(() => {
    user && getFormData();
  }, [user]);

  const updateJsonDB = async () => {
    const res = await db
      .update(JsonForms)
      .set({
        jsonform: jsonForm,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    toast("Field Updated!!!");
  };
  const deleteField = (indexToRemove) => {
    const res = jsonForm.formFields.filter((item, i) => i != indexToRemove);
    jsonForm.formFields = res;
    setUpdateTrigger(Date.now());
  };
  return (
    <div className="p-10">
      <h2
        className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold transition-all"
        onClick={() => router.back()}
      >
        <ArrowLeft /> Back
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-sm ">
          <Controller selectedTheme={(val) => setSelectedTheme(val)} />
        </div>
        <div className="md:col-span-2 border rounded-lg  p-5 flex items-center justify-center">
          <FormUi
            selectedTheme={selectedTheme}
            jsonform={jsonForm}
            onFieldUpdate={onFieldUpdate}
            deleteField={(i) => deleteField(i)}
          />
        </div>
      </div>
    </div>
  );
}

export default EditForm;
