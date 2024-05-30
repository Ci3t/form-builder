import { Edit, Trash } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function EditField({ defaultValue, onUpdate }) {
  const [label, setLabel] = useState(defaultValue?.label);
  const [placeholder, setPlaceholder] = useState(defaultValue?.placeholder);
  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger>
          {" "}
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
          <Button
            size="sm"
            className="mt-3"
            onClick={() =>
              onUpdate({
                label,
                placeholder,
              })
            }
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>
      <Trash className="h-6 w-6 text-red-500 cursor-pointer" />
    </div>
  );
}

export default EditField;
