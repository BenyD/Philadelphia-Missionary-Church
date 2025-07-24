export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  thumbnailUrl: string;
  altText?: string;
  tags?: string[];
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryCategory {
  id: string;
  name: string;
  description?: string;
  imageCount?: number;
}

export interface GalleryFilters {
  category?: string;
  tags?: string[];
  featured?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface GalleryResponse {
  success: boolean;
  data?: GalleryImage[];
  error?: string;
  total?: number;
  page?: number;
  limit?: number;
  categories?: GalleryCategory[];
}

export interface SingleImageResponse {
  success: boolean;
  data?: GalleryImage;
  error?: string;
}

export interface GalleryUploadResponse {
  success: boolean;
  data?: {
    id: string;
    imageUrl: string;
    thumbnailUrl: string;
  };
  error?: string;
}
