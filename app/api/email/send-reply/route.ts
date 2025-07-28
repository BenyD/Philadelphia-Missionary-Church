import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { EmailService } from '@/lib/email/service';

export async function POST(request: NextRequest) {
  try {
    const { requestId, adminMessage, adminName } = await request.json();

    if (!requestId || !adminMessage || !adminName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createAdminClient();

    // Get the prayer request details
    const { data: prayerRequest, error: fetchError } = await supabase
      .from('prayer_requests')
      .select('*')
      .eq('id', requestId)
      .single();

    if (fetchError || !prayerRequest) {
      return NextResponse.json(
        { error: 'Prayer request not found' },
        { status: 404 }
      );
    }

    // Send the reply email
    const emailResult = await EmailService.sendReplyToUser({
      name: prayerRequest.full_name,
      email: prayerRequest.email,
      prayerRequest: prayerRequest.prayer_request,
      adminMessage,
      adminName,
      requestId: prayerRequest.id,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Update the prayer request with admin notes
    const { error: updateError } = await supabase
      .from('prayer_requests')
      .update({
        admin_notes: adminMessage,
        updated_at: new Date().toISOString(),
      })
      .eq('id', requestId);

    if (updateError) {
      console.error('Error updating prayer request:', updateError);
      // Don't fail the request if update fails, email was sent successfully
    }

    return NextResponse.json({
      success: true,
      message: 'Reply sent successfully',
    });

  } catch (error) {
    console.error('Error sending reply email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 