"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { EventCard } from "@/components/ui/event-card";

const upcomingEvents = [
  {
    id: "1",
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Sanctuary",
    description:
      "Join us for inspiring worship, powerful preaching, and meaningful fellowship every Sunday morning.",
    category: "Worship",
  },
  {
    id: "2",
    title: "Bible Study & Prayer",
    date: "Every Wednesday",
    time: "7:00 PM",
    location: "Fellowship Hall",
    description:
      "Deepen your understanding of God's Word through our weekly Bible study and prayer sessions.",
    category: "Study",
  },
  {
    id: "3",
    title: "Youth Ministry Meeting",
    date: "Every Friday",
    time: "6:30 PM",
    location: "Youth Center",
    description:
      "A dynamic gathering for young people to grow in faith, build friendships, and have fun together.",
    category: "Youth",
  },
];

export function UpcomingEvents() {
  return (
    <section className="relative py-12 md:py-16 lg:py-24 overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/20 to-blue-50/20">
        {/* Single Optimized Background Element */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-red-400/10 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
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
            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            <span className="text-xs md:text-sm font-medium text-gray-600">
              Stay Connected
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 lg:px-0">
            Join us for our regular gatherings and special events. There's
            always something happening at PMC Church.
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {upcomingEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              description={event.description}
              category={event.category}
            />
          ))}
        </motion.div>

        {/* View All Events Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Link href="/events">
            <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-base md:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-200 group">
              <span>View All Events</span>
              <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
