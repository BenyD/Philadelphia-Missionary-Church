import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    const supabase = await createClient();

    let query = supabase
      .from('locations')
      .select(`
        *,
        location_services (
          id,
          day,
          time,
          type,
          service_location,
          description,
          is_active,
          sort_order
        ),
        location_contacts (
          id,
          name,
          phone,
          email,
          role,
          is_primary,
          is_active,
          sort_order
        )
      `)
      .order('sort_order', { ascending: true });

    // If active parameter is provided, filter by active status
    if (active !== null) {
      const isActive = active === 'true';
      query = query.eq('is_active', isActive);
    } else {
      // Default to only active locations for public API
      query = query.eq('is_active', true);
    }

    const { data: locations, error } = await query;

    if (error) {
      console.error('Error fetching locations:', error);
      return NextResponse.json(
        { error: 'Failed to fetch locations', details: error.message },
        { status: 500 }
      );
    }

    // Transform the data to match the expected format
    const transformedLocations = locations?.map(location => ({
      id: location.id,
      name: location.name,
      address: location.address,
      services: location.location_services
        ?.filter((service: any) => service.is_active)
        ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
        ?.map((service: any) => ({
          day: service.day,
          time: service.time,
          type: service.type,
          location: service.service_location,
          description: service.description
        })) || [],
      contacts: location.location_contacts
        ?.filter((contact: any) => contact.is_active)
        ?.sort((a: any, b: any) => a.sort_order - b.sort_order)
        ?.map((contact: any) => ({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          role: contact.role
        })) || [],
      image: location.image_url,
      city: location.city,
      postal_code: location.postal_code,
      country: location.country,
      phone: location.phone,
      email: location.email,
      website: location.website,
      google_maps_url: location.google_maps_url,
      description: location.description
    })) || [];

    return NextResponse.json({
      locations: transformedLocations,
      count: transformedLocations.length,
    });

  } catch (error) {
    console.error('Error in locations API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 