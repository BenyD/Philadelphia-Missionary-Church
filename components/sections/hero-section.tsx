"use client";

import { useState, useEffect } from "react";
import {
  Play,
  ArrowRight,
  Heart,
  Users,
  Calendar,
  Star,
  Award,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Welcome to PMC",
      subtitle: "Philadelphia Missionary Church",
      description:
        "From eleven believers to 10 vibrant churches across Switzerland, we continue to make disciples and share the love of Christ with as many people as possible.",
      image: "/images/hero-slide-1.jpg",
      badge: "Established 1989",
      icon: Award,
    },
    {
      title: "Making Disciples",
      subtitle: "Across Switzerland",
      description:
        "With more than 400 believers and dedicated pastors and leaders, our church continues to make disciples and spread the message of salvation in Jesus Christ.",
      image: "/images/hero-slide-2.jpg",
      badge: "34+ Years of Ministry",
      icon: Heart,
    },
    {
      title: "An Open Door",
      subtitle: "Revelation 3:8",
      description:
        "This promise has been our guiding light as we continue to grow and serve, knowing that God is opening doors for us to reach more people and make a lasting impact for His kingdom.",
      image: "/images/hero-slide-3.jpg",
      badge: "10 Churches Nationwide",
      icon: Globe,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const stats = [
    {
      icon: Users,
      value: "400+",
      label: "Believers",
      description: "Across Switzerland",
    },
    {
      icon: Heart,
      value: "34+",
      label: "Years of Ministry",
      description: "Since 1989",
    },
    {
      icon: Calendar,
      value: "10",
      label: "Churches",
      description: "Across Switzerland",
    },
  ];

  return (
    <section
      id="home"
      className="relative pt-20 pb-12 md:pt-20 md:pb-20 lg:pt-32 lg:pb-32 overflow-hidden"
    >
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/20 to-blue-50/20">
        {/* Single Optimized Background Element */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-red-400/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Content */}
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="space-y-4 mt-4 lg:mt-0"
              >
                {/* Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border-2 border-red-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {(() => {
                    const IconComponent = heroSlides[currentSlide].icon;
                    return (
                      <IconComponent className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                    );
                  })()}
                  <span className="text-xs md:text-sm font-medium text-gray-700">
                    {heroSlides[currentSlide].badge}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h1
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                    {heroSlides[currentSlide].title}
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 lg:px-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {heroSlides[currentSlide].description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start px-4 lg:px-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-200 group">
                    <span>Prayer Request</span>
                    <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-200 group"
                  >
                    <span>Locations</span>
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 pt-6 sm:pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.3 + index * 0.05,
                  }}
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center justify-center mb-3 md:mb-4">
                    <div className="p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-xl md:rounded-2xl group-hover:from-red-500/20 group-hover:to-blue-500/20 transition-all duration-200 border-2 border-red-200">
                      <stat.icon className="h-5 w-5 md:h-7 md:w-7 text-red-600 transition-transform group-hover:scale-105" />
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base font-semibold text-gray-700 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Visual Content */}
          <div className="relative mt-8 lg:mt-0 z-10">
            {/* Main Image Container */}
            <div className="relative group">
              {/* Image Container */}
              <div className="relative bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl p-3 md:p-4 lg:p-6 border border-white/30 shadow-2xl overflow-hidden">
                <div className="aspect-square bg-gradient-to-br from-blue-400/10 via-red-400/10 to-blue-400/10 rounded-xl md:rounded-2xl overflow-hidden">
                  <img
                    src={heroSlides[currentSlide].image}
                    alt={`${heroSlides[currentSlide].title} - ${heroSlides[currentSlide].subtitle}`}
                    className="w-full h-full object-cover rounded-xl md:rounded-2xl transition-all duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
