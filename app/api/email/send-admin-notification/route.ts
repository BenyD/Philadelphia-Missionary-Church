import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email/service';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, prayerRequest, requestId } = await request.json();

    if (!name || !email || !prayerRequest || !requestId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await EmailService.sendAdminNotification({
      name,
      email,
      phone,
      prayerRequest,
      requestId,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send admin notification' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Admin notification sent successfully',
    });

  } catch (error) {
    console.error('Error sending admin notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 