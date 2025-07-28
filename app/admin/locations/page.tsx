import { createClient } from "@/lib/supabase/server";
import { LocationsTable } from "@/components/admin/locations-table";
import { redirect } from "next/navigation";

export default async function LocationsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch locations data with services and contacts
  const { data: locations, error } = await supabase
    .from("locations")
    .select(
      `
      *,
      location_services (
        id,
        day,
        time,
        type,
        service_location,
        description,
        is_active,
        sort_order
      ),
      location_contacts (
        id,
        name,
        phone,
        email,
        role,
        is_primary,
        is_active,
        sort_order
      )
    `
    )
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching locations:", error);
  }

  return (
    <div className="p-6 space-y-6 w-full max-w-none">
      <LocationsTable locations={locations || []} />
    </div>
  );
}
