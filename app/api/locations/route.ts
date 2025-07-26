import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET - Fetch all locations
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit')
    
    let query = supabase
      .from('locations')
      .select('*')
      .order('name', { ascending: true })

    // Apply limit if specified
    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching locations:', error)
      return NextResponse.json(
        { error: 'Failed to fetch locations' },
        { status: 500 }
      )
    }

    return NextResponse.json({ locations: data || [] })
  } catch (error) {
    console.error('Error in locations GET:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create new location
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { name, address, services, contacts } = body
    
    if (!name || !address) {
      return NextResponse.json(
        { error: 'Missing required fields: name, address' },
        { status: 400 }
      )
    }

    // Validate services array
    if (!Array.isArray(services)) {
      return NextResponse.json(
        { error: 'Services must be an array' },
        { status: 400 }
      )
    }

    // Validate contacts array
    if (!Array.isArray(contacts)) {
      return NextResponse.json(
        { error: 'Contacts must be an array' },
        { status: 400 }
      )
    }

    // Validate service objects
    for (const service of services) {
      if (!service.day || !service.time || !service.type) {
        return NextResponse.json(
          { error: 'Each service must have day, time, and type fields' },
          { status: 400 }
        )
      }
    }

    // Validate contact objects
    for (const contact of contacts) {
      if (!contact.name || !contact.phone) {
        return NextResponse.json(
          { error: 'Each contact must have name and phone fields' },
          { status: 400 }
        )
      }
    }

    // Create location
    const { data, error } = await supabase
      .from('locations')
      .insert([{
        name: name.trim(),
        address: address.trim(),
        services: services.filter(s => s.day && s.time && s.type),
        contacts: contacts.filter(c => c.name && c.phone),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) {
      console.error('Error creating location:', error)
      return NextResponse.json(
        { error: 'Failed to create location' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Location created successfully',
        location: data 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in locations POST:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 