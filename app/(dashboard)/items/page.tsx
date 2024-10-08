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
  Pencil,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Trash,
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
import EditProduct from "@/components/dashboard/edit-product";
import DeleteProduct from "@/components/dashboard/delete-product";

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
            <div className="flex flex-col gap-1">
              <CardTitle>Your listed auction items</CardTitle>
              <CardDescription>
                Manage your items and view their bids.
              </CardDescription>
            </div>

            <NewProduct />
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Starting Bid</TableHead>
                  <TableHead>Highest Bid</TableHead>
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
                    <TableCell>
                      ₹{item.starting_bid.toLocaleString("en-IN")}
                    </TableCell>
                    <TableCell>
                      {item.current_bid ? (
                        "₹" + item.current_bid.toLocaleString("en-IN")
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
                    <TableCell className="flex flex-row gap-2">
                      <EditProduct item={item} />
                      <DeleteProduct item={item} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
