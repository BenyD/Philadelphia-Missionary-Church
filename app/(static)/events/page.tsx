import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Events } from "@/components/sections/events";
import { CTASection } from "@/components/sections/cta-section";
import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Events",
  description:
    "Join us for exciting events, worship services, and community gatherings at Philadelphia Missionary Church. Stay updated with our upcoming events and activities.",
  keywords: [
    "church events",
    "worship services",
    "community gatherings",
    "upcoming events",
    "church activities",
    "fellowship events",
    "Sunday service",
    "church calendar",
  ],
  image: "/images/church-events.jpg",
});

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div>
        <Events />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
