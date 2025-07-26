// =====================================================
// DATABASE TYPES (from Supabase)
// =====================================================

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  created_at: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  services: {
    day: string;
    time: string;
    type: string;
    location?: string;
  }[];
  contacts: {
    name: string;
    phone: string;
    role?: string;
  }[];
  created_at: string;
  updated_at: string;
}

export interface PrayerRequest {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  prayer_request: string;
  status: "pending" | "in_progress" | "completed" | "replied";
  admin_notes?: string;
  reply_email?: string;
  reply_subject?: string;
  reply_message?: string;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  role: "admin" | "super_admin";
  created_at: string;
}

// Analytics and additional tables
export interface PageView {
  id: string;
  page_path: string;
  user_agent?: string;
  ip_address?: string;
  referrer?: string;
  session_id?: string;
  created_at: string;
}

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  is_read: boolean;
  admin_user_id: string;
  created_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: any;
  description?: string;
  created_at: string;
  updated_at: string;
}

// =====================================================
// API REQUEST TYPES
// =====================================================

// Events
export interface CreateEventRequest {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
  is_featured?: boolean;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id: string;
}

// Gallery
export interface CreateGalleryImageRequest {
  title: string;
  description?: string;
  image_url: string;
  category: string;
}

export interface UpdateGalleryImageRequest
  extends Partial<CreateGalleryImageRequest> {
  id: string;
}

// Locations
export interface LocationService {
  day: string;
  time: string;
  type: string;
  location?: string;
}

export interface LocationContact {
  name: string;
  phone: string;
  role?: string;
}

export interface CreateLocationRequest {
  name: string;
  address: string;
  services: LocationService[];
  contacts: LocationContact[];
}

export interface UpdateLocationRequest extends Partial<CreateLocationRequest> {
  id: string;
}

// Prayer Requests
export interface CreatePrayerRequestRequest {
  fullName: string;
  email: string;
  phoneNumber?: string;
  prayerRequest: string;
}

export interface UpdatePrayerRequestRequest {
  id: string;
  status?: PrayerRequest["status"];
  admin_notes?: string;
  reply_email?: string;
  reply_subject?: string;
  reply_message?: string;
}

// =====================================================
// API RESPONSE TYPES
// =====================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface EventsResponse extends ApiResponse {
  events?: Event[];
  event?: Event;
}

export interface GalleryResponse extends ApiResponse {
  images?: GalleryImage[];
  image?: GalleryImage;
}

export interface LocationsResponse extends ApiResponse {
  locations?: Location[];
  location?: Location;
}

export interface PrayerRequestsResponse extends ApiResponse {
  prayerRequests?: PrayerRequest[];
  prayerRequest?: PrayerRequest;
}

// =====================================================
// FORM TYPES
// =====================================================

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  is_featured: boolean;
}

export interface GalleryFormData {
  title: string;
  description: string;
  category: string;
  image_url: string;
}

export interface LocationFormData {
  name: string;
  address: string;
  services: LocationService[];
  contacts: LocationContact[];
}

export interface PrayerRequestFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  prayerRequest: string;
}

export interface ReplyFormData {
  subject: string;
  message: string;
}

// =====================================================
// AUTH TYPES
// =====================================================

export interface AuthContextType {
  user: any | null;
  session: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

// =====================================================
// COMPONENT PROPS TYPES
// =====================================================

export interface EventCardProps {
  event: Event;
  onEdit?: (event: Event) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export interface GalleryImageCardProps {
  image: GalleryImage;
  onEdit?: (image: GalleryImage) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export interface LocationCardProps {
  location: Location;
  onEdit?: (location: Location) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

export interface PrayerRequestCardProps {
  prayerRequest: PrayerRequest;
  onUpdateStatus?: (id: string, status: PrayerRequest["status"]) => void;
  onReply?: (prayerRequest: PrayerRequest) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
}

// =====================================================
// UTILITY TYPES
// =====================================================

export type StatusType = "pending" | "in_progress" | "completed" | "replied";

export type NotificationType = "info" | "success" | "warning" | "error";

export type AdminRole = "admin" | "super_admin";

// =====================================================
// ENUM TYPES
// =====================================================

export enum EventStatus {
  UPCOMING = "upcoming",
  ONGOING = "ongoing",
  PAST = "past",
}

export enum PrayerRequestStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  REPLIED = "replied",
}

export enum NotificationTypeEnum {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
}

// =====================================================
// CONSTANTS
// =====================================================

export const PRAYER_REQUEST_STATUSES: Record<StatusType, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  replied: "Replied",
};

export const NOTIFICATION_TYPES: Record<NotificationType, string> = {
  info: "Information",
  success: "Success",
  warning: "Warning",
  error: "Error",
};

export const ADMIN_ROLES: Record<AdminRole, string> = {
  admin: "Admin",
  super_admin: "Super Admin",
};
