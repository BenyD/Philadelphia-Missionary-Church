import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Event } from "@/lib/supabase";

// GET - Fetch all events
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const limit = searchParams.get("limit");
    const upcoming = searchParams.get("upcoming");

    let query = supabase
      .from("events")
      .select("*")
      .order("date", { ascending: true });

    // Filter by featured status if specified
    if (featured === "true") {
      query = query.eq("is_featured", true);
    }

    // Filter for upcoming events (date >= today)
    if (upcoming === "true") {
      const today = new Date().toISOString().split('T')[0];
      query = query.gte("date", today);
    }

    // Apply limit if specified
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching events:", error);
      return NextResponse.json(
        { error: "Failed to fetch events" },
        { status: 500 }
      );
    }

    return NextResponse.json({ events: data || [] });
  } catch (error) {
    console.error("Error in events GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const { title, description, date, time, location } = body;

    if (!title || !description || !date || !time || !location) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: title, description, date, time, location",
        },
        { status: 400 }
      );
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { error: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    // Create event
    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title: title.trim(),
          description: description.trim(),
          date,
          time: time.trim(),
          location: location.trim(),
          is_featured: body.is_featured || false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error creating event:", error);
      return NextResponse.json(
        { error: "Failed to create event" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Event created successfully",
        event: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in events POST:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
