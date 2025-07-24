// Export all interfaces for easy importing
export * from "./events";
export * from "./gallery";
export * from "./locations";
export * from "./prayer-request";

// Common API response interface
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

// Common pagination interface
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// Common filter interface
export interface BaseFilters {
  search?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  isActive?: boolean;
}
