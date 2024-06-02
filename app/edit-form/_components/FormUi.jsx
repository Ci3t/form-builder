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

function FormUi({
  jsonform,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedBorder,
  editable = true,
}) {
  return (
    <div
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
              <Select>
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
              <RadioGroup>
                {field.options?.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem
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
      <button className="btn btn-primary">Submit</button>
    </div>
  );
}

export default FormUi;
