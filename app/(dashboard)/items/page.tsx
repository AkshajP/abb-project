import Image from "next/image";
import Link from "next/link";
import {
  Box,
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import NewProduct from "@/components/dashboard/new-product";
import { getAllProducts, getUserPorducts } from "@/actions/supabase";

export default async function Dashboard() {
  const { data, error } = await getUserPorducts();

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
              <CardTitle>Your Products</CardTitle>
              <CardDescription>
                Manage your products and view their bids.
              </CardDescription>
            </div>

            <NewProduct />
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
