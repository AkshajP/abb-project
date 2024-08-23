"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/signin?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    options: {
      data: {
        first_name: formData.get("name") as string,
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect(`/signup?error=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getUser() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/signin");
  }

  return user;
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/signin");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function addNewProduct(props: {
  name: string;
  description: string;
  price: string;
  date: any;
}) {
  const supabase = createClient();
  const user = await getUser();

  const { data, error } = await supabase.from("auctions").insert({
    user_id: user.id,
    title: props.name,
    description: props.description,
    starting_bid: props.price,
    end_date: props.date,
    user_name: user.user_metadata.first_name,
  });

  console.log(error);

  return {
    data,
    error,
  };
}

export async function updateProduct(props: {
  id: string;
  description: string;
  date: any;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("auctions")
    .update({
      description: props.description,
      end_date: props.date,
    })
    .eq("id", props.id);

  console.log(error);

  return {
    data,
    error,
  };
}

export async function deleteProduct(props: { id: string }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("auctions")
    .delete()
    .eq("id", props.id);

  console.log(error);

  return {
    data,
    error,
  };
}

export async function getProduct(props: { id: string }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("auctions")
    .select("*")
    .eq("id", props.id)
    .single();

  console.log(error);

  return {
    data,
    error,
  };
}

export async function getAllProducts() {
  const supabase = createClient();
  const user = await getUser();

  // filter out the auctions that are not owned by the user

  const { data, error } = await supabase
    .from("auctions")
    .select("*")
    .order("created_at", { ascending: false })
    .neq("user_id", user.id);

  console.log(error);

  revalidatePath("/items");

  return {
    data,
    error,
  };
}

export async function getUserPorducts() {
  const supabase = createClient();
  const user = await getUser();

  const { data, error } = await supabase
    .from("auctions")
    .select("*")
    .eq("user_id", user.id);

  console.log(error);

  revalidatePath("/items");

  return {
    data,
    error,
  };
}

export async function createBid(props: { id: string; bidAmount: number }) {
  const supabase = createClient();
  const user = await getUser();

  const { data, error } = await supabase.from("bids").insert({
    auction_id: props.id,
    user_id: user.id,
    bid_amount: props.bidAmount,
    user_name: user.user_metadata.first_name,
  });

  const { data: update_data, error: update_error } = await supabase
    .from("auctions")
    .update({
      current_bid: props.bidAmount,
    })
    .eq("id", props.id);

  return {
    data,
    error,
  };
}

export async function getBids(props: { id: string }) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("bids")
    .select("*")
    .eq("auction_id", props.id);

  console.log(error);

  return {
    data,
    error,
  };
}
