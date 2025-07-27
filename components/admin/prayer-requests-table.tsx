"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  Edit,
  Mail,
  Phone,
  User,
  Calendar,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  Archive,
} from "lucide-react";

interface PrayerRequest {
  id: string;
  full_name: string;
  phone_number?: string;
  email: string;
  prayer_request: string;
  status: "pending" | "in_progress" | "completed" | "archived";
  created_at: string;
  updated_at: string;
  admin_notes?: string;
}

interface PrayerRequestsTableProps {
  prayerRequests: PrayerRequest[];
}

export function PrayerRequestsTable({
  prayerRequests,
}: PrayerRequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");
  const [status, setStatus] = useState<string>("");
  const [showArchived, setShowArchived] = useState(false);
  const supabase = createClient();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-yellow-100 text-yellow-800", icon: Clock },
      in_progress: {
        color: "bg-orange-100 text-orange-800",
        icon: AlertCircle,
      },
      completed: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      archived: { color: "bg-gray-100 text-gray-800", icon: Archive },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.replace("_", " ").toUpperCase()}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter prayer requests based on archived status
  const filteredPrayerRequests = prayerRequests.filter((request) =>
    showArchived ? request.status === "archived" : request.status !== "archived"
  );

  // Calculate stats for non-archived requests
  const activeRequests = prayerRequests.filter(
    (request) => request.status !== "archived"
  );
  const archivedRequests = prayerRequests.filter(
    (request) => request.status === "archived"
  );

  const handleViewRequest = (request: PrayerRequest) => {
    setSelectedRequest(request);
    setAdminNotes(request.admin_notes || "");
    setStatus(request.status);
    setIsDialogOpen(true);
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest) return;

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from("prayer_requests")
        .update({
          status,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedRequest.id);

      if (error) {
        console.error("Error updating prayer request:", error);
      } else {
        // Refresh the page to show updated data
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating prayer request:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (prayerRequests.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <MessageSquare className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No Prayer Requests Yet
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          Prayer requests from your community will appear here once they are
          submitted through the website. You'll be able to review and manage
          them from this dashboard.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-700 text-sm font-medium">
          <Clock className="w-4 h-4" />
          <span>Waiting for submissions...</span>
        </div>
      </div>
    );
  }

  if (filteredPrayerRequests.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Archive className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {showArchived ? "No Archived Requests" : "No Active Requests"}
        </h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          {showArchived
            ? "There are no archived prayer requests. Archived requests will appear here once you archive them from the active requests."
            : "There are no active prayer requests. All requests have been archived or completed."}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-gray-700 text-sm font-medium">
          <Archive className="w-4 h-4" />
          <span>
            {showArchived ? "No archived requests" : "No active requests"}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {showArchived
              ? "Archived Prayer Requests"
              : "Prayer Requests Management"}
          </h2>
          <p className="text-gray-600 mt-1">
            {showArchived
              ? `Viewing ${archivedRequests.length} archived prayer request${
                  archivedRequests.length !== 1 ? "s" : ""
                }`
              : `Manage ${activeRequests.length} active prayer request${
                  activeRequests.length !== 1 ? "s" : ""
                } from your community`}
          </p>
        </div>

        {/* Archive Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              {showArchived ? "Archived" : "Active"}
            </span>
            <button
              onClick={() => setShowArchived(!showArchived)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                showArchived ? "bg-blue-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showArchived ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>{activeRequests.length} Active</span>
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span>{archivedRequests.length} Archived</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">
                Active Requests
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {activeRequests.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-900">
                {activeRequests.filter((r) => r.status === "pending").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">In Progress</p>
              <p className="text-2xl font-bold text-orange-900">
                {
                  activeRequests.filter((r) => r.status === "in_progress")
                    .length
                }
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Completed</p>
              <p className="text-2xl font-bold text-green-900">
                {activeRequests.filter((r) => r.status === "completed").length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Archived</p>
              <p className="text-2xl font-bold text-gray-900">
                {archivedRequests.length}
              </p>
            </div>
            <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
              <Archive className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Requests Grid */}
      <div className="grid gap-6">
        {filteredPrayerRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 bg-gradient-to-br from-white to-gray-50/50">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Request Content */}
                  <div className="flex-1 space-y-4">
                    {/* Header with Name and Status */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            {request.full_name}
                          </h3>
                          <div className="flex items-center gap-2 mt-2">
                            {getStatusBadge(request.status)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Mail className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-blue-600">
                            Email
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {request.email}
                          </p>
                        </div>
                      </div>

                      {request.phone_number && (
                        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                            <Phone className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-xs font-medium text-green-600">
                              Phone
                            </p>
                            <p className="text-sm font-semibold text-gray-900">
                              {request.phone_number}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-purple-600">
                            Submitted
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {formatDate(request.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Prayer Request */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">
                          Prayer Request
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed line-clamp-3">
                        {request.prayer_request}
                      </p>
                    </div>

                    {/* Admin Notes */}
                    {request.admin_notes && (
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <Edit className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-blue-700">
                            Admin Notes
                          </span>
                        </div>
                        <p className="text-blue-800 leading-relaxed">
                          {request.admin_notes}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:min-w-[120px]">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRequest(request)}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-blue-50 border-blue-300 hover:border-blue-400 text-blue-600 hover:text-blue-700 transition-all duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View & Manage</span>
                    </Button>

                    {/* Quick Archive/Unarchive Action */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={async () => {
                        const newStatus =
                          request.status === "archived"
                            ? "pending"
                            : "archived";
                        try {
                          const { error } = await supabase
                            .from("prayer_requests")
                            .update({
                              status: newStatus,
                              updated_at: new Date().toISOString(),
                            })
                            .eq("id", request.id);

                          if (error) {
                            console.error(
                              "Error updating prayer request:",
                              error
                            );
                          } else {
                            window.location.reload();
                          }
                        } catch (error) {
                          console.error(
                            "Error updating prayer request:",
                            error
                          );
                        }
                      }}
                      className={`flex items-center justify-center gap-2 transition-all duration-200 ${
                        request.status === "archived"
                          ? "bg-white hover:bg-green-50 border-green-300 hover:border-green-400 text-green-600 hover:text-green-700"
                          : "bg-white hover:bg-gray-50 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-700"
                      }`}
                    >
                      {request.status === "archived" ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          <span>Unarchive</span>
                        </>
                      ) : (
                        <>
                          <Archive className="w-4 h-4" />
                          <span>Archive</span>
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Enhanced View/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-h-[95vh] overflow-y-auto !max-w-[95vw] !w-[95vw] !min-w-[95vw]"
          style={{
            width: "95vw",
            maxWidth: "95vw",
            minWidth: "95vw",
            margin: "2.5vh auto",
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              Prayer Request Management
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-base">
              Comprehensive view and management of prayer request from your
              community
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-8">
              {/* Enhanced Request Header */}
              <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 rounded-2xl p-8 border-2 border-blue-200 shadow-lg">
                {/* Header Row */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {selectedRequest.full_name}
                      </h3>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(selectedRequest.status)}
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                          Request #{selectedRequest.id.slice(0, 8)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 bg-white/80 hover:bg-white"
                      onClick={() =>
                        window.open(`mailto:${selectedRequest.email}`, "_blank")
                      }
                    >
                      <Mail className="w-4 h-4" />
                      <span className="hidden sm:inline">Email</span>
                    </Button>
                    {selectedRequest.phone_number && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 bg-white/80 hover:bg-white"
                        onClick={() =>
                          window.open(
                            `tel:${selectedRequest.phone_number}`,
                            "_blank"
                          )
                        }
                      >
                        <Phone className="w-4 h-4" />
                        <span className="hidden sm:inline">Call</span>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Contact Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Email Card */}
                  <div className="bg-white/80 rounded-xl p-5 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-1">
                          Email Address
                        </p>
                        <p className="text-sm font-semibold text-gray-900 break-all">
                          {selectedRequest.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phone Card */}
                  {selectedRequest.phone_number ? (
                    <div className="bg-white/80 rounded-xl p-5 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1">
                            Phone Number
                          </p>
                          <p className="text-sm font-semibold text-gray-900">
                            {selectedRequest.phone_number}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-400 rounded-xl flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                            Phone Number
                          </p>
                          <p className="text-sm text-gray-500">Not provided</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Timeline Card */}
                  <div className="bg-white/80 rounded-xl p-5 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1">
                          Timeline
                        </p>
                        <div className="space-y-1">
                          <div>
                            <p className="text-xs text-gray-500">Submitted</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {formatDate(selectedRequest.created_at)}
                            </p>
                          </div>
                          {selectedRequest.updated_at !==
                            selectedRequest.created_at && (
                            <div>
                              <p className="text-xs text-gray-500">Updated</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {formatDate(selectedRequest.updated_at)}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Prayer Request Content */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border-2 border-gray-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Prayer Request
                    </h4>
                    <p className="text-sm text-gray-600">
                      Original request from the community member
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap text-base">
                    {selectedRequest.prayer_request}
                  </p>
                </div>
              </div>

              {/* Enhanced Management Section */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Edit className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Management & Response
                    </h4>
                    <p className="text-sm text-gray-600">
                      Update status and add internal notes
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Status Management */}
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-3 block">
                        Current Status
                      </Label>
                      <div className="flex items-center gap-3 mb-4">
                        {getStatusBadge(selectedRequest.status)}
                        <span className="text-sm text-gray-500">
                          Last updated: {formatDate(selectedRequest.updated_at)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                        Update Status
                      </Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>Pending</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="in_progress">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" />
                              <span>In Progress</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="completed">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4" />
                              <span>Completed</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="archived">
                            <div className="flex items-center gap-2">
                              <Archive className="w-4 h-4" />
                              <span>Archived</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Admin Notes */}
                  <div>
                    <Label
                      htmlFor="admin-notes"
                      className="text-sm font-semibold text-gray-700 mb-2 block"
                    >
                      Admin Notes & Follow-up
                    </Label>
                    <Textarea
                      id="admin-notes"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add detailed notes about this prayer request, follow-up actions taken, responses sent, or any relevant information for internal reference..."
                      className="w-full min-h-[120px]"
                      rows={5}
                    />
                    <div className="mt-3 space-y-2">
                      <p className="text-xs text-gray-500">
                        💡 <strong>Tip:</strong> Use this space to track
                        follow-up actions, responses sent, and any relevant
                        notes.
                      </p>
                      <p className="text-xs text-gray-500">
                        🔒 These notes are for internal use only and won't be
                        shared with the requester.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t-2 border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Request ID: {selectedRequest.id}</span>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    className="px-6 py-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleUpdateRequest}
                    disabled={isUpdating}
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-2 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isUpdating ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Updating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>Update Request</span>
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
