import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import EditField from "./EditField";
import { useState } from "react";

function FormUi({
  jsonform,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedBorder,
  editable = true,
}) {
  const [formData, setFormData] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form
      onSubmit={onFormSubmit}
      className="my-3 border p-5 md:w-[600px] rounded-lg"
      data-theme={selectedTheme}
      style={{
        boxShadow:
          selectedBorder?.key == selectedBorder?.key && selectedBorder?.value,
        border:
          selectedBorder?.name == selectedBorder?.name && selectedBorder?.value,
      }}
    >
      <h2 className="font-bold text-center text-2xl ">{jsonform?.formTitle}</h2>
      <h2 className="text-sm  text-center">{jsonform?.formSubheading}</h2>

      {jsonform?.formFields?.map((field, i) => (
        <div key={i} className="flex items-center gap-2">
          {field.fieldType == "select" ? (
            <div className="my-3 w-full">
              <label className="text-sm  ">{field?.label}</label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange(field?.fieldName, value)
                }
                required={field?.required}
              >
                <SelectTrigger className="w-full bg-inherit text-inherit">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options.map((option, i) => (
                    <SelectItem key={i} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : field.fieldType == "radio" ? (
            <div className="my-3 w-full">
              <label className="text-sm  ">{field?.label}</label>
              <RadioGroup required={field?.required}>
                {field.options?.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem
                      onClick={() =>
                        handleSelectChange(field?.fieldName, option)
                      }
                      className="border-inherit text-inherit"
                      value={option}
                      id={option}
                    />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType == "checkbox" ? (
            <div className="my-3 w-full">
              <label className="text-sm  ">{field.label}</label>

              {field?.options ? (
                field?.options?.map((option, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <Checkbox className="border-inherit bg-inherit data-[state=checked]:text-inherit data-[state=checked]:bg-inherit" />
                    <h2>{option}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox />
                  <h2>{field.label}</h2>
                </div>
              )}
            </div>
          ) : (
            <div className="my-3 w-full">
              <label className="text-sm  ">{field?.label}</label>
              <Input
                required={field?.required}
                onChange={(e) => handleInputChange(e)}
                className="bg-inherit text-inherit placeholder:text-inherit"
                type={field?.fieldType}
                placeholder={field?.placeholder}
                name={field?.fieldName}
              />
            </div>
          )}
          {editable && (
            <div>
              <EditField
                defaultValue={field}
                onUpdate={(value) => onFieldUpdate(value, i)}
                deleteField={() => deleteField(i)}
              />
            </div>
          )}
        </div>
      ))}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default FormUi;
