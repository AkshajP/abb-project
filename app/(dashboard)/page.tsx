import Image from "next/image";
import Link from "next/link";
import { Box } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewProduct from "@/components/dashboard/new-product";
import { getAllProducts } from "@/actions/supabase";
import { Button } from "@/components/ui/button";

export default async function Dashboard() {
  const { data, error } = await getAllProducts();

  if (error) {
    console.log("Error:", error.message);
    return;
  }
  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 ">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader className="flex items-center flex-row justify-between">
            <div>
              <CardTitle>All Listed Auctions</CardTitle>
              <CardDescription>View all user&apos;s auctions</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Starting Price</TableHead>
                  <TableHead>Current Bid</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Listed by</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="hidden sm:table-cell">
                      <Box />
                    </TableCell>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      ₹{item.starting_bid.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      {item.current_bid ? (
                        item.current_bid.toLocaleString("en-IN")
                      ) : (
                        <span className="text-muted-foreground">
                          No bids yet
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(item.end_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </TableCell>

                    <TableCell>{item.user_name}</TableCell>

                    <TableCell>
                      <Link href={`/bid/${item.id}`}>
                        <Button>Bid</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          {/* <CardFooter></CardFooter> */}
        </Card>
      </main>
    </div>
  );
}
