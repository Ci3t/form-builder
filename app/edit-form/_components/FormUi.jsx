import { Input } from "@/components/ui/input";
import React from "react";

function FormUi({ jsonform }) {
  return (
    <div className="my-3 border p-5 md:w-[600px]">
      <h2 className="font-bold text-center text-2xl text-primary">
        {jsonform?.formTitle}
      </h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonform?.formSubheading}
      </h2>

      {jsonform?.formFields?.map((field, i) => (
        <div key={i}>
          <label className="text-sm text-gray-500 ">{field?.label}</label>
          <Input
            type={field?.fieldType}
            placeholder={field?.placeholder}
            name={field?.fieldName}
          />
        </div>
      ))}
    </div>
  );
}

export default FormUi;
