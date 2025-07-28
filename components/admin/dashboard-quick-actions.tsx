"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  MessageSquare,
  Calendar,
  Users,
  MapPin,
  Camera,
  Settings,
  Download,
  Upload,
  Bell,
  Search,
  BarChart3,
} from "lucide-react";

export function DashboardQuickActions() {
  const quickActions = [
    {
      title: "Add Prayer Request",
      description: "Create a new prayer request entry",
      icon: MessageSquare,
      href: "/admin/prayer-requests",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-700",
    },
    {
      title: "Create Event",
      description: "Schedule a new church event",
      icon: Calendar,
      href: "/admin/events",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Add Pastor",
      description: "Add a new pastor to the team",
      icon: Users,
      href: "/admin/pastors",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Add Location",
      description: "Add a new church location",
      icon: MapPin,
      href: "/admin/locations",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Upload Image",
      description: "Add new gallery images",
      icon: Camera,
      href: "/admin/gallery",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
    {
      title: "View Analytics",
      description: "Check website statistics",
      icon: BarChart3,
      href: "#",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-700",
    },
  ];

  const shortcuts = [
    {
      title: "Search Content",
      icon: Search,
      action: () => console.log("Search clicked"),
    },
    {
      title: "Notifications",
      icon: Bell,
      action: () => console.log("Notifications clicked"),
    },
    {
      title: "Export Data",
      icon: Download,
      action: () => console.log("Export clicked"),
    },
    {
      title: "Settings",
      icon: Settings,
      action: () => console.log("Settings clicked"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <Card className="border-2 border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-xl font-bold text-gray-900">
            <Plus className="w-6 h-6 text-blue-600" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.href}
                className="group block p-4 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {action.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shortcuts */}
      <Card className="border-2 border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">
            Shortcuts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {shortcuts.map((shortcut, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={shortcut.action}
                className="flex items-center space-x-2 px-4 py-2 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
              >
                <shortcut.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{shortcut.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
