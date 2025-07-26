import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch all gallery images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    
    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by category if specified
    if (category) {
      query = query.eq('category', category)
    }

    // Apply limit if specified
    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching gallery images:', error)
      return NextResponse.json(
        { error: 'Failed to fetch gallery images' },
        { status: 500 }
      )
    }

    return NextResponse.json({ images: data || [] })
  } catch (error) {
    console.error('Error in gallery GET:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new gallery image
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { title, image_url, category } = body
    
    if (!title || !image_url || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, image_url, category' },
        { status: 400 }
      )
    }

    // Validate image URL format
    const urlRegex = /^https?:\/\/.+/
    if (!urlRegex.test(image_url)) {
      return NextResponse.json(
        { error: 'Invalid image URL format' },
        { status: 400 }
      )
    }

    // Create gallery image
    const { data, error } = await supabase
      .from('gallery_images')
      .insert([{
        title: title.trim(),
        description: body.description?.trim() || null,
        image_url: image_url.trim(),
        category: category.trim(),
        created_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating gallery image:', error)
      return NextResponse.json(
        { error: 'Failed to create gallery image' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Gallery image created successfully',
        image: data 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in gallery POST:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 