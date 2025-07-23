import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/hero/hero-section";
import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "Home",
  description:
    "Welcome to PMC Church - A welcoming community dedicated to spreading God's love and serving our neighbors. Join us for worship, fellowship, and spiritual growth.",
  keywords: [
    "church home",
    "welcome",
    "community",
    "worship",
    "fellowship",
    "spiritual growth",
    "Sunday service",
    "church near me",
  ],
  image: "/images/church-hero.jpg",
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
