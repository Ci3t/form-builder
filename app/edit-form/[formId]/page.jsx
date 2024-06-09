"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft, ScanEye, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormUi from "../_components/FormUi";
import { json } from "drizzle-orm/mysql-core";
import { toast } from "sonner";
import Controller from "../_components/Controller";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RWebShare } from "react-web-share";

function EditForm({ params }) {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState();
  const [record, setRecord] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [selectedBg, setSelectedBg] = useState();
  const [selectedBorder, setSelectedBorder] = useState();
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
    setSelectedBg(res[0].background);
    setSelectedTheme(res[0].theme);
    setSelectedBorder(JSON.parse(res[0].style));
  };
  const onFieldUpdate = (value, i) => {
    const editedOptionsString =
      typeof value.options === "string"
        ? value.options.split(",")
        : value.options; // Join all elements into a single string
    const editedOptionsArray = editedOptionsString.map((option) => option); // Split the string into an array and trim each option

    jsonForm.formFields[i].label = value.label;
    jsonForm.formFields[i].placeholder = value.placeholder;
    jsonForm.formFields[i].options = editedOptionsArray;

    setUpdateTrigger(Date.now());
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
    toast("Updated!!!");
  };

  const deleteField = (indexToRemove) => {
    const res = jsonForm.formFields.filter((item, i) => i != indexToRemove);
    jsonForm.formFields = res;
    setUpdateTrigger(Date.now());
  };

  const updateFields = async (val, colName) => {
    const res = await db
      .update(JsonForms)
      .set({
        [colName]: val,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );
    toast(
      [colName] == "enableSignIn"
        ? "Authentication Enabled"
        : [colName] + " Updated!!!"
    );
  };
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h2
          className="flex gap-2 items-center my-5 cursor-pointer hover:font-bold transition-all text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft /> Back
        </h2>
        <div className="flex gap-2">
          <Link href={"/live-form/" + record?.id} target="_blank">
            <Button className="flex gap-2 bg-[#472B89]  text-white hover:bg-[#FBFCF6] hover:text-[#472B89] hover:border-2 hover:border-[#472B89] border-transparent border-[2px]">
              <ScanEye /> Preview
            </Button>
          </Link>
          <RWebShare
            data={{
              text: jsonForm?.formSubheading,
              url: "/live-form/" + record?.id,
              title: jsonForm?.formTitle,
            }}
            onClick={() => console.log("shared successfully!")}
          >
            <Button className="flex gap-2 hover:bg-[#472B89]  hover:text-white bg-[#FBFCF6] text-[#472B89] hover:border-2 hover:border-[#472B89] border-transparent border-[2px]">
              <Share2 />
              Share
            </Button>
          </RWebShare>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-sm bg-[#FBFCF6]  ">
          <Controller
            selectedTheme={(val) => {
              updateFields(val, "theme");
              setSelectedTheme(val);
            }}
            selectedBg={(val) => {
              updateFields(val, "background");
              setSelectedBg(val);
            }}
            selectedBorder={(val) => {
              updateFields(val, "style");
              setSelectedBorder(val);
            }}
            selectedBorder2={selectedBorder}
            setSignInEnable={(val) => {
              updateFields(val, "enableSignIn");
            }}
          />
        </div>
        <div
          className="md:col-span-2 border rounded-lg  p-5 flex items-center justify-center bg-[#472B89] bg-opacity-50"
          style={{ backgroundImage: selectedBg }}
        >
          <FormUi
            selectedTheme={selectedTheme}
            selectedBorder={selectedBorder}
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
