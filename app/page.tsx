import { getUser } from "@/actions/supabase/auth";
import Image from "next/image";

export default async function Home() {
  const user = await getUser();
  return <main>{JSON.stringify(user.user_metadata.first_name, null, 2)}</main>;
}
