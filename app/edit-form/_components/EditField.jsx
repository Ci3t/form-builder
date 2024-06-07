import { Edit, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function EditField({ defaultValue, onUpdate, deleteField }) {
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);
  const [options, setOptions] = useState(
    Array.isArray(defaultValue?.options) ? defaultValue.options : []
  );

  const addTags = () => {
    // setTags(["Empty"]);

    if (options.length === 0 || options[options.length - 1] !== "") {
      setOptions((prevOptions) => [...prevOptions, "Empty"]);
    }
  };
  const handleOptionChange = (e, index) => {
    const newOptions = [...options];
    const value = e.target.value.trim();

    if (value !== "") {
      newOptions[index] = value;
      setOptions(newOptions);
    }
  };

  const handleOptionDelete = (id) => {
    const deleted = options?.filter((option, i) => id != i);
    setOptions(deleted);
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          <Edit className="h-6 w-6 text-gray-500 cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent>
          <h2>Edit Fields</h2>
          <div>
            <label className="text-xs" htmlFor="">
              Label Name
            </label>
            <Input
              type="text"
              defaultValue={defaultValue.label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          {defaultValue?.fieldType === "text" && (
            <div>
              <label className="text-xs" htmlFor="">
                Placeholder
              </label>
              <Input
                type="text"
                defaultValue={defaultValue.placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </div>
          )}
          {defaultValue?.fieldType !== "text" && (
            <div>
              <label className="text-xs" htmlFor="">
                Select Option
              </label>
              {options?.map((option, i) => (
                <div className="mt-2 flex gap-2" key={i}>
                  <Input
                    type="text"
                    defaultValue={option}
                    onChange={(e) => handleOptionChange(e, i)}
                  />
                  <Button onClick={() => handleOptionDelete(i)} size="sm">
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center">
            <Button
              size="sm"
              className="mt-3"
              onClick={() =>
                onUpdate({
                  label,
                  placeholder,
                  options,
                })
              }
            >
              Update
            </Button>

            {defaultValue?.fieldType !== "text" && (
              <Button onClick={addTags} className={"mt-3"} size="sm">
                Add
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger>
          <Trash className="h-6 w-6 text-red-500 cursor-pointer" />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              field and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteField()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default EditField;
