"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { supabase, PrayerRequest } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Phone,
  Mail,
  Send,
  Eye,
  ArrowLeft,
  Clock,
  CheckCircle,
  MessageCircle,
  User,
} from "lucide-react";
import { toast } from "sonner";

export default function PrayerRequestsManagement() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<PrayerRequest | null>(
    null
  );
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [sendingReply, setSendingReply] = useState(false);
  const [replyData, setReplyData] = useState({
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchPrayerRequests();
    }
  }, [user]);

  const fetchPrayerRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("prayer_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPrayerRequests(data || []);
    } catch (error) {
      console.error("Error fetching prayer requests:", error);
      toast.error("Failed to load prayer requests");
    } finally {
      setLoadingRequests(false);
    }
  };

  const updateRequestStatus = async (
    requestId: string,
    status: PrayerRequest["status"]
  ) => {
    try {
      const { error } = await supabase
        .from("prayer_requests")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", requestId);

      if (error) throw error;
      toast.success("Status updated successfully");
      fetchPrayerRequests();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest) return;

    setSendingReply(true);

    try {
      // Send email using Resend
      const response = await fetch("/api/send-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: selectedRequest.email,
          subject: replyData.subject,
          message: replyData.message,
          requestId: selectedRequest.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Update prayer request with reply details
      const { error } = await supabase
        .from("prayer_requests")
        .update({
          status: "replied",
          reply_email: selectedRequest.email,
          reply_subject: replyData.subject,
          reply_message: replyData.message,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedRequest.id);

      if (error) throw error;

      toast.success("Reply sent successfully");
      setShowReplyForm(false);
      setSelectedRequest(null);
      setReplyData({ subject: "", message: "" });
      fetchPrayerRequests();
    } catch (error) {
      console.error("Error sending reply:", error);
      toast.error("Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  const getStatusColor = (status: PrayerRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "replied":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: PrayerRequest["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "in_progress":
        return <MessageCircle className="h-4 w-4" />;
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "replied":
        return <Mail className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading || loadingRequests) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-blue-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-blue-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/admin/dashboard")}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-center">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Prayer Requests
                </h1>
                <p className="text-sm text-gray-500">
                  View and respond to prayer requests
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Reply Form Modal */}
        {showReplyForm && selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Send Reply</CardTitle>
                <CardDescription>
                  Send a response to {selectedRequest.full_name} (
                  {selectedRequest.email})
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={sendReply} className="space-y-6">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={replyData.subject}
                      onChange={(e) =>
                        setReplyData({ ...replyData, subject: e.target.value })
                      }
                      placeholder="Re: Your Prayer Request"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={replyData.message}
                      onChange={(e) =>
                        setReplyData({ ...replyData, message: e.target.value })
                      }
                      rows={6}
                      placeholder="Write your response here..."
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowReplyForm(false);
                        setSelectedRequest(null);
                        setReplyData({ subject: "", message: "" });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={sendingReply}>
                      {sendingReply ? "Sending..." : "Send Reply"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Prayer Requests Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {prayerRequests.map((request) => (
            <Card
              key={request.id}
              className="bg-white shadow-sm border-gray-200"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      {request.full_name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-3 w-3" />
                        {request.email}
                      </div>
                      {request.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {request.phone}
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-3 w-3" />
                        {new Date(request.created_at).toLocaleDateString()}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        request.status
                      )}`}
                    >
                      {getStatusIcon(request.status)}
                      {request.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Prayer Request
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {request.prayer_request}
                    </p>
                  </div>

                  {request.admin_notes && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Admin Notes
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {request.admin_notes}
                      </p>
                    </div>
                  )}

                  {request.reply_message && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Reply Sent
                      </h4>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Subject: {request.reply_subject}
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {request.reply_message}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    {request.status === "pending" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateRequestStatus(request.id, "in_progress")
                          }
                        >
                          Mark In Progress
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            updateRequestStatus(request.id, "completed")
                          }
                        >
                          Mark Completed
                        </Button>
                      </>
                    )}

                    {request.status === "in_progress" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateRequestStatus(request.id, "completed")
                        }
                      >
                        Mark Completed
                      </Button>
                    )}

                    {request.status !== "replied" && (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request);
                          setReplyData({
                            subject: `Re: Your Prayer Request - ${request.full_name}`,
                            message: `Dear ${request.full_name},\n\nThank you for sharing your prayer request with us. We have received your request and our prayer team will be praying for you.\n\nWe will keep you updated on any developments.\n\nBlessings,\nPMC Church Team`,
                          });
                          setShowReplyForm(true);
                        }}
                        className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white"
                      >
                        <Send className="h-3 w-3 mr-1" />
                        Send Reply
                      </Button>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedRequest(request);
                        setShowReplyForm(true);
                      }}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {prayerRequests.length === 0 && !loadingRequests && (
          <div className="text-center py-12">
            <Phone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No prayer requests yet
            </h3>
            <p className="text-gray-600">
              Prayer requests from the website will appear here
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
