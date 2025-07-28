"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  Eye,
  Edit,
  Plus,
  Trash2,
  Clock,
  MapPin,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  is_featured: boolean;
  status: "active" | "cancelled" | "postponed";
  created_at: string;
  updated_at: string;
}

interface EventsTableProps {
  events: Event[];
}

export function EventsTable({ events }: EventsTableProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [deletingEventId, setDeletingEventId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: undefined as Date | undefined,
    time: "",
    location: "",
    is_featured: false,
    status: "active" as "active" | "cancelled" | "postponed",
  });
  const supabase = createClient();

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
      postponed: {
        color: "bg-yellow-100 text-yellow-800",
        icon: AlertTriangle,
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    const IconComponent = config.icon;

    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.toUpperCase()}
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

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDateForInput = (dateString: string): Date | undefined => {
    // Convert string date to Date object for calendar
    if (!dateString) return undefined;
    return new Date(dateString);
  };

  const handleCreateEvent = () => {
    setIsCreating(true);
    setFormData({
      title: "",
      description: "",
      date: undefined,
      time: "",
      location: "",
      is_featured: false,
      status: "active",
    });
    setIsDialogOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: formatDateForInput(event.date),
      time: event.time,
      location: event.location,
      is_featured: event.is_featured,
      status: event.status,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (!formData.title.trim()) {
      toast.error("Please enter an event title.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Please enter an event description.");
      return;
    }
    if (!formData.date) {
      toast.error("Please select an event date.");
      return;
    }
    if (!formData.time) {
      toast.error("Please select an event time.");
      return;
    }
    if (!formData.location.trim()) {
      toast.error("Please enter an event location.");
      return;
    }

    if (isCreating) {
      await createEvent();
    } else {
      await updateEvent();
    }
  };

  const createEvent = async () => {
    setIsUpdating(true);
    try {
      console.log("Creating event with data:", formData);

      // Convert Date object to YYYY-MM-DD string format for database
      const eventData = {
        ...formData,
        date: formData.date ? formData.date.toISOString().split("T")[0] : "",
      };

      console.log("Formatted event data:", eventData);

      const { error } = await supabase.from("events").insert([eventData]);

      if (error) {
        console.error("Error creating event:", error);
        toast.error("Failed to create event. Please try again.");
      } else {
        console.log("Event created successfully");
        toast.success("Event created successfully!");
        setIsDialogOpen(false);
        // Reset form data
        setFormData({
          title: "",
          description: "",
          date: undefined,
          time: "",
          location: "",
          is_featured: false,
          status: "active" as "active" | "cancelled" | "postponed",
        });
        // Refresh the page to show the new event
        window.location.reload();
      }
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const updateEvent = async () => {
    if (!selectedEvent) return;

    setIsUpdating(true);
    try {
      console.log("Updating event with data:", formData);
      console.log("Event ID:", selectedEvent.id);

      // Convert Date object to YYYY-MM-DD string format for database
      const eventData = {
        ...formData,
        date: formData.date ? formData.date.toISOString().split("T")[0] : "",
      };

      console.log("Formatted event data:", eventData);

      const { error } = await supabase
        .from("events")
        .update(eventData)
        .eq("id", selectedEvent.id);

      if (error) {
        console.error("Error updating event:", error);
        toast.error("Failed to update event. Please try again.");
      } else {
        console.log("Event updated successfully");
        toast.success("Event updated successfully!");
        setIsDialogOpen(false);
        // Reset selected event
        setSelectedEvent(null);
        // Refresh the page to show the updated event
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating event:", error);
      toast.error("Failed to update event. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteEvent = (event: Event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!eventToDelete) return;

    setDeletingEventId(eventToDelete.id);
    try {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventToDelete.id);

      if (error) {
        console.error("Error deleting event:", error);
        toast.error("Failed to delete event. Please try again.");
      } else {
        toast.success("Event deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    } finally {
      setDeletingEventId(null);
      setDeleteDialogOpen(false);
      setEventToDelete(null);
    }
  };

  if (events.length === 0) {
    return (
      <>
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gradient-to-br from-red-50 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarIcon className="w-10 h-10 text-red-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Events Found
          </h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Get started by creating your first church event. Add services,
            meetings, and special activities to keep your community informed.
          </p>
          <Button
            onClick={handleCreateEvent}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Event
          </Button>
        </div>

        {/* Create/Edit Event Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isCreating ? "Create New Event" : "Edit Event"}
              </DialogTitle>
              <DialogDescription>
                {isCreating
                  ? "Add a new event to your church calendar."
                  : "Update the event details."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Event Title */}
              <div>
                <Label htmlFor="title">Event Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter event title"
                />
              </div>

              {/* Event Description */}
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? (
                          format(formData.date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => {
                          setFormData({ ...formData, date });
                          setCalendarOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) =>
                      setFormData({ ...formData, time: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  placeholder="Enter event location"
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
                  <Label htmlFor="featured">Featured Event</Label>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(
                      value: "active" | "cancelled" | "postponed"
                    ) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="postponed">Postponed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isUpdating}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
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
                        {isCreating ? "Create Event" : "Update Event"}
                      </span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                event and remove it from your church calendar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                disabled={deletingEventId !== null}
                className="bg-red-600 hover:bg-red-700"
              >
                {deletingEventId ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Deleting...</span>
                  </div>
                ) : (
                  "Delete Event"
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Events Management
            </h2>
            <p className="text-gray-600 mt-1">
              Manage {events.length} event{events.length !== 1 ? "s" : ""} in
              your church calendar
            </p>
          </div>
          <Button
            onClick={handleCreateEvent}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">
                  Total Events
                </p>
                <p className="text-2xl font-bold text-blue-900">
                  {events.length}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">
                  Active Events
                </p>
                <p className="text-2xl font-bold text-green-900">
                  {events.filter((e) => e.status === "active").length}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-yellow-600">
                  Featured Events
                </p>
                <p className="text-2xl font-bold text-yellow-900">
                  {events.filter((e) => e.is_featured).length}
                </p>
              </div>
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="group hover:shadow-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 transition-all duration-300">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(event.status)}
                      {event.is_featured && (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarIcon className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">Date:</span>
                      <span>{formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Time:</span>
                      <span>{formatTime(event.time)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">Location:</span>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      Updated {formatDate(event.updated_at)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditEvent(event)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteEvent(event)}
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

      {/* Create/Edit Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreating ? "Create New Event" : "Edit Event"}
            </DialogTitle>
            <DialogDescription>
              {isCreating
                ? "Add a new event to your church calendar."
                : "Update the event details."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Event Title */}
            <div>
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter event title"
              />
            </div>

            {/* Event Description */}
            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Enter event description"
                rows={3}
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date *</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? (
                        format(formData.date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => {
                        setFormData({ ...formData, date });
                        setCalendarOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Enter event location"
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
                <Label htmlFor="featured">Featured Event</Label>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(
                    value: "active" | "cancelled" | "postponed"
                  ) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="postponed">Postponed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isUpdating}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>{isCreating ? "Create Event" : "Update Event"}</span>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event and remove it from your church calendar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deletingEventId !== null}
              className="bg-red-600 hover:bg-red-700"
            >
              {deletingEventId ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Deleting...</span>
                </div>
              ) : (
                "Delete Event"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
