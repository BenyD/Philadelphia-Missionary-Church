import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// GET - Fetch all pastors from locations
export async function GET(request: NextRequest) {
  try {
    const { data: locations, error } = await supabase
      .from("locations")
      .select("contacts")
      .not("contacts", "eq", "[]");

    if (error) {
      console.error("Error fetching pastors:", error);
      return NextResponse.json(
        { error: "Failed to fetch pastors" },
        { status: 500 }
      );
    }

    // Extract pastors from contacts
    const pastors =
      locations
        ?.flatMap((location) => {
          const contacts = location.contacts || [];
          return contacts
            .filter(
              (contact: any) =>
                contact.role?.toLowerCase().includes("pastor") ||
                contact.name?.toLowerCase().includes("pastor")
            )
            .map((contact: any) => ({
              id: `${location.id}-${contact.name}`,
              name: contact.name,
              role: contact.role || "Pastor",
              phone: contact.phone,
              location: location.name,
              imageUrl: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80&${Math.random()}`, // Placeholder image
            }));
        })
        .filter(Boolean) || [];

    // Remove duplicates based on name
    const uniquePastors = pastors.filter(
      (pastor, index, self) =>
        index === self.findIndex((p) => p.name === pastor.name)
    );

    return NextResponse.json({ pastors: uniquePastors });
  } catch (error) {
    console.error("Error in pastors GET:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
