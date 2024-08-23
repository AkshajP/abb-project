import { getBids, getProduct } from "@/actions/supabase";
import CreateBid from "@/components/dashboard/create-bid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Bid(props: { params: { itemId: string } }) {
  const { data: item, error } = await getProduct({
    id: props.params.itemId,
  });

  const { data: bids, error: bidsError } = await getBids({
    id: props.params.itemId,
  });

  return (
    <div className="flex flex-col w-full items-center  sm:gap-4 sm:py-4 px-4 ">
      <div className="max-w-6xl flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{item.description}</p>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <p>
                  Auction ends:{" "}
                  {new Date(item.end_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex justify-between items-end pt-4">
                <div>
                  <p className="font-semibold">Starting Bid</p>
                  <p className="text-xl font-bold">₹{item.starting_bid}</p>
                </div>
                <div>
                  <p className="font-semibold">Current Bid</p>
                  {item.current_bid ? (
                    <p className="text-xl font-bold text-green-600">
                      ₹{item.current_bid}
                    </p>
                  ) : (
                    <p className="text-xl font-bold text-red-600">
                      No bids yet
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <CreateBid item={item} bids={bids} />
        </div>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Bid History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bidder</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Place at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bids?.map((bid) => (
                  <TableRow key={bid.id}>
                    <TableCell>{bid.user_name}</TableCell>
                    <TableCell>${bid.bid_amount}</TableCell>
                    <TableCell>
                      {new Date(
                        new Date(bid.created_at).getTime() +
                          5.5 * 60 * 60 * 1000
                      ).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true, // Optional: Adjusts the time format to 12-hour clock if needed
                      })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
