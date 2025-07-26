import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch single prayer request by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Prayer request ID is required' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('prayer_requests')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Prayer request not found' },
          { status: 404 }
        )
      }
      console.error('Error fetching prayer request:', error)
      return NextResponse.json(
        { error: 'Failed to fetch prayer request' },
        { status: 500 }
      )
    }

    return NextResponse.json({ prayerRequest: data })
  } catch (error) {
    console.error('Error in prayer request GET:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT - Update prayer request by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: 'Prayer request ID is required' },
        { status: 400 }
      )
    }

    // Validate status if provided
    if (body.status && !['pending', 'in_progress', 'completed', 'replied'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be one of: pending, in_progress, completed, replied' },
        { status: 400 }
      )
    }

    // Build update object
    const updateData: any = {
      updated_at: new Date().toISOString()
    }

    // Add fields that can be updated
    if (body.status !== undefined) updateData.status = body.status
    if (body.admin_notes !== undefined) updateData.admin_notes = body.admin_notes
    if (body.reply_email !== undefined) updateData.reply_email = body.reply_email
    if (body.reply_subject !== undefined) updateData.reply_subject = body.reply_subject
    if (body.reply_message !== undefined) updateData.reply_message = body.reply_message

    // Update prayer request
    const { data, error } = await supabase
      .from('prayer_requests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Prayer request not found' },
          { status: 404 }
        )
      }
      console.error('Error updating prayer request:', error)
      return NextResponse.json(
        { error: 'Failed to update prayer request' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Prayer request updated successfully',
      prayerRequest: data
    })
  } catch (error) {
    console.error('Error in prayer request PUT:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE - Delete prayer request by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'Prayer request ID is required' },
        { status: 400 }
      )
    }

    // Check if prayer request exists first
    const { data: existingRequest, error: fetchError } = await supabase
      .from('prayer_requests')
      .select('id')
      .eq('id', id)
      .single()

    if (fetchError || !existingRequest) {
      return NextResponse.json(
        { error: 'Prayer request not found' },
        { status: 404 }
      )
    }

    // Delete prayer request
    const { error } = await supabase
      .from('prayer_requests')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting prayer request:', error)
      return NextResponse.json(
        { error: 'Failed to delete prayer request' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Prayer request deleted successfully'
    })
  } catch (error) {
    console.error('Error in prayer request DELETE:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 