"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { supabase, Location } from "@/lib/supabase";
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
  MapPin,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  Clock,
  Phone,
  User,
  Calendar,
} from "lucide-react";
import { toast } from "sonner";

export default function LocationsManagement() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [locations, setLocations] = useState<Location[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    services: [{ day: "", time: "", type: "", location: "" }],
    contacts: [{ name: "", phone: "", role: "" }],
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchLocations();
    }
  }, [user]);

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from("locations")
        .select("*")
        .order("name", { ascending: true });

      if (error) throw error;
      setLocations(data || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast.error("Failed to load locations");
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingLocation) {
        const { error } = await supabase
          .from("locations")
          .update({
            name: formData.name,
            address: formData.address,
            services: formData.services.filter(
              (s) => s.day && s.time && s.type
            ),
            contacts: formData.contacts.filter((c) => c.name && c.phone),
            updated_at: new Date().toISOString(),
          })
          .eq("id", editingLocation.id);

        if (error) throw error;
        toast.success("Location updated successfully");
      } else {
        const { error } = await supabase.from("locations").insert([
          {
            name: formData.name,
            address: formData.address,
            services: formData.services.filter(
              (s) => s.day && s.time && s.type
            ),
            contacts: formData.contacts.filter((c) => c.name && c.phone),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        if (error) throw error;
        toast.success("Location created successfully");
      }

      setShowForm(false);
      setEditingLocation(null);
      resetForm();
      fetchLocations();
    } catch (error) {
      console.error("Error saving location:", error);
      toast.error("Failed to save location");
    }
  };

  const handleDelete = async (locationId: string) => {
    if (!confirm("Are you sure you want to delete this location?")) return;

    try {
      const { error } = await supabase
        .from("locations")
        .delete()
        .eq("id", locationId);

      if (error) throw error;
      toast.success("Location deleted successfully");
      fetchLocations();
    } catch (error) {
      console.error("Error deleting location:", error);
      toast.error("Failed to delete location");
    }
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      address: location.address,
      services:
        location.services.length > 0
          ? location.services
          : [{ day: "", time: "", type: "", location: "" }],
      contacts:
        location.contacts.length > 0
          ? location.contacts
          : [{ name: "", phone: "", role: "" }],
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      address: "",
      services: [{ day: "", time: "", type: "", location: "" }],
      contacts: [{ name: "", phone: "", role: "" }],
    });
  };

  const addService = () => {
    setFormData({
      ...formData,
      services: [
        ...formData.services,
        { day: "", time: "", type: "", location: "" },
      ],
    });
  };

  const removeService = (index: number) => {
    setFormData({
      ...formData,
      services: formData.services.filter((_, i) => i !== index),
    });
  };

  const updateService = (index: number, field: string, value: string) => {
    const updatedServices = [...formData.services];
    updatedServices[index] = { ...updatedServices[index], [field]: value };
    setFormData({ ...formData, services: updatedServices });
  };

  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [...formData.contacts, { name: "", phone: "", role: "" }],
    });
  };

  const removeContact = (index: number) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.filter((_, i) => i !== index),
    });
  };

  const updateContact = (index: number, field: string, value: string) => {
    const updatedContacts = [...formData.contacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setFormData({ ...formData, contacts: updatedContacts });
  };

  if (loading || loadingLocations) {
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
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Locations Management
                </h1>
                <p className="text-sm text-gray-500">
                  Manage church locations and services
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setShowForm(true);
                setEditingLocation(null);
                resetForm();
              }}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>
                  {editingLocation ? "Edit Location" : "Add New Location"}
                </CardTitle>
                <CardDescription>
                  {editingLocation
                    ? "Update location details"
                    : "Add a new church location"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Location Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g., PMC Bern"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="Full address"
                        required
                      />
                    </div>
                  </div>

                  {/* Services Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <Label className="text-base font-medium">Services</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addService}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Service
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {formData.services.map((service, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg"
                        >
                          <div>
                            <Label>Day</Label>
                            <Input
                              value={service.day}
                              onChange={(e) =>
                                updateService(index, "day", e.target.value)
                              }
                              placeholder="e.g., Sunday"
                            />
                          </div>
                          <div>
                            <Label>Time</Label>
                            <Input
                              value={service.time}
                              onChange={(e) =>
                                updateService(index, "time", e.target.value)
                              }
                              placeholder="e.g., 09:30 - 12:30"
                            />
                          </div>
                          <div>
                            <Label>Type</Label>
                            <Input
                              value={service.type}
                              onChange={(e) =>
                                updateService(index, "type", e.target.value)
                              }
                              placeholder="e.g., Sunday Service"
                            />
                          </div>
                          <div className="flex items-end space-x-2">
                            <div className="flex-1">
                              <Label>Location</Label>
                              <Input
                                value={service.location}
                                onChange={(e) =>
                                  updateService(
                                    index,
                                    "location",
                                    e.target.value
                                  )
                                }
                                placeholder="e.g., @PMC Bern"
                              />
                            </div>
                            {formData.services.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeService(index)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contacts Section */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <Label className="text-base font-medium">Contacts</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addContact}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Contact
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {formData.contacts.map((contact, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg"
                        >
                          <div>
                            <Label>Name</Label>
                            <Input
                              value={contact.name}
                              onChange={(e) =>
                                updateContact(index, "name", e.target.value)
                              }
                              placeholder="e.g., Pastor Joshua"
                            />
                          </div>
                          <div>
                            <Label>Phone</Label>
                            <Input
                              value={contact.phone}
                              onChange={(e) =>
                                updateContact(index, "phone", e.target.value)
                              }
                              placeholder="e.g., 079 375 68 32"
                            />
                          </div>
                          <div className="flex items-end space-x-2">
                            <div className="flex-1">
                              <Label>Role (Optional)</Label>
                              <Input
                                value={contact.role}
                                onChange={(e) =>
                                  updateContact(index, "role", e.target.value)
                                }
                                placeholder="e.g., Pastor"
                              />
                            </div>
                            {formData.contacts.length > 1 && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => removeContact(index)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingLocation(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingLocation ? "Update Location" : "Create Location"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {locations.map((location) => (
            <Card
              key={location.id}
              className="bg-white shadow-sm border-gray-200"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-purple-500" />
                      {location.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {location.address}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(location)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(location.id)}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Services */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Services
                    </h4>
                    <div className="space-y-2">
                      {location.services.map((service, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <Clock className="h-3 w-3 text-gray-500" />
                          <span className="font-medium">{service.day}</span>
                          <span>{service.time}</span>
                          <span className="text-gray-500">-</span>
                          <span>{service.type}</span>
                          {service.location && (
                            <span className="text-gray-500">
                              ({service.location})
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contacts */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contacts
                    </h4>
                    <div className="space-y-2">
                      {location.contacts.map((contact, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="font-medium">{contact.name}</span>
                          {contact.role && (
                            <span className="text-gray-500">
                              ({contact.role})
                            </span>
                          )}
                          <span className="text-gray-500">-</span>
                          <span>{contact.phone}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {locations.length === 0 && !loadingLocations && (
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No locations yet
            </h3>
            <p className="text-gray-600 mb-4">
              Add your first church location to get started
            </p>
            <Button
              onClick={() => {
                setShowForm(true);
                setEditingLocation(null);
                resetForm();
              }}
              className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add First Location
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
