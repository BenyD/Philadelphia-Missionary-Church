"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ImageUpload } from "@/components/ui/image-upload";
import { toast } from "sonner";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Archive,
  CheckCircle,
  Camera,
  Image as ImageIcon,
  Grid,
  List,
  Check,
} from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface GalleryTableProps {
  images: GalleryImage[];
}

export function GalleryTable({ images }: GalleryTableProps) {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(images);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingImageId, setDeletingImageId] = useState<string | null>(null);
  const [showInactive, setShowInactive] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);

  const supabase = createClient();

  const activeImages = galleryImages.filter((image) => image.is_active);
  const inactiveImages = galleryImages.filter((image) => !image.is_active);
  const filteredImages = showInactive ? inactiveImages : activeImages;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "General",
    is_featured: false,
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
    });
  };

  const handleCreateImage = () => {
    setSelectedImage(null);
    setFormData({
      title: "",
      description: "",
      image_url: "",
      category: "General",
      is_featured: false,
      is_active: true,
      sort_order: galleryImages.length + 1,
    });
    setIsCreating(true);
    setIsDialogOpen(true);
  };

  const handleEditImage = (image: GalleryImage) => {
    setSelectedImage(image);
    setFormData({
      title: image.title,
      description: image.description || "",
      image_url: image.image_url,
      category: image.category,
      is_featured: image.is_featured,
      is_active: image.is_active,
      sort_order: image.sort_order,
    });
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter an image title.");
      return;
    }
    if (!formData.image_url.trim()) {
      toast.error("Please upload an image.");
      return;
    }

    setIsUpdating(true);
    try {
      if (isCreating) {
        const { error } = await supabase
          .from("gallery_images")
          .insert([formData]);
        if (error) {
          console.error("Error creating image:", error);
          toast.error("Failed to create image. Please try again.");
        } else {
          toast.success("Image created successfully!");
          setIsDialogOpen(false);
          window.location.reload();
        }
      } else {
        // Check if image was replaced
        if (selectedImage && formData.image_url !== selectedImage.image_url) {
          // Delete old image from storage if it's from our bucket
          if (
            selectedImage.image_url &&
            selectedImage.image_url.includes("gallery-images")
          ) {
            const oldFileName = selectedImage.image_url.split("/").pop();
            if (oldFileName) {
              const { error: storageError } = await supabase.storage
                .from("gallery-images")
                .remove([oldFileName]);

              if (storageError) {
                console.error(
                  "Error deleting old image from storage:",
                  storageError
                );
                // Continue with update even if storage deletion fails
              }
            }
          }
        }

        const { error } = await supabase
          .from("gallery_images")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedImage!.id);
        if (error) {
          console.error("Error updating image:", error);
          toast.error("Failed to update image. Please try again.");
        } else {
          toast.success("Image updated successfully!");
          setIsDialogOpen(false);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Error saving image:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteImage = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedImage) return;

    setDeletingImageId(selectedImage.id);
    try {
      // Delete from storage bucket first
      if (
        selectedImage.image_url &&
        selectedImage.image_url.includes("gallery-images")
      ) {
        const fileName = selectedImage.image_url.split("/").pop();
        if (fileName) {
          const { error: storageError } = await supabase.storage
            .from("gallery-images")
            .remove([fileName]);

          if (storageError) {
            console.error("Error deleting image from storage:", storageError);
            // Continue with database deletion even if storage deletion fails
          }
        }
      }

      // Delete from database
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .eq("id", selectedImage.id);

      if (error) {
        console.error("Error deleting image:", error);
        toast.error("Failed to delete image. Please try again.");
      } else {
        toast.success("Image deleted successfully!");
        setIsDeleteDialogOpen(false);
        window.location.reload();
        setSelectedImage(null);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setDeletingImageId(null);
    }
  };

  // Bulk delete functions
  const handleSelectImage = (imageId: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(imageId)) {
      newSelected.delete(imageId);
    } else {
      newSelected.add(imageId);
    }
    setSelectedImages(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedImages.size === filteredImages.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(filteredImages.map((img) => img.id)));
    }
  };

  const handleBulkDelete = () => {
    if (selectedImages.size === 0) {
      toast.error("Please select at least one image to delete.");
      return;
    }
    setIsBulkDeleteDialogOpen(true);
  };

  const confirmBulkDelete = async () => {
    if (selectedImages.size === 0) return;

    setIsBulkDeleting(true);
    try {
      const selectedImageObjects = filteredImages.filter((img) =>
        selectedImages.has(img.id)
      );
      const fileNames: string[] = [];
      const imageIds: string[] = [];

      // Collect file names and image IDs
      selectedImageObjects.forEach((image) => {
        if (image.image_url && image.image_url.includes("gallery-images")) {
          const fileName = image.image_url.split("/").pop();
          if (fileName) fileNames.push(fileName);
        }
        imageIds.push(image.id);
      });

      // Delete from storage bucket first
      if (fileNames.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("gallery-images")
          .remove(fileNames);

        if (storageError) {
          console.error("Error deleting images from storage:", storageError);
          // Continue with database deletion even if storage deletion fails
        }
      }

      // Delete from database
      const { error } = await supabase
        .from("gallery_images")
        .delete()
        .in("id", imageIds);

      if (error) {
        console.error("Error deleting images:", error);
        toast.error("Failed to delete images. Please try again.");
      } else {
        toast.success(`${selectedImages.size} image(s) deleted successfully!`);
        setIsBulkDeleteDialogOpen(false);
        setSelectedImages(new Set());
        window.location.reload();
      }
    } catch (error) {
      console.error("Error bulk deleting images:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsBulkDeleting(false);
    }
  };

  return (
    <>
      {galleryImages.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Camera className="w-10 h-10 text-purple-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Gallery Images Added Yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Add images to your gallery to showcase church events, services, and
            community moments on the website.
          </p>
          <Button
            onClick={handleCreateImage}
            className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add First Image
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {showInactive
                  ? "Inactive Gallery Images"
                  : "Gallery Management"}
              </h2>
              <p className="text-gray-600 mt-1">
                {showInactive
                  ? `Viewing ${inactiveImages.length} inactive image${
                      inactiveImages.length !== 1 ? "s" : ""
                    }`
                  : `Manage ${activeImages.length} active image${
                      activeImages.length !== 1 ? "s" : ""
                    } in your gallery`}
              </p>
            </div>

            {/* Active/Inactive Toggle and Actions */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {showInactive ? "Inactive" : "Active"}
                </span>
                <button
                  onClick={() => setShowInactive(!showInactive)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                    showInactive ? "bg-purple-600" : "bg-gray-200"
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
                <span>{activeImages.length} Active</span>
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>{inactiveImages.length} Inactive</span>
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedImages.size > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-blue-900">
                    {selectedImages.size} image(s) selected
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSelectAll}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    {selectedImages.size === filteredImages.length
                      ? "Deselect All"
                      : "Select All"}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedImages(new Set())}
                    className="text-gray-600 border-gray-200 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete Selected ({selectedImages.size})
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">
                      Total Images
                    </p>
                    <p className="text-3xl font-bold text-blue-900">
                      {galleryImages.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Active Images
                    </p>
                    <p className="text-3xl font-bold text-green-900">
                      {activeImages.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-yellow-600">
                      Featured Images
                    </p>
                    <p className="text-3xl font-bold text-yellow-900">
                      {galleryImages.filter((img) => img.is_featured).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* View Toggle */}
            <div className="flex items-center gap-1 bg-white rounded-xl border border-gray-200 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 md:p-3 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 md:p-3 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Add Image Button */}
            <Button
              onClick={handleCreateImage}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Image
            </Button>
          </div>

          {/* Images Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Card
                    className={`group hover:shadow-xl border-2 transition-all duration-300 ${
                      selectedImages.has(image.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-gradient-to-br from-white to-gray-50"
                    }`}
                  >
                    <CardContent className="p-6">
                      {/* Selection Checkbox */}
                      <div className="flex justify-end mb-2">
                        <button
                          onClick={() => handleSelectImage(image.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                            selectedImages.has(image.id)
                              ? "bg-blue-500 border-blue-500 text-white"
                              : "bg-white border-gray-300 hover:border-blue-400"
                          }`}
                        >
                          {selectedImages.has(image.id) && (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Image */}
                      <div className="mb-4">
                        <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                          <img
                            src={image.image_url}
                            alt={image.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {image.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {image.category}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(image.is_active)}
                          {image.is_featured && (
                            <Badge className="bg-yellow-100 text-yellow-800">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      {image.description && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 line-clamp-3 bg-gray-50 rounded-lg p-3">
                            {image.description}
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="text-xs text-gray-500">
                          Updated {formatDate(image.updated_at)}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditImage(image)}
                            className="text-purple-600 border-purple-200 hover:bg-purple-50"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteImage(image)}
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
          ) : (
            <div className="space-y-6">
              {filteredImages.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Card
                    className={`group hover:shadow-xl border-2 transition-all duration-300 ${
                      selectedImages.has(image.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 bg-gradient-to-br from-white to-gray-50"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Selection Checkbox */}
                        <div className="flex justify-end lg:justify-start mb-2 lg:mb-0">
                          <button
                            onClick={() => handleSelectImage(image.id)}
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                              selectedImages.has(image.id)
                                ? "bg-blue-500 border-blue-500 text-white"
                                : "bg-white border-gray-300 hover:border-blue-400"
                            }`}
                          >
                            {selectedImages.has(image.id) && (
                              <Check className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {/* Image */}
                        <div className="lg:w-64 lg:flex-shrink-0">
                          <div className="w-full h-48 lg:h-32 rounded-lg overflow-hidden border-2 border-gray-200">
                            <img
                              src={image.image_url}
                              alt={image.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                {image.title}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {image.category}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(image.is_active)}
                              {image.is_featured && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Description */}
                          {image.description && (
                            <div className="mb-4">
                              <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                                {image.description}
                              </p>
                            </div>
                          )}

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                            <div className="text-xs text-gray-500">
                              Updated {formatDate(image.updated_at)}
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditImage(image)}
                                className="text-purple-600 border-purple-200 hover:bg-purple-50"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteImage(image)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Image Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              {isCreating ? "Add New Image" : "Edit Image"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isCreating
                ? "Add a new image to your gallery. This will be displayed on the website."
                : "Update the image's information and settings."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <ImageUpload
                value={formData.image_url}
                onChange={(url) => setFormData({ ...formData, image_url: url })}
                label="Gallery Image"
                placeholder="Upload a gallery image..."
                uploadEndpoint="/api/upload/gallery-image"
              />
            </div>

            {/* Title */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Image Title *
              </Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter image title"
                className="w-full"
              />
            </div>

            {/* Category */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General">General</SelectItem>
                  <SelectItem value="Services">Services</SelectItem>
                  <SelectItem value="Events">Events</SelectItem>
                  <SelectItem value="Prayer">Prayer</SelectItem>
                  <SelectItem value="Youth">Youth</SelectItem>
                  <SelectItem value="Outreach">Outreach</SelectItem>
                  <SelectItem value="Worship">Worship</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Community">Community</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Description
              </Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe this image..."
                className="w-full min-h-[120px]"
              />
            </div>

            {/* Sort Order */}
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

            {/* Featured and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_featured: checked })
                  }
                />
                <Label htmlFor="featured">Featured Image</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_active: checked })
                  }
                />
                <Label htmlFor="active">Active (Visible on website)</Label>
              </div>
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
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white px-8 font-semibold"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isCreating ? "Create Image" : "Update Image"}</span>
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
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedImage?.title}</strong>? This action cannot be
              undone and will permanently remove the image from the gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deletingImageId !== null}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletingImageId ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete Image"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk Delete Confirmation Dialog */}
      <AlertDialog
        open={isBulkDeleteDialogOpen}
        onOpenChange={setIsBulkDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Multiple Images</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedImages.size} image(s)</strong>? This action
              cannot be undone and will permanently remove all selected images
              from the gallery.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmBulkDelete}
              disabled={isBulkDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isBulkDeleting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deleting {selectedImages.size} images...</span>
                </div>
              ) : (
                `Delete ${selectedImages.size} Images`
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
