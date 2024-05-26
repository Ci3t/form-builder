"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs";
import { AiChatSession } from "@/configs/AiModal";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();

  const PROMPT =
    ", On the basis of the description please give form in json format with form title,form subheading with form having form field,form name,placeholder name,and form label,fieldType,field required in Json format";
  const onCreateForm = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      "Description:" + userInput + PROMPT
    );

    if (result.response.text()) {
      const response = await db
        .insert(JsonForms)
        .values({
          jsonform: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD/MM/YYYY"),
        })
        .returning({ id: JsonForms.id });
      console.log(`New form ID ${response[0].id}`);
      if (response[0].id) {
        route.push("/edit-form/" + response[0].id);
      }
      setLoading(false);
    }

    setLoading(false);
    console.log(result.response.text());
  };
  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>Create Form</Button>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="Write description of your form"
                onChange={(e) => setUserInput(e.target.value)}
              />
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button variant="destructive" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button disabled={loading} onClick={onCreateForm}>
              {loading ? <Loader2 className="animate-spin" /> : "Create"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
