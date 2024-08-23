"use client";
import { Loader, Pencil, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";
import { addNewProduct, updateProduct } from "@/actions/supabase";
import { title } from "process";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditProduct(props: {
  item: {
    id: string;
    title: string;
    description: string;
    starting_bid: string;
    end_date: string;
  };
}) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(props.item.end_date)
  );
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState(props.item.title);
  const [description, setDescription] = React.useState(props.item.description);
  const [price, setPrice] = React.useState(props.item.starting_bid);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    if (!date || !title || !description || !price) {
      toast.error("Please fill all the fields");
      setLoading(false);
      return;
    }

    const { data, error } = await updateProduct({
      id: props.item.id,
      description,
      date,
    });

    if (error) {
      toast.error(`Error updating item: ${error.message}`);
      return;
    }
    setOpen(false);
    setLoading(false);
    toast.success("Item updated successfully");
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant={"outline"}>
          <Pencil className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="mb-2">Edit product</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                type="text"
                disabled
                name="name"
                placeholder="Enter Item Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Item Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter Item Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Item Starting Price</Label>
              <div className="flex flex-row gap-2 items-center border rounded-md">
                <div className="px-4 border-r">₹</div>
                <Input
                  id="price"
                  disabled
                  type="text"
                  className="border-none focus:border-none focus:ring-0 focus:outline-none active:ring-0 active:outline-none"
                  name="price"
                  placeholder="Enter Item Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Bid end date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Calendar
                    mode="single"
                    className="w-full"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date <= new Date(props.item.end_date)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <DialogFooter className="pt-6 flex flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="w-full"
              type="button"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              variant="default"
              className="w-full"
              type="submit"
            >
              {loading ? (
                <div className="flex flex-row items-center gap-2">
                  <Loader className="animate-spin size-4" /> Updating...
                </div>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
