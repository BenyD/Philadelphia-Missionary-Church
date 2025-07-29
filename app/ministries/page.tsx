import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MinistriesContent } from "@/components/sections/ministries-content";
import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Ministries",
  description:
    "Explore PMC's international ministries - PMC Youth, PMC Sri Lanka, and PMC India. Discover how we're spreading God's love and building His kingdom across the world.",
  keywords: [
    "PMC ministries",
    "PMC Youth",
    "PMC Sri Lanka",
    "PMC India",
    "international ministry",
    "youth ministry",
    "church planting",
    "evangelism",
    "discipleship",
    "community service",
    "El Shaddai International School",
  ],
  image: "/images/church-about.jpg",
});

export default function MinistriesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <MinistriesContent />
      <Footer />
    </main>
  );
}
