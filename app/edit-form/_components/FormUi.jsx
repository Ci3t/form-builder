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

function FormUi({ jsonform }) {
  return (
    <div className="my-3 border p-5 md:w-[600px] rounded-lg">
      <h2 className="font-bold text-center text-2xl text-primary">
        {jsonform?.formTitle}
      </h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonform?.formSubheading}
      </h2>

      {jsonform?.formFields?.map((field, i) => (
        <div key={i}>
          {field.fieldType == "select" ? (
            <div>
              <label className="text-sm text-gray-500 ">{field?.label}</label>
              <Select>
                <SelectTrigger className="w-full">
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
            <div>
              <label className="text-sm text-gray-500 ">{field?.label}</label>
              <RadioGroup>
                {field.options?.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ) : field.fieldType == "checkbox" ? (
            <div className="my-3">
              <label className="text-sm text-gray-500 ">{field.label}</label>

              {field?.options ? (
                field?.options?.map((option, i) => (
                  <div className="flex gap-2 items-center">
                    <Checkbox />
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
            <div className="my-3">
              <label className="text-sm text-gray-500 ">{field?.label}</label>
              <Input
                type={field?.fieldType}
                placeholder={field?.placeholder}
                name={field?.fieldName}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default FormUi;
