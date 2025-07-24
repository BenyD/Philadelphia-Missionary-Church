import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LocationsContent } from "@/components/sections/locations-content";
import { generateMetadata } from "@/lib/metadata";

export const metadata: Metadata = generateMetadata({
  title: "Locations",
  description:
    "Find all Philadelphia Missionary Church locations across Switzerland. Join us for services, prayer meetings, and fellowship at a location near you.",
  keywords: [
    "church locations",
    "PMC churches",
    "Switzerland churches",
    "church services",
    "prayer meetings",
    "Sunday service",
    "church near me",
  ],
  image: "/images/church-locations.jpg",
});

export default function LocationsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div>
        <LocationsContent />
      </div>
      <Footer />
    </main>
  );
}
