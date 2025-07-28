import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DashboardOverview } from "@/components/admin/dashboard-overview";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { DashboardRecentActivity } from "@/components/admin/dashboard-recent-activity";
import { DashboardContentManagement } from "@/components/admin/dashboard-content-management";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Check authentication
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect("/login");
  }

  // Fetch all data for dashboard
  const [
    { data: prayerRequests },
    { data: events },
    { data: pastors },
    { data: locations },
    { data: galleryImages },
    { data: recentPrayerRequests },
    { data: upcomingEvents },
    { data: activePastors },
    { data: activeLocations },
    { data: featuredGalleryImages },
  ] = await Promise.all([
    supabase.from("prayer_requests").select("*"),
    supabase.from("events").select("*"),
    supabase.from("pastors").select("*"),
    supabase.from("locations").select("*"),
    supabase.from("gallery_images").select("*"),
    supabase
      .from("prayer_requests")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("events")
      .select("*")
      .gte("date", new Date().toISOString().split("T")[0])
      .order("date", { ascending: true })
      .limit(3),
    supabase.from("pastors").select("*").eq("is_active", true),
    supabase.from("locations").select("*").eq("is_active", true),
    supabase
      .from("gallery_images")
      .select("*")
      .eq("is_featured", true)
      .eq("is_active", true)
      .limit(6),
  ]);

  // Calculate statistics
  const stats = {
    totalPrayerRequests: prayerRequests?.length || 0,
    pendingPrayerRequests:
      prayerRequests?.filter((req) => req.status === "pending").length || 0,
    totalEvents: events?.length || 0,
    upcomingEvents: upcomingEvents?.length || 0,
    totalPastors: pastors?.length || 0,
    activePastors: activePastors?.length || 0,
    totalLocations: locations?.length || 0,
    activeLocations: activeLocations?.length || 0,
    totalGalleryImages: galleryImages?.length || 0,
    featuredImages: featuredGalleryImages?.length || 0,
    activeEvents: events?.filter((event) => event.is_active).length || 0,
    archivedPrayerRequests:
      prayerRequests?.filter((req) => req.is_archived).length || 0,
  };

  return (
    <div className="p-6 space-y-8 w-full max-w-none">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.email}
            </h1>
            <p className="text-blue-100">
              Manage your church's digital presence and community engagement
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-blue-100">
              Last login: {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <DashboardStats stats={stats} />

      {/* Content Management Grid */}
      <DashboardContentManagement
        prayerRequests={prayerRequests || []}
        events={events || []}
        pastors={pastors || []}
        locations={locations || []}
        galleryImages={galleryImages || []}
      />

      {/* Recent Activity & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardRecentActivity
          recentPrayerRequests={recentPrayerRequests || []}
          upcomingEvents={upcomingEvents || []}
        />
        <DashboardOverview
          stats={stats}
          featuredImages={featuredGalleryImages || []}
        />
      </div>
    </div>
  );
}
