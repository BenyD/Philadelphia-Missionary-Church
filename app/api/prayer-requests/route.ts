import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: NextRequest) {
  try {
    const { fullName, phoneNumber, email, prayerRequest } = await request.json();

    // Validate required fields
    if (!fullName || !email || !prayerRequest) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createAdminClient();

    // Insert the prayer request using admin client (bypasses RLS)
    const { data, error } = await supabase
      .from('prayer_requests')
      .insert([
        {
          full_name: fullName,
          phone_number: phoneNumber || null,
          email: email,
          prayer_request: prayerRequest,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to submit prayer request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data,
    });

  } catch (error) {
    console.error('Error submitting prayer request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 