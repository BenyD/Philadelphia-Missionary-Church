import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email/service';

export async function POST(request: NextRequest) {
  try {
    const { name, email, prayerRequest, requestId } = await request.json();

    if (!name || !email || !prayerRequest || !requestId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await EmailService.sendUserConfirmation({
      name,
      email,
      prayerRequest,
      requestId,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: 'Failed to send confirmation email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Confirmation email sent successfully',
    });

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 