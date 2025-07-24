"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import {
  Heart,
  Users,
  Globe,
  BookOpen,
  Target,
  Award,
  Star,
  Calendar,
  MapPin,
} from "lucide-react";

export function WhoWeAre() {
  return (
    <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Optimized Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/20 to-blue-50/20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-red-400/10 to-blue-400/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 mb-4 px-3 md:px-4 py-2 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border border-red-100">
            <Star className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            <span className="text-xs md:text-sm font-medium text-gray-600">
              Our Story
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
              Who We Are
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 lg:px-0">
            From humble beginnings to a thriving community of faith, discover
            the story of Philadelphia Missionary Church and our mission to
            spread God's love across Switzerland.
          </p>
        </motion.div>

        {/* Key Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
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
              10
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
              Switzerland
            </div>
            <div className="text-sm md:text-base text-gray-600">Nationwide</div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12 md:space-y-16 lg:space-y-20">
          {/* Our Beginning */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 rounded-full border border-red-100 w-fit">
                <Heart className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                <span className="text-xs md:text-sm font-medium text-red-600">
                  Our Foundation
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                Our Humble Beginning
              </h3>
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
            <div className="relative">
              <div className="bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-red-100">
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="h-8 w-8 md:h-12 md:w-12 text-white" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800">
                      September 23, 1989
                    </h4>
                    <p className="text-sm md:text-base text-gray-600">
                      The day it all began
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Growth and Expansion */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative lg:order-2">
              <div className="bg-gradient-to-br from-blue-500/10 to-red-500/10 rounded-2xl md:rounded-3xl p-6 md:p-8 border border-blue-100">
                <div className="text-center space-y-3 md:space-y-4">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <Globe className="h-8 w-8 md:h-12 md:w-12 text-white" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h4 className="text-lg md:text-xl font-bold text-gray-800">
                      Across Switzerland
                    </h4>
                    <p className="text-sm md:text-base text-gray-600">
                      10 vibrant churches
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4 md:space-y-6 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full border border-blue-100 w-fit">
                <Globe className="h-3 w-3 md:h-4 md:w-4 text-blue-500" />
                <span className="text-xs md:text-sm font-medium text-blue-600">
                  Expansion
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                Growth and Expansion
              </h3>
              <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                <p>
                  As the Lord blessed our ministry, more and more unbelievers
                  accepted Jesus Christ as their personal Savior. The
                  congregation grew, and with that growth came the clear call to
                  extend the church's reach beyond its immediate surroundings.
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
        </div>

        {/* Values Section */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
              Our Core Values
            </h3>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4 lg:px-0">
              The principles that guide our ministry and shape our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Our Values */}
            <div className="bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/30 transition-all duration-200 group">
              <div className="text-center space-y-4 md:space-y-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto transition-all duration-200">
                  <BookOpen className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-800">
                  Our Values
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  We are committed to biblical teaching, community service, and
                  spreading God's love through our actions and words. Our
                  foundation is built on faith, hope, and love.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/30 transition-all duration-200 group">
              <div className="text-center space-y-4 md:space-y-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto transition-all duration-200">
                  <Target className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-800">
                  Our Vision
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  To be a beacon of hope and transformation, reaching
                  communities across Switzerland with the message of Christ's
                  love and salvation, making disciples of all nations.
                </p>
              </div>
            </div>

            {/* Our Community */}
            <div className="bg-white/60 backdrop-blur-md rounded-xl md:rounded-2xl p-6 md:p-8 border border-white/30 transition-all duration-200 group">
              <div className="text-center space-y-4 md:space-y-6">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center mx-auto transition-all duration-200">
                  <Award className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <h4 className="text-xl md:text-2xl font-bold text-gray-800">
                  Our Community
                </h4>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                  A diverse family of believers united in faith, supporting one
                  another in spiritual growth and serving our neighbors with
                  compassion and grace.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
