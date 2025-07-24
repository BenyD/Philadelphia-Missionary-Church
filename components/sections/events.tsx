"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Calendar, MapPin, Clock, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/ui/event-card";

// Sample data - this will come from your admin dashboard
const sampleEvents = [
  {
    id: "1",
    title: "Sunday Worship Service",
    date: "Every Sunday",
    time: "10:00 AM",
    location: "Main Sanctuary",
    description:
      "Join us for our weekly worship service with inspiring praise, powerful preaching, and meaningful fellowship. Experience the love of Christ in a welcoming community.",
    category: "Worship",
    isFeatured: true,
  },
  {
    id: "2",
    title: "Bible Study & Prayer",
    date: "Every Wednesday",
    time: "7:00 PM",
    location: "Fellowship Hall",
    description:
      "Deepen your understanding of God's Word through our weekly Bible study and prayer sessions. All are welcome to join this enriching spiritual journey.",
    category: "Study",
  },
  {
    id: "3",
    title: "Youth Ministry Meeting",
    date: "Every Friday",
    time: "6:30 PM",
    location: "Youth Center",
    description:
      "A dynamic gathering for young people to grow in faith, build friendships, and have fun together. Special activities and spiritual growth for our youth community.",
    category: "Youth",
  },
  {
    id: "4",
    title: "Prayer Meeting",
    date: "Every Tuesday",
    time: "8:00 PM",
    location: "Prayer Room",
    description:
      "Corporate prayer time for church and community needs. Join us as we lift up our prayers together and seek God's guidance and blessing.",
    category: "Prayer",
  },
  {
    id: "5",
    title: "Women's Fellowship",
    date: "Every Saturday",
    time: "2:00 PM",
    location: "Community Hall",
    description:
      "A special time for women to connect, share, and grow together in faith. Building meaningful relationships and supporting one another in our spiritual journey.",
    category: "Fellowship",
  },
  {
    id: "6",
    title: "Men's Bible Study",
    date: "Every Thursday",
    time: "7:30 PM",
    location: "Conference Room",
    description:
      "Men's group focused on biblical teaching and practical application. Strengthening faith and building brotherhood through shared study and discussion.",
    category: "Study",
  },
];

export function Events() {
  return (
    <section className="relative pt-20 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
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
            <Calendar className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            <span className="text-xs md:text-sm font-medium text-gray-600">
              Stay Connected
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
              Church Events
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 lg:px-0">
            Join us for our regular services and special events. All are welcome
            to participate in our church community and experience the love of
            Christ.
          </p>
        </motion.div>

        {/* Enhanced Key Statistics */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
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
              6
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Weekly Events
            </div>
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
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
              5
            </div>
            <div className="text-sm md:text-base text-gray-600">Locations</div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <motion.div
                className="p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl md:rounded-2xl group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300 border border-red-100"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Clock className="h-6 w-6 md:h-8 md:w-8 text-red-600 group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
              24/7
            </div>
            <div className="text-sm md:text-base text-gray-600">
              Prayer Support
            </div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <motion.div
                className="p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-xl md:rounded-2xl group-hover:from-red-500/20 group-hover:to-red-600/20 transition-all duration-300 border border-red-100"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Star className="h-6 w-6 md:h-8 md:w-8 text-red-600 group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
              All
            </div>
            <div className="text-sm md:text-base text-gray-600">Welcome</div>
          </div>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          {sampleEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              description={event.description}
              category={event.category}
              isFeatured={event.isFeatured}
            />
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
