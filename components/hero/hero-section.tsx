"use client";

import { useState, useEffect } from "react";
import { Play, ArrowRight, Heart, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Welcome to PMC Church",
      subtitle: "Where Faith Meets Community",
      description:
        "Join us every Sunday as we gather to worship, learn, and grow together in God's love. Experience the warmth of our community and discover your spiritual journey with us.",
      image: "/images/church-welcome.jpg",
      gradient: "from-red-600/20 via-orange-600/20 to-yellow-600/20",
    },
    {
      title: "Growing Together in Faith",
      subtitle: "Building Stronger Communities",
      description:
        "Our ministries provide opportunities for all ages to connect, serve, and grow spiritually. From children's programs to adult Bible studies, there's a place for everyone.",
      image: "/images/church-community.jpg",
      gradient: "from-orange-600/20 via-yellow-600/20 to-red-600/20",
    },
    {
      title: "Serving Our Neighbors",
      subtitle: "Love in Action",
      description:
        "We believe in putting our faith into action through community service, outreach programs, and supporting those in need. Be part of making a difference in our world.",
      image: "/images/church-service.jpg",
      gradient: "from-yellow-600/20 via-red-600/20 to-orange-600/20",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Active Members",
      description: "Growing community",
    },
    {
      icon: Heart,
      value: "25+",
      label: "Years of Faith",
      description: "Serving since 1999",
    },
    {
      icon: Calendar,
      value: "52",
      label: "Services Yearly",
      description: "Every Sunday & more",
    },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with Glass Morphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-50">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-red-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-yellow-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Hero Content */}
      <Container className="relative z-10 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4 mt-8 lg:mt-0">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  {heroSlides[currentSlide].title}
                </span>
              </h1>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700">
                {heroSlides[currentSlide].subtitle}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {heroSlides[currentSlide].description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:from-red-700 hover:via-red-600 hover:to-orange-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">Join Now</span>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 px-8 py-5 rounded-full text-lg font-semibold transition-all duration-300 group hover:bg-red-50"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Live
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-full group-hover:from-red-500/20 group-hover:to-orange-500/20 transition-all duration-300">
                      <stat.icon className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            {/* Church Image */}
            <div className="relative bg-white/20 backdrop-blur-md rounded-3xl p-4 border border-white/30 shadow-2xl overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-red-400/10 via-orange-400/10 to-yellow-400/10 rounded-2xl overflow-hidden">
                <img
                  src={heroSlides[currentSlide].image}
                  alt={`${heroSlides[currentSlide].title} - ${heroSlides[currentSlide].subtitle}`}
                  className="w-full h-full object-cover rounded-2xl transition-all duration-700 ease-in-out"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = "flex";
                    }
                  }}
                />
                {/* Fallback Content */}
                <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-red-500/20 to-orange-500/20">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                      <Heart className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {heroSlides[currentSlide].title}
                    </h3>
                    <p className="text-gray-600">
                      {heroSlides[currentSlide].subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-full opacity-80 animate-bounce"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-bounce delay-1000"></div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-12 space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-red-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </Container>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
