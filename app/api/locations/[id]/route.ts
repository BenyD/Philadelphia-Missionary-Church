import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - Fetch single location by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Location ID is required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("locations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Location not found" },
          { status: 404 }
        );
      }
      console.error("Error fetching location:", error);
      return NextResponse.json(
        { error: "Failed to fetch location" },
        { status: 500 }
      );
    }

    return NextResponse.json({ location: data });
  } catch (error) {
    console.error("Error in location GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT - Update location by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Location ID is required" },
        { status: 400 }
      );
    }

    // Validate required fields
    const { name, address, services, contacts } = body;

    if (!name || !address) {
      return NextResponse.json(
        { error: "Missing required fields: name, address" },
        { status: 400 }
      );
    }

    // Validate services array
    if (!Array.isArray(services)) {
      return NextResponse.json(
        { error: "Services must be an array" },
        { status: 400 }
      );
    }

    // Validate contacts array
    if (!Array.isArray(contacts)) {
      return NextResponse.json(
        { error: "Contacts must be an array" },
        { status: 400 }
      );
    }

    // Validate service objects
    for (const service of services) {
      if (!service.day || !service.time || !service.type) {
        return NextResponse.json(
          { error: "Each service must have day, time, and type fields" },
          { status: 400 }
        );
      }
    }

    // Validate contact objects
    for (const contact of contacts) {
      if (!contact.name || !contact.phone) {
        return NextResponse.json(
          { error: "Each contact must have name and phone fields" },
          { status: 400 }
        );
      }
    }

    // Update location
    const { data, error } = await supabase
      .from("locations")
      .update({
        name: name.trim(),
        address: address.trim(),
        services: services.filter((s) => s.day && s.time && s.type),
        contacts: contacts.filter((c) => c.name && c.phone),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Location not found" },
          { status: 404 }
        );
      }
      console.error("Error updating location:", error);
      return NextResponse.json(
        { error: "Failed to update location" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Location updated successfully",
      location: data,
    });
  } catch (error) {
    console.error("Error in location PUT:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete location by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Location ID is required" },
        { status: 400 }
      );
    }

    // Check if location exists first
    const { data: existingLocation, error: fetchError } = await supabase
      .from("locations")
      .select("id")
      .eq("id", id)
      .single();

    if (fetchError || !existingLocation) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // Delete location
    const { error } = await supabase.from("locations").delete().eq("id", id);

    if (error) {
      console.error("Error deleting location:", error);
      return NextResponse.json(
        { error: "Failed to delete location" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Location deleted successfully",
    });
  } catch (error) {
    console.error("Error in location DELETE:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
