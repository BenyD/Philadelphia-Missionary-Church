import { NextRequest, NextResponse } from "next/server";

interface PrayerRequestData {
  fullName: string;
  phoneNumber?: string;
  email: string;
  prayerRequest: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: PrayerRequestData = await request.json();

    // Validate required fields
    if (!body.fullName || !body.email || !body.prayerRequest) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // TODO: Implement actual email sending logic here
    // For now, we'll simulate processing the request
    console.log("Prayer Request Received:", {
      fullName: body.fullName,
      email: body.email,
      phoneNumber: body.phoneNumber || "Not provided",
      prayerRequest: body.prayerRequest,
      timestamp: new Date().toISOString(),
    });

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // TODO: Send email notification to prayer team
    // Example implementation with Resend or similar service:
    /*
    import { Resend } from 'resend';
    
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'prayer-team@pmc-church.com',
      to: ['prayer-team@pmc-church.com'],
      subject: 'New Prayer Request',
      html: `
        <h2>New Prayer Request</h2>
        <p><strong>Name:</strong> ${body.fullName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phoneNumber || 'Not provided'}</p>
        <p><strong>Prayer Request:</strong></p>
        <p>${body.prayerRequest}</p>
      `
    });
    */

    return NextResponse.json(
      { 
        message: "Prayer request submitted successfully",
        success: true 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing prayer request:", error);
    return NextResponse.json(
      { 
        error: "Internal server error",
        success: false 
      },
      { status: 500 }
    );
  }
} 