import { getUser } from "@/actions/supabase";
import Sidebar from "@/components/dashboard/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Sidebar user={user} />
      <div className="ml-14">{children}</div>
    </div>
  );
}
