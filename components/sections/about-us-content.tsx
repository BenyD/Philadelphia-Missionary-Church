"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import {
  Heart,
  Users,
  Globe,
  Calendar,
  MapPin,
  ArrowRight,
  Star,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutUsContent() {
  return (
    <section className="relative pt-20 pb-12 md:pt-20 md:pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
      {/* Enhanced Background with Glass Morphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/30 to-blue-50/30">
        {/* Static Background Elements for Better Performance */}
        <div className="absolute top-20 right-10 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-red-400/15 to-blue-400/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-blue-400/15 to-red-400/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-r from-red-300/10 to-blue-300/10 rounded-full blur-2xl" />
      </div>

      <Container className="relative z-10">
        {/* Enhanced Page Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 md:px-4 py-2 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border border-red-100">
            <Star className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            <span className="text-xs md:text-sm font-medium text-gray-600">
              Our Story
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
              About Us
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Discover the story of Philadelphia Missionary Church and our journey
            of faith, growth, and ministry across Switzerland.
          </p>
        </motion.div>

        {/* Enhanced Hero Image Section */}
        <motion.div
          className="mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src="/images/about-hero.jpg"
              alt="Philadelphia Missionary Church"
              className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 text-white">
              <div className="flex items-center gap-2 mb-2 md:mb-3">
                <Award className="h-4 w-4 md:h-5 md:w-5 text-red-400" />
                <span className="text-xs md:text-sm font-medium text-red-200">
                  Established 1989
                </span>
              </div>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2">
                Philadelphia Missionary Church
              </h2>
              <p className="text-sm md:text-lg opacity-90">
                Serving the world with love and dedication
              </p>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Key Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="text-center group">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <motion.div
                className="p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl md:rounded-2xl group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300 border border-red-100"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-red-600 group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
              1989
            </div>
            <div className="text-sm md:text-base text-gray-600">Founded</div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <motion.div
                className="p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl md:rounded-2xl group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300 border border-red-100"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Users className="h-6 w-6 md:h-8 md:w-8 text-red-600 group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
              400+
            </div>
            <div className="text-sm md:text-base text-gray-600">Believers</div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <motion.div
                className="p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl md:rounded-2xl group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300 border border-red-100"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Globe className="h-6 w-6 md:h-8 md:w-8 text-red-600 group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
              20+
            </div>
            <div className="text-sm md:text-base text-gray-600">Churches</div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <motion.div
                className="p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl md:rounded-2xl group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300 border border-red-100"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <MapPin className="h-6 w-6 md:h-8 md:w-8 text-red-600 group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
            <div className="text-lg md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
              Worldwide
            </div>
            <div className="text-sm md:text-base text-gray-600">International</div>
          </div>
        </motion.div>

        {/* Enhanced Content Sections with Alternating Layout */}
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {/* Our Beginning - Image Left */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about-church-gathering.jpg"
                  alt="Church gathering"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full border border-red-100 w-fit">
                <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                <span className="text-xs md:text-sm font-medium text-red-600">
                  Our Foundation
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                Our Humble Beginning
              </h2>
              <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Philadelphia Missionary Church began on September 23, 1989, as
                  Tamil Christian Fellowship, with just eleven believers united
                  in prayer and purpose. The small group gathered with a big
                  vision — to spread the good news of our Lord Jesus Christ to
                  those who had never heard it before.
                </p>
                <p>
                  In 1992, as the ministry grew and the vision expanded, the
                  church was renamed Philadelphia Church. The name change marked
                  a new chapter in our mission to reach the lost and share the
                  love of Christ with as many people as possible.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Paul Satkunarajah - Founder - Image Right */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            <div className="space-y-4 md:space-y-6 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full border border-red-100 w-fit">
                <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                <span className="text-xs md:text-sm font-medium text-red-600">
                  Our Founder
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                Paul Satkunarajah
              </h2>
              <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Paul Satkunarajah, the founder of Philadelphia Missionary Church in Switzerland, India, and Sri Lanka, was a devoted servant of God who dedicated his life to spreading the Gospel. He went to be with God on 17. January 2021. We thank him for his faithful service and the legacy he left behind.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-blue-50 p-4 md:p-6 rounded-xl md:rounded-2xl border-l-4 border-red-500 shadow-lg">
                  <blockquote className="text-base md:text-lg italic text-gray-700">
                    "When his time of service was complete, he returned home, as heartfeltly expressed in Luke 1:23"
                  </blockquote>
                </div>
              </div>
            </div>
            <div className="relative group lg:order-2">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/paul.jpg"
                  alt="Pastor Paul Satkunarajah"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
          </motion.div>

          {/* Growth and Expansion - Image Left */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
          >
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about-growth.jpg"
                  alt="Church growth"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 w-fit">
                <Globe className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                <span className="text-xs md:text-sm font-medium text-blue-600">
                  Expansion
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                Growth and Expansion
              </h2>
              <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  As the Lord blessed our ministry, more and more unbelievers
                  accepted Jesus Christ as their personal Savior. The
                  congregation grew, and with that growth came the clear call to
                  extend the church's reach beyond its immediate surroundings.
                  We sensed the need to plant churches across Switzerland to
                  further advance His kingdom.
                </p>
                <p>
                  In 1998, the ministry was renamed once again to Philadelphia
                  Missionary Church, symbolizing our commitment to global
                  missions and discipleship. With the Lord's guidance, we have
                  been blessed to see lives transformed and disciples made in
                  His name.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Ministry in Switzerland - Image Left */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            <div className="relative group order-2 lg:order-1">
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/about-switzerland.jpg"
                  alt="Switzerland ministry"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border border-red-100 w-fit">
                <Award className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                <span className="text-xs md:text-sm font-medium text-gray-700">
                  Today's Ministry
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                Ministry in Switzerland
              </h2>
              <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  Today, Philadelphia Missionary Church is home to 20+ vibrant
                  churches across the world, with more than 400 believers.
                  Through the dedication of pastors and leaders, our international church
                  continues to make disciples and spread the message of
                  salvation in Jesus Christ.
                </p>
                <div className="bg-gradient-to-r from-red-50 to-blue-50 p-4 md:p-6 rounded-xl md:rounded-2xl border-l-4 border-red-500 shadow-lg">
                  <blockquote className="text-base md:text-lg italic text-gray-700">
                    "I know your deeds. See, I have placed before you an open
                    door that no one can shut. I know that you have little
                    strength, yet you have kept my word and have not denied my
                    name."
                    <footer className="mt-2 md:mt-3 text-sm font-semibold text-red-600 flex items-center gap-2">
                      <Star className="h-3 w-3 md:h-4 md:w-4" />
                      Revelation 3:8
                    </footer>
                  </blockquote>
                </div>
                <p>
                  This promise of an open door has been our guiding light as we
                  continue to grow and serve, knowing that God is opening doors
                  for us to reach more people and make a lasting impact for His
                  kingdom.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
