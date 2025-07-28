import { createClient } from "@/lib/supabase/server";
import { PastorsTable } from "@/components/admin/pastors-table";
import { redirect } from "next/navigation";

export default async function PastorsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch pastors data
  const { data: pastors, error } = await supabase
    .from("pastors")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching pastors:", error);
  }

  return (
    <div className="p-6 space-y-6 w-full max-w-none">
      <PastorsTable pastors={pastors || []} />
    </div>
  );
}
