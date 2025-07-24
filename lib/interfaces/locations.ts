export interface ChurchLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  canton: string;
  postalCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  locationId: string;
  day: string;
  time: string;
  type: string;
  location?: string;
  description?: string;
  isActive: boolean;
}

export interface Pastor {
  id: string;
  name: string;
  title: string;
  phone: string;
  email?: string;
  imageUrl?: string;
  bio?: string;
  locationId: string;
  isActive: boolean;
}

export interface LocationWithDetails extends ChurchLocation {
  services: Service[];
  pastor: Pastor;
}

export interface LocationFilters {
  canton?: string;
  city?: string;
  hasService?: string; // day of week
  isActive?: boolean;
}

export interface LocationResponse {
  success: boolean;
  data?: ChurchLocation[];
  error?: string;
  total?: number;
}

export interface SingleLocationResponse {
  success: boolean;
  data?: LocationWithDetails;
  error?: string;
}

export interface LocationStats {
  totalLocations: number;
  totalBelievers: number;
  activeServices: number;
  cantons: string[];
}
