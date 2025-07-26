import { createClient } from '@supabase/supabase-js'
import type { 
  Event, 
  GalleryImage, 
  Location, 
  PrayerRequest, 
  AdminUser,
  PageView,
  AdminNotification,
  Setting
} from './types'

// Environment variables validation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
})

// =====================================================
// DATABASE TYPES (re-exported for convenience)
// =====================================================

export type {
  Event,
  GalleryImage,
  Location,
  PrayerRequest,
  AdminUser,
  PageView,
  AdminNotification,
  Setting
}

// =====================================================
// UTILITY FUNCTIONS
// =====================================================

// Error handling utility
export const handleSupabaseError = (error: any, context: string) => {
  console.error(`Supabase error in ${context}:`, error)
  
  if (error?.code === 'PGRST116') {
    return { error: 'Record not found' }
  }
  
  if (error?.code === '23505') {
    return { error: 'Duplicate entry' }
  }
  
  if (error?.code === '23503') {
    return { error: 'Referenced record does not exist' }
  }
  
  return { error: error?.message || 'An unexpected error occurred' }
}

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (!dateRegex.test(date)) return false
  
  const dateObj = new Date(date)
  return !isNaN(dateObj.getTime())
}

// =====================================================
// DATABASE OPERATIONS
// =====================================================

// Events
export const eventsApi = {
  async getAll(filters?: { featured?: boolean; limit?: number }) {
    let query = supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })

    if (filters?.featured !== undefined) {
      query = query.eq('is_featured', filters.featured)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Event[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Event
  },

  async create(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert([{
        ...event,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as Event
  },

  async update(id: string, event: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update({
        ...event,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Event
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Gallery Images
export const galleryApi = {
  async getAll(filters?: { category?: string; limit?: number }) {
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.category) {
      query = query.eq('category', filters.category)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data as GalleryImage[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as GalleryImage
  },

  async create(image: Omit<GalleryImage, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('gallery_images')
      .insert([{
        ...image,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as GalleryImage
  },

  async update(id: string, image: Partial<GalleryImage>) {
    const { data, error } = await supabase
      .from('gallery_images')
      .update(image)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as GalleryImage
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Locations
export const locationsApi = {
  async getAll(limit?: number) {
    let query = supabase
      .from('locations')
      .select('*')
      .order('name', { ascending: true })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Location[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('locations')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as Location
  },

  async create(location: Omit<Location, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('locations')
      .insert([{
        ...location,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as Location
  },

  async update(id: string, location: Partial<Location>) {
    const { data, error } = await supabase
      .from('locations')
      .update({
        ...location,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as Location
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('locations')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// Prayer Requests
export const prayerRequestsApi = {
  async getAll(filters?: { status?: string; limit?: number }) {
    let query = supabase
      .from('prayer_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data as PrayerRequest[]
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('prayer_requests')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data as PrayerRequest
  },

  async create(request: Omit<PrayerRequest, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('prayer_requests')
      .insert([{
        ...request,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()
    
    if (error) throw error
    return data as PrayerRequest
  },

  async update(id: string, request: Partial<PrayerRequest>) {
    const { data, error } = await supabase
      .from('prayer_requests')
      .update({
        ...request,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data as PrayerRequest
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('prayer_requests')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  }
}

// =====================================================
// STORAGE OPERATIONS
// =====================================================

export const storageApi = {
  async uploadImage(file: File, path: string) {
    const { data, error } = await supabase.storage
      .from('images')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })
    
    if (error) throw error
    return data
  },

  async getImageUrl(path: string) {
    const { data } = supabase.storage
      .from('images')
      .getPublicUrl(path)
    
    return data.publicUrl
  },

  async deleteImage(path: string) {
    const { error } = await supabase.storage
      .from('images')
      .remove([path])
    
    if (error) throw error
    return true
  }
} 