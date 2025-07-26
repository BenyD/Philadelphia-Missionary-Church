import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - Fetch all prayer requests (admin only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const limit = searchParams.get("limit");

    let query = supabase
      .from("prayer_requests")
      .select("*")
      .order("created_at", { ascending: false });

    // Filter by status if specified
    if (status) {
      query = query.eq("status", status);
    }

    // Apply limit if specified
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching prayer requests:", error);
      return NextResponse.json(
        { error: "Failed to fetch prayer requests" },
        { status: 500 }
      );
    }

    return NextResponse.json({ prayerRequests: data || [] });
  } catch (error) {
    console.error("Error in prayer requests GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new prayer request (public endpoint)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { fullName, email, prayerRequest } = body;

    if (!fullName || !email || !prayerRequest) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, email, prayerRequest" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone number if provided
    if (body.phoneNumber) {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(body.phoneNumber.replace(/\s/g, ""))) {
        return NextResponse.json(
          { error: "Invalid phone number format" },
          { status: 400 }
        );
      }
    }

    // Create prayer request
    const { data, error } = await supabase
      .from("prayer_requests")
      .insert([
        {
          full_name: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: body.phoneNumber?.trim() || null,
          prayer_request: prayerRequest.trim(),
          status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating prayer request:", error);
      return NextResponse.json(
        { error: "Failed to create prayer request" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Prayer request submitted successfully",
        prayerRequest: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in prayer requests POST:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
