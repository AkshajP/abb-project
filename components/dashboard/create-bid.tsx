"use client";
import { createBid } from "@/actions/supabase";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function CreateBid(props: {
  item: {
    id: string;
    title: string;
    description: string;
    current_bid: number;
    starting_bid: number;
  };
  bids: any[] | null;
}) {
  const [loading, setLoading] = React.useState(false);
  const [bidAmount, setBidAmount] = React.useState<number | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await createBid({
      id: props.item.id,
      bidAmount: Number(bidAmount),
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Bid placed successfully");
    setLoading(false);
    router.refresh();
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Place Your Bid</CardTitle>
        <CardDescription>Enter your bid amount below</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="bidAmount">Bid Amount</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                ₹
              </div>
              <Input
                id="bidAmount"
                value={bidAmount === null ? "" : bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
                type="number"
                placeholder="Enter your bid"
                min={Math.max(props.item.current_bid, props.item.starting_bid)}
                className="pl-8"
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={
              bidAmount === null ||
              bidAmount <
                Math.max(props.item.current_bid, props.item.starting_bid)
            }
            className="w-full"
          >
            {loading ? (
              <div className="flex flex-row items-center gap-2">
                {" "}
                <Loader className="animate-spin size-4" /> Placing...
              </div>
            ) : (
              "Place bid"
            )}
          </Button>
          <p className="text-sm text-yellow-700">
            Minimum bid: ₹
            {Math.max(
              props.item.current_bid,
              props.item.starting_bid
            ).toLocaleString("en-IN")}
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
