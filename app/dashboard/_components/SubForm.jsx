import { Button } from "@/components/ui/button";
import { FilePenLine, Share2, Trash } from "lucide-react";
import Link from "next/link";

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
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { and, eq } from "drizzle-orm";
import { toast as sonner } from "sonner";
import { useToast } from "@/components/ui/use-toast";

function SubForm({ form, formRecord, refreshData }) {
  const { user } = useUser();
  const { toast } = useToast();
  const onDeleteForm = async () => {
    const res = await db
      .delete(JsonForms)
      .where(
        and(
          eq(JsonForms.id, formRecord.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress)
        )
      );

    if (res) {
      sonner("Form Deleted!");
      refreshData();
    }
  };
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }
  return (
    <div className="shadow-sm shadow-indigo-400 rounded-lg p-4 bg-[#472B89] h-full w-full  bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-20 backdrop-saturate-50 backdrop-contrast-100 border-[1px] border-violet-300 border-opacity-30">
      <div className="flex justify-between">
        <h2></h2>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Trash className="h-5 w-5 text-purple-400 cursor-pointer hover:scale-105 transition-all " />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                form and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDeleteForm()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <h2 className="text-lg text-white">{form?.formTitle}</h2>
      <h2 className="text-sm text-violet-300">{form?.formSubheading}</h2>
      <hr className="my-4" />
      <div className="flex justify-between">
        <Button
          onClick={() => {
            const url = `${window.location.origin}/live-form/${formRecord?.id}`;
            copyToClipboard(url);
            toast({
              title: " Link Copied!",
              description: "Opening a new tab...",
            });
            setTimeout(() => {
              window.open(url, "_blank");
            }, 1000);
          }}
          variant="outline"
          size="sm"
          className="flex gap-2  hover:bg-[#472B89]  hover:text-[#FBFCF6] bg-[#FBFCF6] text-[#472B89]  hover:border hover:border-[#472B89]  border-transparent border-[1px]"
        >
          <Share2 className="h-5 w-5" />
          Share
        </Button>

        <Link href={"/edit-form/" + formRecord?.id}>
          <Button
            size="sm"
            className="flex gap-2  bg-[#472B89]  text-[#FBFCF6] hover:bg-[#FBFCF6] hover:text-[#472B89]  hover:border hover:border-[#472B89]  border-transparent border-[1px]"
          >
            <FilePenLine className="h-5 w-5" /> Edit
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SubForm;
