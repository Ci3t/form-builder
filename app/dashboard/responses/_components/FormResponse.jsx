import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { count, eq } from "drizzle-orm";
import { LoaderPinwheel } from "lucide-react";
import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
function FormResponse({ form, formRecord }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [resCount, setResCount] = useState([]);
  const exportData = async () => {
    const jsonData = [];
    setLoading(true);
    const res = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formId, formRecord.id));

    if (res) {
      res.forEach((response) => {
        const jsonRes = JSON.parse(response.jsonResponse);
        jsonData.push(jsonRes);
      });
      setLoading(false);
      console.log(jsonData);
      exportToExcel(jsonData);
    }
  };

  const getSum = async () => {
    const res = await db
      .select({
        formId: userResponses.formId,
        responseCount: count(userResponses.id),
      })
      .from(userResponses)
      .groupBy(userResponses.formId)
      .execute();
    console.log(res);
    setResCount(res);
  };

  useEffect(() => {
    user && getSum();
  }, [user]);

  const exportToExcel = async (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, form?.formTitle + ".xlsx");
  };
  return (
    <div className="border shadow-sm rounded-lg p-4 my-5">
      <h2 className="text-lg">{form?.formTitle}</h2>
      <h2 className="text-sm text-gray-500">{form?.formSubheading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between">
        <h2 className="text-sm gap-2">
          {resCount?.map(
            (res) => formRecord.id == res.formId && <b> {res.responseCount}</b>
          )}{" "}
          Repsonses
        </h2>{" "}
        <Button size="sm" onClick={() => exportData()} disabled={loading}>
          {loading ? <LoaderPinwheel className="animate-spin" /> : "Export"}
        </Button>
      </div>
    </div>
  );
}

export default FormResponse;
