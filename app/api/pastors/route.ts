import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');

    const supabase = await createClient();

    let query = supabase
      .from('pastors')
      .select('*')
      .order('sort_order', { ascending: true });

    // If active parameter is provided, filter by active status
    if (active !== null) {
      const isActive = active === 'true';
      query = query.eq('is_active', isActive);
    } else {
      // Default to only active pastors for public API
      query = query.eq('is_active', true);
    }

    const { data: pastors, error } = await query;

    if (error) {
      console.error('Error fetching pastors:', error);
      return NextResponse.json(
        { error: 'Failed to fetch pastors', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      pastors: pastors || [],
      count: pastors?.length || 0,
    });

  } catch (error) {
    console.error('Error in pastors API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 