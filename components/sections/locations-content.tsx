"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Clock,
  Phone,
  Users,
  Star,
  Calendar,
  Heart,
  Globe,
  ArrowRight,
  Mail,
} from "lucide-react";

interface ChurchLocation {
  id: string;
  name: string;
  address: string;
  services: {
    day: string;
    time: string;
    type: string;
    location?: string;
  }[];
  pastor: {
    name: string;
    phone: string;
    email?: string;
  };
  image?: string;
}

const churchLocations: ChurchLocation[] = [
  {
    id: "bern",
    name: "PMC Bern",
    address: "Sulgeneckstrasse 58, 3005 Bern",
    services: [
      {
        day: "Every Tuesday",
        time: "10:00 - 15:00",
        type: "Women's Prayer",
        location: "@Zoom",
      },
      {
        day: "Every Wednesday",
        time: "19:00 - 20:30",
        type: "Prayer",
        location: "@PMC Bern",
      },
      {
        day: "Every Sunday",
        time: "09:30 - 12:30",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor Joshua",
      phone: "079 375 68 32",
    },
  },
  {
    id: "zurich",
    name: "PMC Zürich",
    address: "Badenerstrasse 420, 8004 Zürich",
    services: [
      {
        day: "Every Wednesday",
        time: "19:00 - 20:30",
        type: "Prayer Meeting",
      },
      {
        day: "Every Sunday",
        time: "10:00 - 13:00",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor Michael",
      phone: "076 123 45 67",
    },
  },
  {
    id: "basel",
    name: "PMC Basel",
    address: "Rheinstrasse 25, 4052 Basel",
    services: [
      {
        day: "Every Thursday",
        time: "19:00 - 20:30",
        type: "Prayer Meeting",
      },
      {
        day: "Every Sunday",
        time: "09:00 - 12:00",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor Sarah",
      phone: "078 987 65 43",
    },
  },
  {
    id: "geneva",
    name: "PMC Genève",
    address: "Rue de Lausanne 145, 1202 Genève",
    services: [
      {
        day: "Every Tuesday",
        time: "19:00 - 20:30",
        type: "Prayer Meeting",
      },
      {
        day: "Every Sunday",
        time: "10:30 - 13:30",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor David",
      phone: "077 456 78 90",
    },
  },
  {
    id: "lausanne",
    name: "PMC Lausanne",
    address: "Avenue de la Gare 15, 1003 Lausanne",
    services: [
      {
        day: "Every Wednesday",
        time: "19:00 - 20:30",
        type: "Prayer Meeting",
      },
      {
        day: "Every Sunday",
        time: "09:30 - 12:30",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor Anna",
      phone: "079 234 56 78",
    },
  },
  {
    id: "lucerne",
    name: "PMC Luzern",
    address: "Pilatusstrasse 30, 6003 Luzern",
    services: [
      {
        day: "Every Thursday",
        time: "19:00 - 20:30",
        type: "Prayer Meeting",
      },
      {
        day: "Every Sunday",
        time: "10:00 - 13:00",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor Thomas",
      phone: "076 789 01 23",
    },
  },
  {
    id: "st-gallen",
    name: "PMC St. Gallen",
    address: "Neugasse 55, 9000 St. Gallen",
    services: [
      {
        day: "Every Tuesday",
        time: "19:00 - 20:30",
        type: "Prayer Meeting",
      },
      {
        day: "Every Sunday",
        time: "09:30 - 12:30",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor Maria",
      phone: "078 345 67 89",
    },
  },
  {
    id: "winterthur",
    name: "PMC Winterthur",
    address: "Marktgasse 25, 8400 Winterthur",
    services: [
      {
        day: "Every Wednesday",
        time: "19:00 - 20:30",
        type: "Prayer Meeting",
      },
      {
        day: "Every Sunday",
        time: "10:00 - 13:00",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor Peter",
      phone: "077 567 89 01",
    },
  },
  {
    id: "thun",
    name: "PMC Thun",
    address: "Hauptgasse 15, 3600 Thun",
    services: [
      {
        day: "Every Thursday",
        time: "19:00 - 20:30",
        type: "Prayer Meeting",
      },
      {
        day: "Every Sunday",
        time: "09:30 - 12:30",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor Lisa",
      phone: "079 678 90 12",
    },
  },
  {
    id: "chur",
    name: "PMC Chur",
    address: "Reichsgasse 10, 7000 Chur",
    services: [
      {
        day: "Every Tuesday",
        time: "19:00 - 20:30",
        type: "Prayer Meeting",
      },
      {
        day: "Every Sunday",
        time: "10:00 - 13:00",
        type: "Sunday Service",
      },
    ],
    pastor: {
      name: "Pastor John",
      phone: "076 890 12 34",
    },
  },
];

export function LocationsContent() {
  return (
    <section className="relative pt-20 pb-12 md:pt-20 md:pb-16 lg:pt-24 lg:pb-24 overflow-hidden">
      {/* Enhanced Background with Glass Morphism */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/30 to-blue-50/30">
        {/* Static Background Elements for Better Performance */}
        <div className="absolute top-20 right-10 w-48 md:w-72 h-48 md:h-72 bg-gradient-to-r from-red-400/15 to-blue-400/15 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 md:w-96 h-64 md:h-96 bg-gradient-to-r from-blue-400/15 to-red-400/15 rounded-full blur-2xl md:blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 md:w-64 h-40 md:h-64 bg-gradient-to-r from-red-300/10 to-blue-300/10 rounded-full blur-xl md:blur-2xl" />
      </div>

      <Container className="relative z-10">
        {/* Enhanced Page Header */}
        <motion.div
          className="text-center mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 mb-3 md:mb-4 px-3 md:px-4 py-2 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border border-red-100">
            <Globe className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            <span className="text-xs md:text-sm font-medium text-gray-600">
              Our Churches
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
              Our Locations
            </span>
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 lg:px-0">
            Find all Philadelphia Missionary Church locations across
            Switzerland. Join us for services, prayer meetings, and fellowship
            at a location near you.
          </p>
        </motion.div>

        {/* Statistics Section */}
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
                <MapPin className="h-6 w-6 md:h-8 md:w-8 text-red-600 group-hover:scale-110 transition-transform" />
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
                className="p-3 md:p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl md:rounded-2xl group-hover:from-blue-500/20 group-hover:to-blue-600/20 transition-all duration-300 border border-blue-100"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-600 group-hover:scale-110 transition-transform" />
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
                className="p-3 md:p-4 bg-gradient-to-br from-red-500/10 to-blue-500/10 rounded-xl md:rounded-2xl group-hover:from-red-500/20 group-hover:to-blue-500/20 transition-all duration-300 border border-red-100"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Calendar className="h-6 w-6 md:h-8 md:w-8 text-red-600 group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
              Weekly
            </div>
            <div className="text-sm md:text-base text-gray-600">Services</div>
          </div>

          <div className="text-center group">
            <div className="flex items-center justify-center mb-3 md:mb-4">
              <motion.div
                className="p-3 md:p-4 bg-gradient-to-br from-blue-500/10 to-red-500/10 rounded-xl md:rounded-2xl group-hover:from-blue-500/20 group-hover:to-red-500/20 transition-all duration-300 border border-blue-100"
                whileHover={{ scale: 1.1, rotate: -5 }}
              >
                <Heart className="h-6 w-6 md:h-8 md:w-8 text-blue-600 group-hover:scale-110 transition-transform" />
              </motion.div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1 md:mb-2">
              Switzerland
            </div>
            <div className="text-sm md:text-base text-gray-600">Nationwide</div>
          </div>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {churchLocations.map((location, index) => (
            <motion.div
              key={location.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3 + index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden border border-gray-200 hover:border-red-200 transition-all duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 md:p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {location.name}
                    </h3>
                    <motion.div
                      className="p-1.5 md:p-2 bg-white/20 rounded-full"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <MapPin className="h-5 w-5 md:h-6 md:w-6" />
                    </motion.div>
                  </div>
                  <div className="flex items-center gap-2 text-red-100">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="text-xs md:text-sm">
                      {location.address}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                    <h4 className="text-base md:text-lg font-semibold text-gray-800">
                      Services
                    </h4>
                  </div>
                  <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    {location.services.map((service, serviceIndex) => (
                      <div
                        key={serviceIndex}
                        className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-gray-50 rounded-lg md:rounded-xl hover:bg-red-50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full mt-1.5 md:mt-2"></div>
                        <div className="flex-1">
                          <div className="font-medium text-sm md:text-base text-gray-800">
                            {service.day} - {service.time}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600">
                            {service.type}
                            {service.location && (
                              <span className="text-red-600 ml-1">
                                ({service.location})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pastor Contact */}
                  <div className="border-t border-gray-200 pt-3 md:pt-4">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <Users className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                      <h4 className="text-base md:text-lg font-semibold text-gray-800">
                        Contact
                      </h4>
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Star className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                        <span className="font-medium text-sm md:text-base">
                          {location.pastor.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="h-3 w-3 md:h-4 md:w-4" />
                        <a
                          href={`tel:${location.pastor.phone}`}
                          className="hover:text-red-600 transition-colors text-sm md:text-base"
                        >
                          {location.pastor.phone}
                        </a>
                      </div>
                      {location.pastor.email && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="h-3 w-3 md:h-4 md:w-4" />
                          <a
                            href={`mailto:${location.pastor.email}`}
                            className="hover:text-red-600 transition-colors text-sm md:text-base"
                          >
                            {location.pastor.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg md:rounded-xl group text-sm md:text-base py-2 md:py-3">
                    <MapPin className="mr-2 h-3 w-3 md:h-4 md:w-4 group-hover:scale-110 transition-transform" />
                    Get Directions
                    <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
