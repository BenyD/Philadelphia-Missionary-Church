import { createClient } from "@/lib/supabase/server";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Shield,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Activity,
  MessageSquare,
  Calendar,
  MapPin,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch prayer requests with status counts
  const { data: prayerRequests } = await supabase
    .from("prayer_requests")
    .select("*")
    .order("created_at", { ascending: false });

  // Calculate stats
  const totalRequests = prayerRequests?.length || 0;
  const pendingRequests =
    prayerRequests?.filter((req) => req.status === "pending").length || 0;
  const inProgressRequests =
    prayerRequests?.filter((req) => req.status === "in_progress").length || 0;
  const completedRequests =
    prayerRequests?.filter((req) => req.status === "completed").length || 0;

  // Calculate recent activity (last 7 days)
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const recentRequests =
    prayerRequests?.filter((req) => new Date(req.created_at) > lastWeek)
      .length || 0;

  // Fetch events for dashboard
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  const totalEvents = events?.length || 0;

  // Fetch pastors for dashboard
  const { data: pastors } = await supabase
    .from("pastors")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const totalPastors = pastors?.length || 0;

  // Fetch locations for dashboard
  const { data: locations } = await supabase
    .from("locations")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const totalLocations = locations?.length || 0;

  return (
    <div className="p-6 space-y-6 w-full max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Overview of church administration and prayer request management
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Shield className="w-6 h-6 text-red-600" />
          <span className="text-sm font-medium text-gray-700">Admin Panel</span>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats
        totalRequests={totalRequests}
        pendingRequests={pendingRequests}
        inProgressRequests={inProgressRequests}
        completedRequests={completedRequests}
      />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-red-600" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Prayer requests from the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {recentRequests}
            </div>
            <p className="text-sm text-gray-500 mt-1">New requests this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              <span>Response Rate</span>
            </CardTitle>
            <CardDescription>
              Percentage of prayer requests being handled
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {totalRequests > 0
                ? Math.round(
                    ((totalRequests - pendingRequests) / totalRequests) * 100
                  )
                : 0}
              %
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Requests being processed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Prayer Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            <span>Recent Prayer Requests</span>
          </CardTitle>
          <CardDescription>
            Latest prayer requests from the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          {prayerRequests && prayerRequests.length > 0 ? (
            <div className="space-y-4">
              {prayerRequests.slice(0, 5).map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">
                        {request.full_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(request.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {request.prayer_request}
                    </p>
                  </div>
                  <div className="ml-4">
                    <a
                      href="/admin/prayer-requests"
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      View →
                    </a>
                  </div>
                </div>
              ))}
              {prayerRequests.length > 5 && (
                <div className="text-center pt-2">
                  <a
                    href="/admin/prayer-requests"
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    View all {prayerRequests.length} requests →
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No prayer requests yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/prayer-requests"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer block"
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-red-600" />
                <span className="font-medium">View Prayer Requests</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {pendingRequests} pending
              </p>
            </a>
            <a
              href="/admin/events"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer block"
            >
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-red-600" />
                <span className="font-medium">Manage Events</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {totalEvents} total events
              </p>
            </a>
            <a
              href="/admin/pastors"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer block"
            >
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-red-600" />
                <span className="font-medium">Manage Pastors</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {totalPastors} active pastors
              </p>
            </a>
            <a
              href="/admin/locations"
              className="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer block"
            >
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-600" />
                <span className="font-medium">Manage Locations</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {totalLocations} active locations
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
