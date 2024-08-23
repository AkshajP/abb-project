"use client";
import React, { useState } from "react";
import { Pencil, PlusCircle } from "lucide-react";
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

export default function EditProduct(item: any) {
  console.log(item);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [startingBid, setStartingBid] = useState(item.starting_bid);
  const [endDate, setEndDate] = useState(item.end_date);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-slate-600 hover:bg-slate-700">
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="mb-2">Edit Listing</DialogTitle>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Item Name</Label>
              <Label>{item.title}</Label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              {item.description}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Item Starting Price</Label>
              <input
                type="number"
                id="price"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="input"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Bid end date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Calendar
                    mode="single"
                    className="w-full"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    disabled={(date) => date <= item.end_date}
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
