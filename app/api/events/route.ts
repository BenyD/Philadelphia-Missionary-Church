import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const upcoming = searchParams.get("upcoming");
    const limit = searchParams.get("limit");
    const featured = searchParams.get("featured");

    console.log("API Request params:", { upcoming, limit, featured });

    const supabase = await createClient();

    let query = supabase
      .from("events")
      .select("*")
      .eq("status", "active")
      .order("date", { ascending: true });

    // Filter for upcoming events only
    if (upcoming === "true") {
      const today = new Date().toISOString().split("T")[0];
      console.log("Filtering for upcoming events from date:", today);
      query = query.gte("date", today);
    }

    // Filter for featured events only
    if (featured === "true") {
      query = query.eq("is_featured", true);
    }

    // Apply limit if specified
    if (limit) {
      query = query.limit(parseInt(limit));
    }

    const { data: events, error } = await query;

    if (error) {
      console.error("Error fetching events:", error);
      return NextResponse.json(
        { error: "Failed to fetch events", details: error.message },
        { status: 500 }
      );
    }

    console.log("Events fetched:", events?.length || 0);
    return NextResponse.json({ events: events || [] });
  } catch (error) {
    console.error("Error in events API:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
} 