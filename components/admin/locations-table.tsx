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
  Edit,
  MapPin,
  Clock,
  Users,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Archive,
  Plus,
  Trash2,
  Building,
  Calendar,
  Star,
  ExternalLink,
  X,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface LocationService {
  id: string;
  day: string;
  time: string;
  type: string;
  service_location?: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
}

interface LocationContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  role?: string;
  is_primary: boolean;
  is_active: boolean;
  sort_order: number;
}

interface Location {
  id: string;
  name: string;
  address: string;
  city?: string;
  postal_code?: string;
  country: string;
  phone?: string;
  email?: string;
  website?: string;
  image_url?: string;
  description?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  location_services: LocationService[];
  location_contacts: LocationContact[];
}

interface LocationsTableProps {
  locations: Location[];
}

export function LocationsTable({ locations }: LocationsTableProps) {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showInactive, setShowInactive] = useState(false);
  const [deletingLocationId, setDeletingLocationId] = useState<string | null>(
    null
  );
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const supabase = createClient();

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    postal_code: "",
    country: "Switzerland",
    phone: "",
    email: "",
    website: "",
    image_url: "",
    description: "",
    is_active: true,
    sort_order: 0,
  });

  // Services and contacts state
  const [services, setServices] = useState<Omit<LocationService, "id">[]>([]);
  const [contacts, setContacts] = useState<Omit<LocationContact, "id">[]>([]);

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

  // Filter locations based on active status
  const filteredLocations = locations.filter((location) =>
    showInactive ? !location.is_active : location.is_active
  );

  // Calculate stats
  const activeLocations = locations.filter((location) => location.is_active);
  const inactiveLocations = locations.filter((location) => !location.is_active);
  const totalServices = locations.reduce(
    (acc, location) => acc + location.location_services.length,
    0
  );
  const totalContacts = locations.reduce(
    (acc, location) => acc + location.location_contacts.length,
    0
  );

  const handleCreateLocation = () => {
    setSelectedLocation(null);
    setFormData({
      name: "",
      address: "",
      city: "",
      postal_code: "",
      country: "Switzerland",
      phone: "",
      email: "",
      website: "",
      image_url: "",
      description: "",
      is_active: true,
      sort_order: locations.length + 1,
    });
    setServices([]);
    setContacts([]);
    setIsCreating(true);
    setIsDialogOpen(true);
  };

  const handleEditLocation = (location: Location) => {
    setSelectedLocation(location);
    setFormData({
      name: location.name,
      address: location.address,
      city: location.city || "",
      postal_code: location.postal_code || "",
      country: location.country,
      phone: location.phone || "",
      email: location.email || "",
      website: location.website || "",
      image_url: location.image_url || "",
      description: location.description || "",
      is_active: location.is_active,
      sort_order: location.sort_order,
    });
    setServices(
      location.location_services.map((service) => ({
        day: service.day,
        time: service.time,
        type: service.type,
        service_location: service.service_location || "",
        description: service.description || "",
        is_active: service.is_active,
        sort_order: service.sort_order,
      }))
    );
    setContacts(
      location.location_contacts.map((contact) => ({
        name: contact.name,
        phone: contact.phone || "",
        email: contact.email || "",
        role: contact.role || "",
        is_primary: contact.is_primary,
        is_active: contact.is_active,
        sort_order: contact.sort_order,
      }))
    );
    setIsCreating(false);
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.address.trim()) {
      toast.error("Name and address are required fields.");
      return;
    }

    setIsUpdating(true);
    try {
      if (isCreating) {
        // Create location
        const { data: locationData, error: locationError } = await supabase
          .from("locations")
          .insert([formData])
          .select()
          .single();

        if (locationError) {
          console.error("Error creating location:", locationError);
          toast.error("Failed to create location. Please try again.");
          return;
        }

        // Create services
        if (services.length > 0) {
          const servicesWithLocationId = services.map((service) => ({
            ...service,
            location_id: locationData.id,
          }));
          const { error: servicesError } = await supabase
            .from("location_services")
            .insert(servicesWithLocationId);

          if (servicesError) {
            console.error("Error creating services:", servicesError);
          }
        }

        // Create contacts
        if (contacts.length > 0) {
          const contactsWithLocationId = contacts.map((contact) => ({
            ...contact,
            location_id: locationData.id,
          }));
          const { error: contactsError } = await supabase
            .from("location_contacts")
            .insert(contactsWithLocationId);

          if (contactsError) {
            console.error("Error creating contacts:", contactsError);
          }
        }

        toast.success("Location created successfully!");
        setIsDialogOpen(false);
        window.location.reload();
      } else {
        // Update location
        const { error: locationError } = await supabase
          .from("locations")
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq("id", selectedLocation!.id);

        if (locationError) {
          console.error("Error updating location:", locationError);
          toast.error("Failed to update location. Please try again.");
          return;
        }

        // Delete existing services and contacts
        await supabase
          .from("location_services")
          .delete()
          .eq("location_id", selectedLocation!.id);
        await supabase
          .from("location_contacts")
          .delete()
          .eq("location_id", selectedLocation!.id);

        // Create new services
        if (services.length > 0) {
          const servicesWithLocationId = services.map((service) => ({
            ...service,
            location_id: selectedLocation!.id,
          }));
          const { error: servicesError } = await supabase
            .from("location_services")
            .insert(servicesWithLocationId);

          if (servicesError) {
            console.error("Error updating services:", servicesError);
          }
        }

        // Create new contacts
        if (contacts.length > 0) {
          const contactsWithLocationId = contacts.map((contact) => ({
            ...contact,
            location_id: selectedLocation!.id,
          }));
          const { error: contactsError } = await supabase
            .from("location_contacts")
            .insert(contactsWithLocationId);

          if (contactsError) {
            console.error("Error updating contacts:", contactsError);
          }
        }

        toast.success("Location updated successfully!");
        setIsDialogOpen(false);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error saving location:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteLocation = (location: Location) => {
    setSelectedLocation(location);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedLocation) return;

    setDeletingLocationId(selectedLocation.id);
    try {
      const { error } = await supabase
        .from("locations")
        .delete()
        .eq("id", selectedLocation.id);

      if (error) {
        console.error("Error deleting location:", error);
        toast.error("Failed to delete location. Please try again.");
      } else {
        toast.success("Location deleted successfully!");
        setIsDeleteDialogOpen(false);
        window.location.reload();
        setSelectedLocation(null);
      }
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setDeletingLocationId(null);
    }
  };

  // Service management functions
  const addService = () => {
    setServices([
      ...services,
      {
        day: "",
        time: "",
        type: "",
        service_location: "",
        description: "",
        is_active: true,
        sort_order: services.length + 1,
      },
    ]);
  };

  const updateService = (
    index: number,
    field: keyof LocationService,
    value: any
  ) => {
    const updatedServices = [...services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setServices(updatedServices);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // Contact management functions
  const addContact = () => {
    setContacts([
      ...contacts,
      {
        name: "",
        phone: "",
        email: "",
        role: "",
        is_primary: false,
        is_active: true,
        sort_order: contacts.length + 1,
      },
    ]);
  };

  const updateContact = (
    index: number,
    field: keyof LocationContact,
    value: any
  ) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setContacts(updatedContacts);
  };

  const removeContact = (index: number) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  return (
    <>
      {locations.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-indigo-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Locations Added Yet
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Add your church locations to display them on the website. You can
            include services, contact information, and addresses for each
            location.
          </p>
          <Button
            onClick={handleCreateLocation}
            className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add First Location
          </Button>
        </div>
      ) : filteredLocations.length === 0 ? (
        <div className="space-y-6">
          {/* Header Section with Toggle - Always Visible */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {showInactive ? "Inactive Locations" : "Locations Management"}
              </h2>
              <p className="text-gray-600 mt-1">
                {showInactive
                  ? `Viewing ${inactiveLocations.length} inactive location${
                      inactiveLocations.length !== 1 ? "s" : ""
                    }`
                  : `Manage ${activeLocations.length} active location${
                      activeLocations.length !== 1 ? "s" : ""
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
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    showInactive ? "bg-indigo-600" : "bg-gray-200"
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
                <span>{activeLocations.length} Active</span>
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>{inactiveLocations.length} Inactive</span>
              </div>
            </div>
          </div>

          {/* Empty State */}
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Archive className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              {showInactive ? "No Inactive Locations" : "No Active Locations"}
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              {showInactive
                ? "There are no inactive locations. Inactive locations will appear here once you deactivate them."
                : "There are no active locations. All locations have been deactivated."}
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full text-gray-700 text-sm font-medium">
              <Archive className="w-4 h-4" />
              <span>
                {showInactive ? "No inactive locations" : "No active locations"}
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
                {showInactive ? "Inactive Locations" : "Locations Management"}
              </h2>
              <p className="text-gray-600 mt-1">
                {showInactive
                  ? `Viewing ${inactiveLocations.length} inactive location${
                      inactiveLocations.length !== 1 ? "s" : ""
                    }`
                  : `Manage ${activeLocations.length} active location${
                      activeLocations.length !== 1 ? "s" : ""
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
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    showInactive ? "bg-indigo-600" : "bg-gray-200"
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
                <span>{activeLocations.length} Active</span>
                <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span>{inactiveLocations.length} Inactive</span>
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
                      Total Locations
                    </p>
                    <p className="text-3xl font-bold text-blue-900">
                      {locations.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">
                      Active Locations
                    </p>
                    <p className="text-3xl font-bold text-green-900">
                      {activeLocations.length}
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
                      Inactive Locations
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {inactiveLocations.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center">
                    <Archive className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add Location Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleCreateLocation}
              className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Location
            </Button>
          </div>

          {/* Locations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLocations.map((location) => (
              <motion.div
                key={location.id}
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
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {location.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {location.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(location.is_active)}
                      </div>
                    </div>

                    {/* Image */}
                    {location.image_url && (
                      <div className="mb-4">
                        <div className="w-full h-48 rounded-lg overflow-hidden border-2 border-gray-200">
                          <img
                            src={location.image_url}
                            alt={location.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4">
                      {location.phone && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span>{location.phone}</span>
                        </div>
                      )}
                      {location.email && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{location.email}</span>
                        </div>
                      )}
                      {location.website && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{location.website}</span>
                        </div>
                      )}
                    </div>

                    {/* Services Preview */}
                    {location.location_services &&
                      location.location_services.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">
                              Services
                            </span>
                          </div>
                          <div className="space-y-1">
                            {location.location_services
                              .slice(0, 3)
                              .map((service, index) => (
                                <div
                                  key={index}
                                  className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1"
                                >
                                  {service.day} - {service.time} ({service.type}
                                  )
                                </div>
                              ))}
                            {location.location_services.length > 3 && (
                              <div className="text-xs text-gray-500 italic">
                                +{location.location_services.length - 3} more
                                services
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Contacts Preview */}
                    {location.location_contacts &&
                      location.location_contacts.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Users className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-700">
                              Contacts
                            </span>
                          </div>
                          <div className="space-y-1">
                            {location.location_contacts
                              .slice(0, 2)
                              .map((contact, index) => (
                                <div
                                  key={index}
                                  className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1"
                                >
                                  {contact.name} ({contact.role})
                                </div>
                              ))}
                            {location.location_contacts.length > 2 && (
                              <div className="text-xs text-gray-500 italic">
                                +{location.location_contacts.length - 2} more
                                contacts
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                    {/* Description */}
                    {location.description && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 line-clamp-3 bg-gray-50 rounded-lg p-3">
                          {location.description}
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-500">
                        Updated {formatDate(location.updated_at)}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditLocation(location)}
                          className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                        >
                          <Edit className="w-3 h-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteLocation(location)}
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

      {/* Add/Edit Location Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              {isCreating ? "Add New Location" : "Edit Location"}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {isCreating
                ? "Add a new church location with services and contact information."
                : "Update the location's information and settings."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Location Name *
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter location name"
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Address *
                </Label>
                <Input
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter full address"
                  className="w-full"
                />
              </div>
            </div>

            {/* City and Postal Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  City
                </Label>
                <Input
                  value={formData.city || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  placeholder="Enter city"
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Postal Code
                </Label>
                <Input
                  value={formData.postal_code || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, postal_code: e.target.value })
                  }
                  placeholder="Enter postal code"
                  className="w-full"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Phone Number
                </Label>
                <Input
                  value={formData.phone || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="Enter phone number"
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Email Address
                </Label>
                <Input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter email address"
                  className="w-full"
                />
              </div>
            </div>

            {/* Website and Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Website
                </Label>
                <Input
                  value={formData.website || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  placeholder="Enter website URL"
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
                label="Location Image"
                placeholder="Upload a location image..."
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                Description
              </Label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe this location..."
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

            {/* Services Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-gray-700">
                  Services
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addService}
                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Service
                </Button>
              </div>

              {services.map((service, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">
                      Service {index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeService(index)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Day *
                      </Label>
                      <Input
                        value={service.day}
                        onChange={(e) =>
                          updateService(index, "day", e.target.value)
                        }
                        placeholder="e.g., Sunday, Monday"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Time *
                      </Label>
                      <Input
                        value={service.time}
                        onChange={(e) =>
                          updateService(index, "time", e.target.value)
                        }
                        placeholder="e.g., 10:00 AM"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Service Type *
                      </Label>
                      <Input
                        value={service.type}
                        onChange={(e) =>
                          updateService(index, "type", e.target.value)
                        }
                        placeholder="e.g., Sunday Service, Prayer Meeting"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Service Location
                      </Label>
                      <Input
                        value={service.service_location || ""}
                        onChange={(e) =>
                          updateService(
                            index,
                            "service_location",
                            e.target.value
                          )
                        }
                        placeholder="e.g., Main Hall, Prayer Room"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700">
                      Description
                    </Label>
                    <Textarea
                      value={service.description || ""}
                      onChange={(e) =>
                        updateService(index, "description", e.target.value)
                      }
                      placeholder="Describe this service..."
                      className="w-full"
                      rows={2}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id={`service-active-${index}`}
                      checked={service.is_active}
                      onCheckedChange={(checked) =>
                        updateService(index, "is_active", checked)
                      }
                    />
                    <Label htmlFor={`service-active-${index}`}>
                      Active Service
                    </Label>
                  </div>
                </div>
              ))}
            </div>

            {/* Contacts Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold text-gray-700">
                  Contacts
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addContact}
                  className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Contact
                </Button>
              </div>

              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-700">
                      Contact {index + 1}
                    </h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeContact(index)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Name *
                      </Label>
                      <Input
                        value={contact.name}
                        onChange={(e) =>
                          updateContact(index, "name", e.target.value)
                        }
                        placeholder="Enter contact name"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Role
                      </Label>
                      <Input
                        value={contact.role || ""}
                        onChange={(e) =>
                          updateContact(index, "role", e.target.value)
                        }
                        placeholder="e.g., Pastor, Administrator"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Phone Number
                      </Label>
                      <Input
                        value={contact.phone || ""}
                        onChange={(e) =>
                          updateContact(index, "phone", e.target.value)
                        }
                        placeholder="Enter phone number"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-700">
                        Email Address
                      </Label>
                      <Input
                        type="email"
                        value={contact.email || ""}
                        onChange={(e) =>
                          updateContact(index, "email", e.target.value)
                        }
                        placeholder="Enter email address"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`contact-primary-${index}`}
                        checked={contact.is_primary}
                        onCheckedChange={(checked) =>
                          updateContact(index, "is_primary", checked)
                        }
                      />
                      <Label htmlFor={`contact-primary-${index}`}>
                        Primary Contact
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id={`contact-active-${index}`}
                        checked={contact.is_active}
                        onCheckedChange={(checked) =>
                          updateContact(index, "is_active", checked)
                        }
                      />
                      <Label htmlFor={`contact-active-${index}`}>
                        Active Contact
                      </Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t-2">
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
                className="bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white px-8 font-semibold"
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
                      {isCreating ? "Create Location" : "Update Location"}
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
            <AlertDialogTitle>Delete Location</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{selectedLocation?.name}</strong>? This action cannot be
              undone and will permanently remove the location and all its
              associated services and contacts from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deletingLocationId !== null}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletingLocationId ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete Location"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
