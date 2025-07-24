import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Gallery } from "@/components/sections/gallery";

export const metadata: Metadata = {
  title: "Gallery | PMC Church",
  description:
    "Explore our church gallery featuring moments from services, events, and community gatherings.",
  keywords: [
    "church gallery",
    "PMC church photos",
    "church events",
    "community photos",
  ],
  openGraph: {
    title: "Gallery | PMC Church",
    description:
      "Explore our church gallery featuring moments from services, events, and community gatherings.",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Gallery />
      <Footer />
    </main>
  );
}
