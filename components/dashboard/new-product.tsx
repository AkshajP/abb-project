"use client";
import { PlusCircle } from "lucide-react";
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
import { addNewProduct } from "@/actions/supabase";
import { title } from "process";
import { useRouter } from "next/navigation";

export default function NewProduct() {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create an object to store the form data

    if (!date || !title || !description || !price) return;

    const formData = {
      name,
      description,
      price,
      // conver to  timestamp
      // Error: date/time field value out of range: "1725042600000"
      // date: date ? date.getTime() : undefined,
      date: date,
    };

    // Here, you can handle the form data (e.g., send it to an API or process it)
    console.log("Form Data Submitted:", formData);

    const { data, error } = await addNewProduct({
      name,
      description,
      price,
      // conver to  timestamp
      date: date,
    });

    if (error) {
      console.log("Error:", error.message);
      return;
    }

    router.refresh();

    // Close the dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            List new product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="mb-2">List new product</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                type="text"
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
                    disabled={(date) => date <= new Date()}
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
            >
              Cancel
            </Button>
            <Button variant="default" className="w-full" type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
