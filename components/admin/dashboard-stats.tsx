"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  MessageSquare,
  Calendar,
  Users,
  MapPin,
  Camera,
  Clock,
  CheckCircle,
  Archive,
  Star,
  TrendingUp,
  Activity,
  Heart,
} from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalPrayerRequests: number;
    pendingPrayerRequests: number;
    totalEvents: number;
    upcomingEvents: number;
    totalPastors: number;
    activePastors: number;
    totalLocations: number;
    activeLocations: number;
    totalGalleryImages: number;
    featuredImages: number;
    activeEvents: number;
    archivedPrayerRequests: number;
  };
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const statCards = [
    {
      title: "Prayer Requests",
      value: stats.totalPrayerRequests,
      subtitle: `${stats.pendingPrayerRequests} pending`,
      icon: MessageSquare,
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
      trend:
        stats.pendingPrayerRequests > 0 ? "Needs attention" : "All caught up",
    },
    {
      title: "Events",
      value: stats.totalEvents,
      subtitle: `${stats.upcomingEvents} upcoming`,
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      trend: stats.upcomingEvents > 0 ? "Active events" : "No upcoming events",
    },
    {
      title: "Pastors",
      value: stats.totalPastors,
      subtitle: `${stats.activePastors} active`,
      icon: Users,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      trend: "Team management",
    },
    {
      title: "Locations",
      value: stats.totalLocations,
      subtitle: `${stats.activeLocations} active`,
      icon: MapPin,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      trend: "Church locations",
    },
    {
      title: "Gallery",
      value: stats.totalGalleryImages,
      subtitle: `${stats.featuredImages} featured`,
      icon: Camera,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      trend: "Visual content",
    },
    {
      title: "Active Events",
      value: stats.activeEvents,
      subtitle: `${stats.archivedPrayerRequests} archived requests`,
      icon: Activity,
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
      trend: "Current activities",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => (
        <Card
          key={index}
          className="group hover:shadow-lg transition-all duration-300 border-2 border-gray-100"
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}
                  >
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </h3>
                    <p className="text-xs text-gray-500">{stat.trend}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <p className={`text-sm font-medium ${stat.textColor} mt-1`}>
                    {stat.subtitle}
                  </p>
                </div>
              </div>
              <div
                className={`w-16 h-16 rounded-full ${stat.bgColor} flex items-center justify-center opacity-20 group-hover:opacity-30 transition-opacity`}
              >
                <stat.icon className={`w-8 h-8 ${stat.textColor}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
