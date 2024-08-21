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
              <CardTitle>All Products</CardTitle>
              <CardDescription>View all user&apos;s bids</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  {/* <TableHead className="hidden w-[100px] sm:table-cell">
                    <span className="sr-only">Image</span>
                  </TableHead> */}
                  <TableHead>Item</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Starting Bid</TableHead>
                  <TableHead>Current Bid</TableHead>
                  <TableHead>End Date</TableHead>
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
                    <TableCell>{item.starting_bid}</TableCell>
                    <TableCell>
                      {item.current_bid ? item.current_bid : item.starting_bid}
                    </TableCell>
                    <TableCell>{item.end_date}</TableCell>

                    <TableCell>
                      <Button>Bid</Button>
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
