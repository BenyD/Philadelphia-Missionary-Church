import type {
  Event,
  GalleryImage,
  Location,
  PrayerRequest,
  CreateEventRequest,
  UpdateEventRequest,
  CreateGalleryImageRequest,
  UpdateGalleryImageRequest,
  CreateLocationRequest,
  UpdateLocationRequest,
  CreatePrayerRequestRequest,
  UpdatePrayerRequestRequest,
  ApiResponse,
  EventsResponse,
  GalleryResponse,
  LocationsResponse,
  PrayerRequestsResponse
} from './types'

// =====================================================
// API CLIENT CONFIGURATION
// =====================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

// Error handling utility
class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Request utility
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new ApiError(
        errorData.error || `HTTP ${response.status}`,
        response.status,
        errorData
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(
      error instanceof Error ? error.message : 'Network error',
      0
    )
  }
}

// =====================================================
// EVENTS API CLIENT
// =====================================================

export const eventsClient = {
  // Get all events
  async getAll(filters?: { featured?: boolean; limit?: number }): Promise<Event[]> {
    const params = new URLSearchParams()
    if (filters?.featured !== undefined) {
      params.append('featured', filters.featured.toString())
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString())
    }

    const response = await apiRequest<EventsResponse>(`/api/events?${params}`)
    return response.events || []
  },

  // Get single event
  async getById(id: string): Promise<Event> {
    const response = await apiRequest<EventsResponse>(`/api/events/${id}`)
    if (!response.event) {
      throw new ApiError('Event not found', 404)
    }
    return response.event
  },

  // Create event
  async create(data: CreateEventRequest): Promise<Event> {
    const response = await apiRequest<EventsResponse>('/api/events', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.event) {
      throw new ApiError('Failed to create event', 500)
    }
    return response.event
  },

  // Update event
  async update(id: string, data: UpdateEventRequest): Promise<Event> {
    const response = await apiRequest<EventsResponse>(`/api/events/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    if (!response.event) {
      throw new ApiError('Failed to update event', 500)
    }
    return response.event
  },

  // Delete event
  async delete(id: string): Promise<void> {
    await apiRequest(`/api/events/${id}`, {
      method: 'DELETE',
    })
  }
}

// =====================================================
// GALLERY API CLIENT
// =====================================================

export const galleryClient = {
  // Get all images
  async getAll(filters?: { category?: string; limit?: number }): Promise<GalleryImage[]> {
    const params = new URLSearchParams()
    if (filters?.category) {
      params.append('category', filters.category)
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString())
    }

    const response = await apiRequest<GalleryResponse>(`/api/gallery?${params}`)
    return response.images || []
  },

  // Get single image
  async getById(id: string): Promise<GalleryImage> {
    const response = await apiRequest<GalleryResponse>(`/api/gallery/${id}`)
    if (!response.image) {
      throw new ApiError('Image not found', 404)
    }
    return response.image
  },

  // Create image
  async create(data: CreateGalleryImageRequest): Promise<GalleryImage> {
    const response = await apiRequest<GalleryResponse>('/api/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.image) {
      throw new ApiError('Failed to create image', 500)
    }
    return response.image
  },

  // Update image
  async update(id: string, data: UpdateGalleryImageRequest): Promise<GalleryImage> {
    const response = await apiRequest<GalleryResponse>(`/api/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    if (!response.image) {
      throw new ApiError('Failed to update image', 500)
    }
    return response.image
  },

  // Delete image
  async delete(id: string): Promise<void> {
    await apiRequest(`/api/gallery/${id}`, {
      method: 'DELETE',
    })
  }
}

// =====================================================
// LOCATIONS API CLIENT
// =====================================================

export const locationsClient = {
  // Get all locations
  async getAll(limit?: number): Promise<Location[]> {
    const params = new URLSearchParams()
    if (limit) {
      params.append('limit', limit.toString())
    }

    const response = await apiRequest<LocationsResponse>(`/api/locations?${params}`)
    return response.locations || []
  },

  // Get single location
  async getById(id: string): Promise<Location> {
    const response = await apiRequest<LocationsResponse>(`/api/locations/${id}`)
    if (!response.location) {
      throw new ApiError('Location not found', 404)
    }
    return response.location
  },

  // Create location
  async create(data: CreateLocationRequest): Promise<Location> {
    const response = await apiRequest<LocationsResponse>('/api/locations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.location) {
      throw new ApiError('Failed to create location', 500)
    }
    return response.location
  },

  // Update location
  async update(id: string, data: UpdateLocationRequest): Promise<Location> {
    const response = await apiRequest<LocationsResponse>(`/api/locations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    if (!response.location) {
      throw new ApiError('Failed to update location', 500)
    }
    return response.location
  },

  // Delete location
  async delete(id: string): Promise<void> {
    await apiRequest(`/api/locations/${id}`, {
      method: 'DELETE',
    })
  }
}

// =====================================================
// PRAYER REQUESTS API CLIENT
// =====================================================

export const prayerRequestsClient = {
  // Get all prayer requests
  async getAll(filters?: { status?: string; limit?: number }): Promise<PrayerRequest[]> {
    const params = new URLSearchParams()
    if (filters?.status) {
      params.append('status', filters.status)
    }
    if (filters?.limit) {
      params.append('limit', filters.limit.toString())
    }

    const response = await apiRequest<PrayerRequestsResponse>(`/api/prayer-requests?${params}`)
    return response.prayerRequests || []
  },

  // Get single prayer request
  async getById(id: string): Promise<PrayerRequest> {
    const response = await apiRequest<PrayerRequestsResponse>(`/api/prayer-requests/${id}`)
    if (!response.prayerRequest) {
      throw new ApiError('Prayer request not found', 404)
    }
    return response.prayerRequest
  },

  // Create prayer request (public endpoint)
  async create(data: CreatePrayerRequestRequest): Promise<PrayerRequest> {
    const response = await apiRequest<PrayerRequestsResponse>('/api/prayer-requests', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!response.prayerRequest) {
      throw new ApiError('Failed to create prayer request', 500)
    }
    return response.prayerRequest
  },

  // Update prayer request
  async update(id: string, data: UpdatePrayerRequestRequest): Promise<PrayerRequest> {
    const response = await apiRequest<PrayerRequestsResponse>(`/api/prayer-requests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    if (!response.prayerRequest) {
      throw new ApiError('Failed to update prayer request', 500)
    }
    return response.prayerRequest
  },

  // Delete prayer request
  async delete(id: string): Promise<void> {
    await apiRequest(`/api/prayer-requests/${id}`, {
      method: 'DELETE',
    })
  },

  // Send reply to prayer request
  async sendReply(requestId: string, replyData: { subject: string; message: string }): Promise<void> {
    await apiRequest('/api/send-reply', {
      method: 'POST',
      body: JSON.stringify({
        requestId,
        ...replyData,
      }),
    })
  }
}

// =====================================================
// LEGACY PRAYER REQUEST ENDPOINT (for backward compatibility)
// =====================================================

export const prayerRequestClient = {
  // Submit prayer request (legacy endpoint)
  async submit(data: CreatePrayerRequestRequest): Promise<ApiResponse> {
    return await apiRequest<ApiResponse>('/api/prayer-request', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

// =====================================================
// EXPORT ALL CLIENTS
// =====================================================

export {
  ApiError,
  apiRequest
}

// =====================================================
// USAGE EXAMPLES
// =====================================================

/*
// Example usage in components:

import { eventsClient, galleryClient, locationsClient, prayerRequestsClient } from '@/lib/api-client'

// Events
const events = await eventsClient.getAll({ featured: true, limit: 5 })
const event = await eventsClient.getById('event-id')
const newEvent = await eventsClient.create({ title: 'New Event', ... })

// Gallery
const images = await galleryClient.getAll({ category: 'Events' })
const image = await galleryClient.getById('image-id')

// Locations
const locations = await locationsClient.getAll()
const location = await locationsClient.getById('location-id')

// Prayer Requests
const requests = await prayerRequestsClient.getAll({ status: 'pending' })
const request = await prayerRequestsClient.getById('request-id')
await prayerRequestsClient.sendReply('request-id', { subject: 'Reply', message: 'Thank you' })

// Error handling
try {
  const events = await eventsClient.getAll()
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error ${error.status}: ${error.message}`)
  }
}
*/ 