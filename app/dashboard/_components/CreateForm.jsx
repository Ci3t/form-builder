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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs";
import { AiChatSession } from "@/configs/AiModal";
import {
  checkFormCreationLimit,
  incrementFormCount,
} from "@/configs/freeTierTries";
import { PROMPT, PROMPT2 } from "@/configs/prompts";
import { JsonForms, userSubscription } from "@/configs/schema";

import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { Loader2 } from "lucide-react";
import moment from "moment/moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateForm = ({ isPro, className }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [formList, setFormList] = useState([]);
  const [inputTypes, setInputTypes] = useState({
    text: null,
    checkbox: null,
    radio: null,
    select: null,
  });
  const [percentForm, setPercentForm] = useState(0);
  const [canCreate, setCanCreate] = useState(true);
  const { user } = useUser();
  const route = useRouter();

  const onCreateForm = async () => {
    const inputTypesString = Object.entries(inputTypes)
      .map(([key, value]) => `${key}:${value}`)
      .join(", ");

    const fullPrompt = `
      Description: ${userInput}
      ${PROMPT}
      InputTypes: ${inputTypesString}
      ${PROMPT2}
    `;
    setLoading(true);
    console.log("Constructed Prompt:", fullPrompt);
    try {
      const result = await AiChatSession.sendMessage(fullPrompt);

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
          await incrementFormCount(user.id);
          route.push("/edit-form/" + response[0].id);
        }
        console.log(result.response.text());
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user && GetFormList();
  }, [user, formList]);

  const GetFormList = async () => {
    const res = await db
      .select()
      .from(JsonForms)
      .where(eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(JsonForms.id));
    setFormList(res);
    const percent = (res.length / 3) * 100;
    setPercentForm(percent);
  };
  useEffect(() => {
    const checkLimit = async () => {
      const canCreateForm = await checkFormCreationLimit(user?.id);
      setCanCreate(canCreateForm);
    };

    checkLimit();
  }, [user?.id]);

  const handleInputType = (e) => {
    const { name, value } = e.target;
    console.log(`value`, value);
    setInputTypes({
      ...inputTypes,
      [name]: Number(value),
    });
  };
  console.log(inputTypes);

  return (
    <div>
      <>
        <Button
          className={className}
          disabled={!canCreate && !isPro}
          onClick={() => setOpenDialog(true)}
        >
          {!canCreate && !isPro ? "Upgrade" : "Create Form"}
        </Button>
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

            <DialogHeader>
              <DialogTitle>Select Input Types</DialogTitle>
              <DialogDescription>
                Select how many{" "}
                {`{inputs / checkbox /select dropdown / radio
                buttons}`}{" "}
                you want in the form
              </DialogDescription>
            </DialogHeader>
            {/* // ! Options for Selects */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="text" className="text-right">
                Input Field
              </Label>
              <Input
                onChange={(e) => handleInputType(e)}
                name="text"
                placeholder="Enter the Number of fields you want"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="checkbox" className="text-right">
                Checkbox
              </Label>
              <Input
                onChange={(e) => handleInputType(e)}
                name="checkbox"
                placeholder="Enter the Number of fields you want"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="radio" className="text-right">
                Radio Buttons
              </Label>
              <Input
                onChange={(e) => handleInputType(e)}
                name="radio"
                placeholder="Enter the Number of fields you want"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="select" className="text-right">
                Select
              </Label>
              <Input
                onChange={(e) => handleInputType(e)}
                name="select"
                placeholder="Enter the Number of fields you want"
                className="col-span-3"
              />
            </div>

            {/* //! end of select options */}
            <div className="flex gap-2 justify-end">
              <Button
                variant="destructive"
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button disabled={loading} onClick={onCreateForm}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    </div>
  );
};

export default CreateForm;
