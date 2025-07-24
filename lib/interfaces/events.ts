export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  isUpcoming: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EventCategory {
  id: string;
  name: string;
  description?: string;
  color?: string;
}

export interface EventFilters {
  category?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  location?: string;
  isUpcoming?: boolean;
}

export interface EventResponse {
  success: boolean;
  data?: Event[];
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface SingleEventResponse {
  success: boolean;
  data?: Event;
  error?: string;
}
