import Link from "next/link";
import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found - PMC Church",
  description:
    "The page you're looking for doesn't exist. Find your way back to PMC Church.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative pt-20 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
        {/* Enhanced Background with Glass Morphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/30 to-blue-50/30">
          {/* Static Background Elements for Better Performance */}
          <div className="absolute top-20 right-10 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-red-400/15 to-blue-400/15 rounded-full blur-2xl md:blur-3xl" />
          <div className="absolute bottom-20 left-10 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-blue-400/15 to-red-400/15 rounded-full blur-2xl md:blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 md:w-64 h-40 md:h-64 bg-gradient-to-r from-red-300/10 to-blue-300/10 rounded-full blur-xl md:blur-2xl" />
        </div>

        <Container className="relative z-10">
          {/* Main Content */}
          <div className="text-center max-w-4xl mx-auto">
            {/* 404 Number */}
            <div className="mb-12 md:mb-16">
              <div className="relative inline-block">
                <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold bg-gradient-to-r from-red-600 via-red-500 to-blue-600 bg-clip-text text-transparent leading-none tracking-tight">
                  404
                </h1>
                <div className="absolute -inset-8 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-full blur-3xl opacity-50"></div>
              </div>
            </div>

            {/* Error Message */}
            <div className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 leading-tight">
                Page Not Found
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            {/* Back Button */}
            <div className="mb-12 md:mb-16">
              <Link href="/">
                <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
