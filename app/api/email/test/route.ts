import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/email/service';
import { getFromAddress, getAdminEmail } from '@/lib/config/email';

export async function POST(request: NextRequest) {
  try {
    // Test data
    const testData = {
      name: 'Test User',
      email: getAdminEmail(), // Send to admin email for testing
      prayerRequest: 'This is a test prayer request to verify email functionality.',
      requestId: 'test-' + Date.now(),
    };

    console.log('Testing email configuration:');
    console.log('From address:', getFromAddress('noreply'));
    console.log('Admin email:', getAdminEmail());
    console.log('Resend API key exists:', !!process.env.RESEND_API_KEY);

    // Test sending admin notification
    const result = await EmailService.sendAdminNotification(testData);

    if (!result.success) {
      console.error('Email test failed:', result.error);
      return NextResponse.json(
        { 
          error: 'Email test failed', 
          details: result.error,
          config: {
            fromAddress: getFromAddress('noreply'),
            adminEmail: getAdminEmail(),
            hasApiKey: !!process.env.RESEND_API_KEY
          }
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully!',
      data: result.data,
      config: {
        fromAddress: getFromAddress('noreply'),
        adminEmail: getAdminEmail(),
        hasApiKey: !!process.env.RESEND_API_KEY
      }
    });

  } catch (error) {
    console.error('Error in email test:', error);
    return NextResponse.json(
      { 
        error: 'Email test failed', 
        details: error,
        config: {
          fromAddress: getFromAddress('noreply'),
          adminEmail: getAdminEmail(),
          hasApiKey: !!process.env.RESEND_API_KEY
        }
      },
      { status: 500 }
    );
  }
} 