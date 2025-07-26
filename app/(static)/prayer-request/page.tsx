import { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PrayerRequestForm } from "@/components/sections/prayer-request-form";

export const metadata: Metadata = {
  title: "Prayer Request | PMC Church",
  description:
    "Share your prayer requests with the Prayer Team of Philadelphia Missionary Church. We believe in the power of prayer and are here to support you.",
  keywords: [
    "prayer request",
    "prayer team",
    "PMC church prayer",
    "spiritual support",
    "prayer ministry",
  ],
  openGraph: {
    title: "Prayer Request | PMC Church",
    description:
      "Share your prayer requests with the Prayer Team of Philadelphia Missionary Church. We believe in the power of prayer and are here to support you.",
    type: "website",
  },
};

export default function PrayerRequestPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div>
        <PrayerRequestForm />
      </div>
      <Footer />
    </main>
  );
}
