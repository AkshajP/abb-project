"use client";
import { Dialog } from "@radix-ui/react-dialog";
import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Loader, Trash2 } from "lucide-react";
import { deleteProduct } from "@/actions/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteProduct(props: {
  item: {
    id: string;
    title: string;
    description: string;
    starting_bid: string;
    end_date: string;
  };
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const { data, error } = await deleteProduct({
      id: props.item.id,
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      setOpen(false);
      return;
    }
    setOpen(false);
    setLoading(false);
    toast.success("Product deleted successfully");
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"} size={"icon"}>
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>Are you sure you want to delete this item?</DialogHeader>
        <DialogDescription>
          This action cannot be undone. Please confirm that you want to delete
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={handleSubmit}
            variant="destructive"
            type="submit"
          >
            {loading ? (
              <div className="flex flex-row items-center gap-2">
                {" "}
                <Loader className="animate-spin size-4" /> Deleting...
              </div>
            ) : (
              "Yes, delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
