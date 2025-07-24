import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutUsContent } from "@/components/sections/about-us-content";
import { CTASection } from "@/components/sections/cta-section";
import { generateMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "About Us",
  description:
    "Learn about the history and mission of Philadelphia Missionary Church, from our humble beginnings in 1989 to our current ministry across Switzerland.",
  keywords: [
    "about us",
    "church history",
    "Philadelphia Missionary Church",
    "Switzerland churches",
    "ministry",
    "church growth",
    "mission",
    "discipleship",
  ],
  image: "/images/church-about.jpg",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div>
        <AboutUsContent />
        <CTASection />
      </div>
      <Footer />
    </main>
  );
}
