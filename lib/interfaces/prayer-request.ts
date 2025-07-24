export interface PrayerRequest {
  id: string;
  fullName: string;
  phoneNumber?: string;
  email: string;
  prayerRequest: string;
  status: "pending" | "in-progress" | "completed" | "archived";
  isAnonymous: boolean;
  isUrgent: boolean;
  category?: string;
  tags?: string[];
  assignedTo?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrayerRequestFormData {
  fullName: string;
  phoneNumber?: string;
  email: string;
  prayerRequest: string;
  isAnonymous?: boolean;
  isUrgent?: boolean;
  category?: string;
}

export interface PrayerRequestFilters {
  status?: string;
  category?: string;
  isUrgent?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
  assignedTo?: string;
}

export interface PrayerRequestResponse {
  success: boolean;
  data?: PrayerRequest;
  error?: string;
  message?: string;
}

export interface PrayerRequestsListResponse {
  success: boolean;
  data?: PrayerRequest[];
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface PrayerRequestCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface PrayerRequestStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  urgent: number;
  thisWeek: number;
  thisMonth: number;
}

export interface PrayerRequestUpdate {
  status?: string;
  assignedTo?: string;
  notes?: string;
  tags?: string[];
}
