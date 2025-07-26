import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch single gallery image by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Image not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching image:', error)
      return NextResponse.json(
        { error: 'Failed to fetch image' },
        { status: 500 }
      )
    }

    return NextResponse.json({ image: data })
  } catch (error) {
    console.error('Error in gallery image GET:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update gallery image by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }

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

    // Update gallery image
    const { data, error } = await supabase
      .from('gallery_images')
      .update({
        title: title.trim(),
        description: body.description?.trim() || null,
        image_url: image_url.trim(),
        category: category.trim()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Image not found' },
          { status: 404 }
        )
      }
      console.error('Error updating image:', error)
      return NextResponse.json(
        { error: 'Failed to update image' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Image updated successfully',
      image: data
    })
  } catch (error) {
    console.error('Error in gallery image PUT:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete gallery image by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }

    // Check if image exists first
    const { data: existingImage, error: fetchError } = await supabase
      .from('gallery_images')
      .select('id, image_url')
      .eq('id', id)
      .single()

    if (fetchError || !existingImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    // Delete image from storage if it's a Supabase storage URL
    if (existingImage.image_url.includes('supabase.co')) {
      try {
        const urlParts = existingImage.image_url.split('/')
        const filePath = urlParts.slice(-2).join('/')
        
        await supabase.storage
          .from('images')
          .remove([filePath])
      } catch (storageError) {
        console.warn('Failed to delete image from storage:', storageError)
        // Continue with database deletion even if storage deletion fails
      }
    }

    // Delete from database
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting image:', error)
      return NextResponse.json(
        { error: 'Failed to delete image' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Image deleted successfully'
    })
  } catch (error) {
    console.error('Error in gallery image DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 