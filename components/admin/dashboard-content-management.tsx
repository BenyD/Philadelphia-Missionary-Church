"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  Calendar,
  Users,
  MapPin,
  Camera,
  Plus,
  Edit,
  Trash2,
  Eye,
  Clock,
  CheckCircle,
  Archive,
  Star,
  MoreHorizontal,
} from "lucide-react";

interface DashboardContentManagementProps {
  prayerRequests: any[];
  events: any[];
  pastors: any[];
  locations: any[];
  galleryImages: any[];
}

export function DashboardContentManagement({
  prayerRequests,
  events,
  pastors,
  locations,
  galleryImages,
}: DashboardContentManagementProps) {
  const [activeTab, setActiveTab] = useState("prayer-requests");

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

  const getActiveBadge = (isActive: boolean) => {
    return isActive ? (
      <Badge className="bg-green-100 text-green-800">
        <CheckCircle className="w-3 h-3 mr-1" />
        Active
      </Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">
        <Archive className="w-3 h-3 mr-1" />
        Inactive
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="border-2 border-gray-100">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-xl font-bold text-gray-900">
          <span>Content Management</span>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger
              value="prayer-requests"
              className="flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Prayer Requests</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="hidden sm:inline">Events</span>
            </TabsTrigger>
            <TabsTrigger
              value="pastors"
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Pastors</span>
            </TabsTrigger>
            <TabsTrigger
              value="locations"
              className="flex items-center space-x-2"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">Locations</span>
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="flex items-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Gallery</span>
            </TabsTrigger>
          </TabsList>

          {/* Prayer Requests Tab */}
          <TabsContent value="prayer-requests" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  Recent Prayer Requests
                </h3>
                <a
                  href="/admin/prayer-requests"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All →
                </a>
              </div>
              {prayerRequests.slice(0, 5).map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {request.full_name}
                      </span>
                      {getStatusBadge(request.status)}
                      <span className="text-xs text-gray-500">
                        {formatDate(request.created_at)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {request.prayer_request}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Upcoming Events</h3>
                <a
                  href="/admin/events"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All →
                </a>
              </div>
              {events.slice(0, 5).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {event.title}
                      </span>
                      {getActiveBadge(event.is_active)}
                      <span className="text-xs text-gray-500">
                        {formatDate(event.date)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{event.location}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Pastors Tab */}
          <TabsContent value="pastors" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Active Pastors</h3>
                <a
                  href="/admin/pastors"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All →
                </a>
              </div>
              {pastors.slice(0, 5).map((pastor) => (
                <div
                  key={pastor.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    {pastor.image_url && (
                      <img
                        src={pastor.image_url}
                        alt={pastor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {pastor.name}
                        </span>
                        {getActiveBadge(pastor.is_active)}
                      </div>
                      <p className="text-sm text-gray-600">{pastor.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Church Locations</h3>
                <a
                  href="/admin/locations"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All →
                </a>
              </div>
              {locations.slice(0, 5).map((location) => (
                <div
                  key={location.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {location.name}
                      </span>
                      {getActiveBadge(location.is_active)}
                    </div>
                    <p className="text-sm text-gray-600">{location.address}</p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Featured Images</h3>
                <a
                  href="/admin/gallery"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View All →
                </a>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {galleryImages.slice(0, 6).map((image) => (
                  <div key={image.id} className="group relative">
                    <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {image.is_featured && (
                      <div className="absolute top-2 right-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
