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
      <div className="text-center py-12">
        <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Prayer Requests
        </h3>
        <p className="text-gray-500">
          Prayer requests will appear here once submitted by visitors.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {prayerRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-900">
                          {request.full_name}
                        </span>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{request.email}</span>
                      </div>
                      {request.phone_number && (
                        <div className="flex items-center space-x-1">
                          <Phone className="w-4 h-4" />
                          <span>{request.phone_number}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(request.created_at)}</span>
                      </div>
                    </div>

                    <div className="text-gray-700">
                      <p className="line-clamp-2">{request.prayer_request}</p>
                    </div>

                    {request.admin_notes && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                          <strong>Admin Notes:</strong> {request.admin_notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewRequest(request)}
                      className="flex items-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* View/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Prayer Request Details</DialogTitle>
            <DialogDescription>
              View and manage this prayer request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="space-y-6">
              {/* Request Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700">
                    Name
                  </Label>
                  <p className="text-gray-900">{selectedRequest.full_name}</p>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700">
                    Email
                  </Label>
                  <p className="text-gray-900">{selectedRequest.email}</p>
                </div>
                {selectedRequest.phone_number && (
                  <div>
                    <Label className="text-sm font-semibold text-gray-700">
                      Phone
                    </Label>
                    <p className="text-gray-900">
                      {selectedRequest.phone_number}
                    </p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-semibold text-gray-700">
                    Status
                  </Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700">
                  Prayer Request
                </Label>
                <div className="mt-2 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">
                    {selectedRequest.prayer_request}
                  </p>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="admin-notes"
                  className="text-sm font-semibold text-gray-700"
                >
                  Admin Notes
                </Label>
                <Textarea
                  id="admin-notes"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes about this prayer request..."
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdateRequest}
                  disabled={isUpdating}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isUpdating ? "Updating..." : "Update Request"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
