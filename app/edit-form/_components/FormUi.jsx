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
import { useRef, useState } from "react";
import { db } from "@/configs";
import { JsonForms, userResponses } from "@/configs/schema";
import moment from "moment";
import { toast } from "sonner";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { AiChatSession } from "@/configs/AiModal";

function FormUi({
  jsonform,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedBorder,
  editable = true,
  formId = 0,
  enableSignIn = false,
}) {
  const [formData, setFormData] = useState();
  const { user, isSignedIn } = useUser();
  // const [userInput, setUserInput] = useState("");
  let formRef = useRef();

  // const PROMPT =
  // ", On the basis of the description and the provided json  please give form in json format with form title,form subheading with form having form field,form name,placeholder name,and form label,fieldType,field required in Json format also keep the json format in this order the formFields as array,formSubheading as string,formTitle as string inside the formfields objects key names are fieldName,fieldType,label,placeholder,required,options and keep options as an array with the value dont add a label inside";
  // const onEditingForm = async () => {

  //   setLoading(true);
  //   const result = await AiChatSession.sendMessage(
  //     "Description:" + userInput + PROMPT
  //   );

  //   if (result.response.text()) {
  //     const response = await db
  //       .insert(JsonForms)
  //       .values({
  //         jsonform: result.response.text(),
  //         createdBy: user?.primaryEmailAddress?.emailAddress,
  //         createdAt: moment().format("DD/MM/YYYY"),
  //       })
  //       .returning({ id: JsonForms.id });
  //     console.log(`New form ID ${response[0].id}`);
  //     if (response[0].id) {
  //       await incrementFormCount(user.id);
  //       route.push("/edit-form/" + response[0].id);
  //     }
  //     setLoading(false);
  //   }

  //   setLoading(false);
  //   console.log(result.response.text());
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const path = usePathname();
  console.log(path);
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleCheckBoxChange = (fieldName, option, value) => {
    const options = formData?.[fieldName] ? formData?.[fieldName] : [];

    if (value) {
      options.push({
        label: option,
        value,
      });
      setFormData({
        ...formData,
        [fieldName]: options,
      });
    } else {
      const res = options.filter((o) => o.label == option);
      setFormData({
        ...formData,
        [fieldName]: res,
      });
    }
  };
  const onFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const res = await db.insert(userResponses).values({
      jsonResponse: formData,
      createdAt: moment().format("DD/MM/YYYY"),
      formId,
    });

    if (res) {
      toast("Form Submitted Successfully");
      formRef.reset();
    } else {
      toast("Error while saving your form");
    }
  };
  return (
    <form
      ref={(e) => (formRef = e)}
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
                    <Checkbox
                      onCheckedChange={(v) =>
                        handleCheckBoxChange(field?.label, option, v)
                      }
                      className="border-inherit bg-inherit data-[state=checked]:text-inherit data-[state=checked]:bg-inherit"
                    />
                    <h2>{option}</h2>
                  </div>
                ))
              ) : (
                <div className="flex gap-2 items-center">
                  <Checkbox required={field?.required} />
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
      {!enableSignIn ? (
        <button
          type={path.includes("/edit-form") ? "button" : "submit"}
          className="btn btn-primary"
        >
          Submit
        </button>
      ) : isSignedIn ? (
        <button className="btn btn-primary">Submit</button>
      ) : (
        <Button>
          <SignInButton mode="modal">Sign In before Submit</SignInButton>
        </Button>
      )}
    </form>
  );
}

export default FormUi;
