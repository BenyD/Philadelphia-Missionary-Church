import { createClient } from "@/lib/supabase/server";
import { PrayerRequestsTable } from "@/components/admin/prayer-requests-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default async function PrayerRequestsPage() {
  const supabase = await createClient();

  // Fetch prayer requests
  const { data: prayerRequests } = await supabase
    .from("prayer_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 space-y-6 w-full max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prayer Requests</h1>
          <p className="text-gray-600 mt-1">
            Manage and respond to prayer requests from the community
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-6 h-6 text-red-600" />
          <span className="text-sm font-medium text-gray-700">
            Prayer Management
          </span>
        </div>
      </div>

      {/* Prayer Requests Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            <span>All Prayer Requests</span>
          </CardTitle>
          <CardDescription>
            View, update, and manage prayer requests from your community members
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PrayerRequestsTable prayerRequests={prayerRequests || []} />
        </CardContent>
      </Card>
    </div>
  );
}
