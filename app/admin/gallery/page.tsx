import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { GalleryTable } from "@/components/admin/gallery-table";

export default async function GalleryPage() {
  const supabase = await createClient();

  // Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login");
  }

  // Fetch gallery images
  const { data: images, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching gallery images:", error);
  }

  return (
    <div className="p-6 space-y-6 w-full max-w-none">
      <GalleryTable images={images || []} />
    </div>
  );
} 