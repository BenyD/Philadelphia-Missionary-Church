import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    // Test 1: Get all pastors (including inactive)
    const { data: allPastors, error: allError } = await supabase
      .from('pastors')
      .select('*')
      .order('sort_order', { ascending: true });

    if (allError) {
      console.error('Error fetching all pastors:', allError);
      return NextResponse.json(
        { error: 'Failed to fetch all pastors', details: allError.message },
        { status: 500 }
      );
    }

    // Test 2: Get only active pastors
    const { data: activePastors, error: activeError } = await supabase
      .from('pastors')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (activeError) {
      console.error('Error fetching active pastors:', activeError);
      return NextResponse.json(
        { error: 'Failed to fetch active pastors', details: activeError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      allPastors: allPastors || [],
      activePastors: activePastors || [],
      allCount: allPastors?.length || 0,
      activeCount: activePastors?.length || 0,
      message: 'Pastors API test completed successfully'
    });

  } catch (error) {
    console.error('Error in pastors test API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error },
      { status: 500 }
    );
  }
} 