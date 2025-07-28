"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/ui/image-upload";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  Eye,
  Edit,
  Mail,
  Phone,
  User,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  Archive,
  Plus,
  Image as ImageIcon,
  MapPin,
  BookOpen,
  Trash2,
} from "lucide-react";

interface Pastor {
  id: string;
  name: string;
  role: string;
  phone?: string;
  location?: string;
  image_url?: string;
  bio?: string;
  email?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface PastorsTableProps {
  pastors: Pastor[];
}

export function PastorsTable({ pastors }: PastorsTableProps) {
  const [selectedPastor, setSelectedPastor] = useState<Pastor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [deletingPastorId, setDeletingPastorId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const supabase = createClient();

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    phone: "",
    location: "",
    image_url: "",
    bio: "",
    email: "",
    is_active: true,
    sort_order: 0,
  });

  const getStatusBadge = (isActive: boolean) => {
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
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Filter pastors based on active status
  const filteredPastors = pastors.filter((pastor) =>
    showInactive ? !pastor.is_active : pastor.is_active
  );

  // Calculate stats
  const activePastors = pastors.filter((pastor) => pastor.is_active);
  const inactivePastors = pastors.filter((pastor) => !pastor.is_active);

  const handleCreatePastor = () => {
    setSelectedPastor(null);
    setFormData({
      name: "",
      role: "",
      phone: "",
      location: "",
      image_url: "",
      bio: "",
      email: "",
      is_active: true,
      sort_order: pastors.length + 1,
    });
    setIsCreating(true);
    setIsDialogOpen(true);
  };

  const handleEditPastor = (pastor: Pastor) => {
    setSelectedPastor(pastor);
    setFormData({
      name: pastor.name,
      role: pastor.role,
      phone: pastor.phone || "",
      location: pastor.location || "",
      image_url: pastor.image_url || "",
      bio: pastor.bio || "",
      email: pastor.email || "",
      is_active: pastor.is_active,
      sort_order: pastor.sort_order,
    });
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.role.trim()) {
      toast.error("Name and role are required fields.");
      return;
    }

    setIsUpdating(true);
    try {
      if (isCreating) {
        const { error } = await supabase.from("pastors").insert([formData]);
        if (error) {
          console.error("Error creating pastor:", error);
          toast.error("Failed to create pastor. Please try again.");
        } else {
          toast.success("Pastor created successfully!");
          setIsDialogOpen(false);
          window.location.reload();
        }
      } else {
        const { error } = await supabase
          .from("pastors")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedPastor!.id);
        if (error) {
          console.error("Error updating pastor:", error);
          toast.error("Failed to update pastor. Please try again.");
        } else {
          toast.success("Pastor updated successfully!");
          setIsDialogOpen(false);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error saving pastor:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeletePastor = (pastor: Pastor) => {
    setSelectedPastor(pastor);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedPastor) return;

    setDeletingPastorId(selectedPastor.id);
    try {
      const { error } = await supabase
        .from("pastors")
        .delete()
        .eq("id", selectedPastor.id);

      if (error) {
        console.error("Error deleting pastor:", error);
        toast.error("Failed to delete pastor. Please try again.");
      } else {
        toast.success("Pastor deleted successfully!");
        setIsDeleteDialogOpen(false);
        window.location.reload();
        setSelectedPastor(null);
      }
    } catch (error) {
      console.error("Error deleting pastor:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setDeletingPastorId(null);
    }
  };

  return (
    <>
      {pastors.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-orange-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Pastors Added Yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Add your pastoral team members to display them on the website. You
            can include their photos, roles, contact information, and bios.
          </p>
          <Button
            onClick={handleCreatePastor}
            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add First Pastor
          </Button>
        </div>
      ) : filteredPastors.length === 0 ? (
        <div className="space-y-6">
          {/* Header Section with Toggle - Always Visible */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {showInactive ? "Inactive Pastors" : "Pastors Management"}
              </h2>
              <p className="text-gray-600 mt-1">
                {showInactive
                  ? `Viewing ${inactivePastors.length} inactive pastor${
                      inactivePastors.length !== 1 ? "s" : ""
                    }`
                  : `Manage ${activePastors.length} active pastor${
                      activePastors.length !== 1 ? "s" : ""
                    } on your website`}
              </p>
            </div>

            {/* Active/Inactive Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {showInactive ? "Inactive" : "Active"}
                </span>
                <button
                  onClick={() => setShowInactive(!showInactive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                    showInactive ? "bg-orange-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showInactive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{activePastors.length} Active</span>
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>{inactivePastors.length} Inactive</span>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Archive className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {showInactive ? "No Inactive Pastors" : "No Active Pastors"}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              {showInactive
                ? "There are no inactive pastors. Inactive pastors will appear here once you deactivate them."
                : "There are no active pastors. All pastors have been deactivated."}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-gray-700 text-sm font-medium">
              <Archive className="w-4 h-4" />
              <span>
                {showInactive ? "No inactive pastors" : "No active pastors"}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {showInactive ? "Inactive Pastors" : "Pastors Management"}
              </h2>
              <p className="text-gray-600 mt-1">
                {showInactive
                  ? `Viewing ${inactivePastors.length} inactive pastor${
                      inactivePastors.length !== 1 ? "s" : ""
                    }`
                  : `Manage ${activePastors.length} active pastor${
                      activePastors.length !== 1 ? "s" : ""
                    } on your website`}
              </p>
            </div>

            {/* Active/Inactive Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {showInactive ? "Inactive" : "Active"}
                </span>
                <button
                  onClick={() => setShowInactive(!showInactive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                    showInactive ? "bg-orange-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showInactive ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>{activePastors.length} Active</span>
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>{inactivePastors.length} Inactive</span>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Total Pastors
                    </p>
                    <p className="text-3xl font-bold text-blue-900">
                      {pastors.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Active Pastors
                    </p>
                    <p className="text-3xl font-bold text-green-900">
                      {activePastors.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Inactive Pastors
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {inactivePastors.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                    <Archive className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Pastor Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleCreatePastor}
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Pastor
            </Button>
          </div>

          {/* Pastors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPastors.map((pastor) => (
              <motion.div
                key={pastor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="group hover:shadow-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {pastor.name}
                        </h3>
                        <p className="text-sm text-gray-600">{pastor.role}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(pastor.is_active)}
                      </div>
                    </div>

                    {/* Image */}
                    {pastor.image_url && (
                      <div className="mb-4">
                        <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                          <img
                            src={pastor.image_url}
                            alt={pastor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      {pastor.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{pastor.email}</span>
                        </div>
                      )}
                      {pastor.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{pastor.phone}</span>
                        </div>
                      )}
                      {pastor.location && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{pastor.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Bio Preview */}
                    {pastor.bio && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 line-clamp-3 bg-gray-50 rounded-lg p-3">
                          {pastor.bio}
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Updated {formatDate(pastor.updated_at)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditPastor(pastor)}
                          className="text-orange-600 border-orange-200 hover:bg-orange-50"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePastor(pastor)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="w-3 h-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Pastor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              {isCreating ? "Add New Pastor" : "Edit Pastor"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isCreating
                ? "Add a new pastor to your team. This information will be displayed on the website."
                : "Update the pastor's information and settings."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Full Name *
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter pastor's full name"
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Role/Position *
                </Label>
                <Input
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  placeholder="e.g., Senior Pastor, Associate Pastor"
                  className="w-full"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="pastor@church.com"
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Phone Number
                </Label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+1 (555) 123-4567"
                  className="w-full"
                />
              </div>
            </div>

            {/* Location and Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Location/Campus
                </Label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="e.g., Main Campus, North Campus"
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Sort Order
                </Label>
                <Input
                  type="number"
                  value={formData.sort_order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sort_order: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="1"
                  className="w-full"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                label="Profile Image"
                placeholder="Upload a profile image..."
              />
            </div>

            {/* Bio */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Bio/Description
              </Label>
              <Textarea
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
                placeholder="Tell us about this pastor's background, ministry focus, and experience..."
                className="w-full min-h-[120px]"
              />
            </div>

            {/* Status */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Status
              </Label>
              <Select
                value={formData.is_active ? "active" : "inactive"}
                onValueChange={(value) =>
                  setFormData({ ...formData, is_active: value === "active" })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Active (Visible on website)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="inactive">
                    <div className="flex items-center gap-2">
                      <Archive className="w-4 h-4" />
                      <span>Inactive (Hidden from website)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isUpdating}
                className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 font-semibold"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>
                      {isCreating ? "Create Pastor" : "Update Pastor"}
                    </span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Pastor</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedPastor?.name}</strong>? This action cannot be
              undone and will permanently remove the pastor from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deletingPastorId !== null}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletingPastorId ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete Pastor"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
