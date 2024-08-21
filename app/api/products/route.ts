import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("auctions")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json({ products: data }, { status: 200 });
}

export async function POST(request: Request) {
  const supabase = createClient();

  const formData = await request.formData();

  const { data, error } = await supabase.from("auctions").insert({
    user_id: formData.get("user_id") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    starting_bid: formData.get("starting_bid") as string,
    end_date: formData.get("end_date") as string,
    current_bid: formData.get("current_bid") as string,
  });

  return NextResponse.json({ data, error }, { status: 200 });
}
