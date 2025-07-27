import { createClient } from "@/lib/supabase/server";
import { EventsTable } from "@/components/admin/events-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default async function EventsPage() {
  const supabase = await createClient();

  // Fetch all events (including inactive ones for admin)
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching events:", error);
  }

  return (
    <div className="p-6 space-y-6 w-full max-w-none">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Events Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage church events, services, and activities
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-6 h-6 text-red-600" />
          <span className="text-sm font-medium text-gray-700">
            Event Management
          </span>
        </div>
      </div>

      {/* Events Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-red-600" />
            <span>All Events</span>
          </CardTitle>
          <CardDescription>
            View, create, edit, and manage all church events and activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventsTable events={events || []} />
        </CardContent>
      </Card>
    </div>
  );
}
