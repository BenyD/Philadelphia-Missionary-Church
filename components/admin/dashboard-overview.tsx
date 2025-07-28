"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Star,
  Camera,
  Users,
  Calendar,
  MessageSquare,
  Activity,
  Target,
} from "lucide-react";

interface DashboardOverviewProps {
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
  featuredImages: any[];
}

export function DashboardOverview({
  stats,
  featuredImages,
}: DashboardOverviewProps) {
  // Calculate some analytics
  const prayerResponseRate =
    stats.totalPrayerRequests > 0
      ? Math.round(
          ((stats.totalPrayerRequests - stats.pendingPrayerRequests) /
            stats.totalPrayerRequests) *
            100
        )
      : 0;

  const activeContentRate =
    ((stats.activePastors + stats.activeLocations + stats.activeEvents) /
      (stats.totalPastors + stats.totalLocations + stats.totalEvents)) *
    100;

  const analytics = [
    {
      title: "Prayer Response Rate",
      value: `${prayerResponseRate}%`,
      description: "Requests being processed",
      icon: MessageSquare,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend:
        prayerResponseRate > 80
          ? "up"
          : prayerResponseRate > 50
          ? "stable"
          : "down",
    },
    {
      title: "Active Content",
      value: `${Math.round(activeContentRate)}%`,
      description: "Content currently active",
      icon: Activity,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend:
        activeContentRate > 80
          ? "up"
          : activeContentRate > 50
          ? "stable"
          : "down",
    },
    {
      title: "Featured Content",
      value: stats.featuredImages,
      description: "Featured gallery images",
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      trend:
        stats.featuredImages > 5
          ? "up"
          : stats.featuredImages > 2
          ? "stable"
          : "down",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      description: "Events scheduled",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend:
        stats.upcomingEvents > 3
          ? "up"
          : stats.upcomingEvents > 1
          ? "stable"
          : "down",
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "down":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <Card className="border-2 border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <span>Analytics Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {analytics.map((metric, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center`}
                  >
                    <metric.icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  {getTrendIcon(metric.trend)}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {metric.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {metric.description}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Gallery Preview */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                <Camera className="w-5 h-5 text-orange-500" />
                <span>Featured Gallery</span>
              </h3>
              <a
                href="/admin/gallery"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All →
              </a>
            </div>
            {featuredImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {featuredImages.slice(0, 4).map((image) => (
                  <div key={image.id} className="group relative">
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                      <p className="text-white text-xs font-medium truncate">
                        {image.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No featured images yet</p>
                <a
                  href="/admin/gallery"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Add some →
                </a>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalPrayerRequests}
                </div>
                <div className="text-sm text-gray-600">Total Requests</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalEvents}
                </div>
                <div className="text-sm text-gray-600">Total Events</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.activePastors}
                </div>
                <div className="text-sm text-gray-600">Active Pastors</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.activeLocations}
                </div>
                <div className="text-sm text-gray-600">Active Locations</div>
              </div>
            </div>
          </div>

          {/* Performance Indicators */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Performance Indicators
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Content Management
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${Math.min(100, activeContentRate)}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(activeContentRate)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Prayer Response</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${prayerResponseRate}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {prayerResponseRate}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Gallery Coverage</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (stats.featuredImages /
                            Math.max(1, stats.totalGalleryImages)) *
                            100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(
                      (stats.featuredImages /
                        Math.max(1, stats.totalGalleryImages)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
