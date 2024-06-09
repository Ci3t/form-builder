import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { userResponses } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, count, eq } from "drizzle-orm";
import { LoaderPinwheel } from "lucide-react";

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { json } from "drizzle-orm/mysql-core";

function FormResponse({ form, formRecord }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [resCount, setResCount] = useState([]);
  const [ResData, setResData] = useState([]);
  const exportData = async () => {
    const jsonData = [];
    setLoading(true);
    const res = await db
      .select()
      .from(userResponses)
      .where(eq(userResponses.formId, formRecord.id));
    console.log(res);
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

  console.log(ResData);
  // Define an async function named `getSum` that retrieves the total number of responses for a specific form record
  const getSum = async () => {
    // Execute a database query to select the formId and count of responses for each form record
    const res = await db
      .select({
        formId: userResponses.formId,
        responseCount: count(userResponses.id),
      })
      .from(userResponses)
      .groupBy(userResponses.formId)
      .where(eq(userResponses.formId, formRecord.id))
      .execute();

    if (res.length > 0) {
      const resData = await Promise.all(
        res.map(async (response) => {
          const jsonResponse = await db
            .select({ jsonResponse: userResponses.jsonResponse })
            .from(userResponses)
            .where(eq(userResponses.formId, response.formId))
            .execute();

          return jsonResponse
            .map((data) =>
              data.jsonResponse ? JSON.parse(data.jsonResponse) : null
            )
            .filter((data) => data !== null);
        })
      );

      setResCount(res);
      setResData(resData.flat());
    }
  };

  // const getResponseData = async (formId) => {
  //   const resData = await db
  //     .select({ jsonResponse: userResponses.jsonResponse })
  //     .from(userResponses)
  //     .where(eq(userResponses.formId, formId))
  //     .execute();

  //   const res = resData
  //     .map((response) =>
  //       response.jsonResponse ? JSON.parse(response.jsonResponse) : null
  //     )
  //     .filter((data) => data !== null);

  //   setResData(res);
  // };

  useEffect(() => {
    user && getSum();
  }, [ResData]);

  const exportToExcel = async (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, form?.formTitle + ".xlsx");
  };
  return (
    <div className="shadow-sm shadow-indigo-400 rounded-lg p-4 bg-[#472B89] h-full w-full  bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-20 backdrop-saturate-50 backdrop-contrast-100 border-[1px] border-violet-300 border-opacity-30 my-5">
      <h2 className="text-lg text-[#FBFCF6]">{form?.formTitle}</h2>
      <h2 className="text-sm text-violet-300 mb-3">{form?.formSubheading}</h2>
      <div className="flex justify-between">
        <h2 className="text-sm text-[#FBFCF6] flex gap-1 items-center">
          {/* {resCount?.map((res, i) => (
            <div className="text-[#b59ee9] " key={i}>
              {formRecord.id == res.formId ? <b>{res.responseCount}</b> : 0}
            </div>
          ))} */}
          {ResData.length > 0 ? <b>{ResData.length}</b> : 0} Repsonses
        </h2>
        <div className="flex gap-2 justify-center items-center">
          <Button
            className=" bg-[#472B89]  text-[#FBFCF6] hover:bg-[#FBFCF6] hover:text-[#472B89]  hover:border hover:border-[#472B89]  border-transparent border-[1px]"
            size="sm"
            onClick={() => exportData()}
            disabled={loading}
          >
            {loading ? <LoaderPinwheel className="animate-spin " /> : "Export"}
          </Button>
        </div>
      </div>
      {ResData.length > 0 && (
        <Table>
          <TableCaption className="text-white">
            A list of user responses.
          </TableCaption>
          <TableHeader>
            <TableRow>
              {Object.keys(ResData[0]).map((key) => (
                <TableHead key={key} className="w-[100px] text-[#FBFCF6]">
                  {key}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {ResData.map((data) => (
              <TableRow key={data}>
                {Object.entries(data).map(([key, value]) => (
                  <TableCell
                    key={key}
                    className="px-6 py-4  border-violet-500 border-b text-[#FBFCF6]"
                  >
                    {value}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

export default FormResponse;
