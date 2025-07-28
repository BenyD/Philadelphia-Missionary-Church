"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Activity,
} from "lucide-react";

interface DashboardRecentActivityProps {
  recentPrayerRequests: any[];
  upcomingEvents: any[];
}

export function DashboardRecentActivity({
  recentPrayerRequests,
  upcomingEvents,
}: DashboardRecentActivityProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "in_progress":
        return <Activity className="w-4 h-4 text-blue-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatEventDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Combine and sort activities by date
  const activities = [
    ...recentPrayerRequests.map((request) => ({
      type: "prayer",
      data: request,
      date: new Date(request.created_at),
    })),
    ...upcomingEvents.map((event) => ({
      type: "event",
      data: event,
      date: new Date(event.date),
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <Card className="border-2 border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <span>Recent Activity</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Prayer Requests Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-red-500" />
                <span>Recent Prayer Requests</span>
              </h3>
              <a
                href="/admin/prayer-requests"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All →
              </a>
            </div>
            <div className="space-y-3">
              {recentPrayerRequests.slice(0, 3).map((request) => (
                <div
                  key={request.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    {getStatusIcon(request.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {request.full_name}
                      </span>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {request.prayer_request}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatDate(request.created_at)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-blue-500" />
                <span>Upcoming Events</span>
              </h3>
              <a
                href="/admin/events"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All →
              </a>
            </div>
            <div className="space-y-3">
              {upcomingEvents.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {event.title}
                      </span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Upcoming
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {event.location}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatEventDate(event.date)}</span>
                      {event.time && (
                        <>
                          <span>•</span>
                          <span>{event.time}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Activity Timeline
            </h3>
            <div className="space-y-4">
              {activities.slice(0, 5).map((activity, index) => (
                <div
                  key={`${activity.type}-${activity.data.id}`}
                  className="flex items-start space-x-3"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    {activity.type === "prayer" ? (
                      <MessageSquare className="w-4 h-4 text-red-500" />
                    ) : (
                      <Calendar className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {activity.type === "prayer"
                          ? `Prayer request from ${activity.data.full_name}`
                          : activity.data.title}
                      </span>
                      {activity.type === "prayer" &&
                        getStatusBadge(activity.data.status)}
                    </div>
                    <p className="text-sm text-gray-600">
                      {activity.type === "prayer"
                        ? activity.data.prayer_request.substring(0, 100) + "..."
                        : activity.data.location}
                    </p>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(
                        activity.data.created_at || activity.data.date
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
