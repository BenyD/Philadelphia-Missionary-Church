import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    // Save prayer request to Supabase
    const { error } = await supabase
      .from('prayer_requests')
      .insert([{
        full_name: body.fullName,
        email: body.email,
        phone: body.phoneNumber || null,
        prayer_request: body.prayerRequest,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);

    if (error) {
      console.error("Error saving prayer request:", error);
      return NextResponse.json(
        { error: "Failed to save prayer request" },
        { status: 500 }
      );
    }

    console.log("Prayer Request Saved:", {
      fullName: body.fullName,
      email: body.email,
      phoneNumber: body.phoneNumber || "Not provided",
      prayerRequest: body.prayerRequest,
      timestamp: new Date().toISOString(),
    });

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