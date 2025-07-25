"use client";

import { useState, useMemo } from "react";
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
  Search,
  Filter,
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
  contacts: {
    name: string;
    phone: string;
    role?: string;
  }[];
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
    contacts: [
      {
        name: "Pastor Joshua",
        phone: "079 375 68 32",
        role: "Pastor",
      },
    ],
  },
  {
    id: "zurich",
    name: "PMC Zürich",
    address: "Neeracherstrasse 20, 8157 Dielsdorf",
    services: [
      {
        day: "Every Tuesday",
        time: "19:00 - 20:00",
        type: "Women's Prayer",
        location: "@Zoom",
      },
      {
        day: "Every Wednesday",
        time: "19:00 - 20:30",
        type: "Prayer",
        location: "@PMC Zürich",
      },
      {
        day: "Every Sunday",
        time: "09:30 - 12:30",
        type: "Sunday Service",
      },
    ],
    contacts: [
      {
        name: "Pastor Joshua",
        phone: "079 375 68 32",
        role: "Pastor",
      },
      {
        name: "Bro. Logan",
        phone: "076 451 58 82",
        role: "Brother",
      },
    ],
  },
  {
    id: "basel",
    name: "PMC Basel",
    address: "Missionsstrasse 37, 4055 Basel",
    services: [
      {
        day: "Every Sunday",
        time: "14:00 - 16:30",
        type: "Sunday Service",
      },
    ],
    contacts: [
      {
        name: "Pastor Joseph",
        phone: "079 512 73 18",
        role: "Pastor",
      },
      {
        name: "Bro. Boaz",
        phone: "077 966 16 44",
        role: "Brother",
      },
    ],
  },
  {
    id: "schaffhausen",
    name: "PMC Schaffhausen",
    address: "Address will come",
    services: [
      {
        day: "Every Sunday",
        time: "14:00 - 16:30",
        type: "Sunday Service",
      },
    ],
    contacts: [
      {
        name: "Bro. Boaz",
        phone: "076 451 58 82",
        role: "Brother",
      },
    ],
  },
  {
    id: "luzern",
    name: "PMC Luzern",
    address: "Industriestrasse 13, 6010 Kriens",
    services: [
      {
        day: "Every Sunday",
        time: "14:00 - 16:30",
        type: "Sunday Service",
      },
    ],
    contacts: [
      {
        name: "Bro. Sri",
        phone: "076 414 65 69",
        role: "Brother",
      },
      {
        name: "Bro. Pushparajah",
        phone: "076 414 65 69",
        role: "Brother",
      },
    ],
  },
  {
    id: "solothurn",
    name: "PMC Solothurn",
    address: "Bielstrasse 26, 4500 Solothurn",
    services: [
      {
        day: "Every Sunday",
        time: "14:00 - 17:00",
        type: "Sunday Service",
      },
    ],
    contacts: [
      {
        name: "Bro. Devananth",
        phone: "079 517 51 96",
        role: "Brother",
      },
      {
        name: "Bro. Denesh",
        phone: "079 605 89 60",
        role: "Brother",
      },
    ],
  },
  {
    id: "yverdon",
    name: "PMC Yverdon",
    address: "Rue Pestalozzi 9, 1400 Yverdon-les-Bains",
    services: [
      {
        day: "Every Sunday",
        time: "15:30 - 17:30",
        type: "Sunday Service",
      },
    ],
    contacts: [
      {
        name: "Pastor Anton",
        phone: "079 598 36 17",
        role: "Pastor",
      },
    ],
  },
  {
    id: "fribourg",
    name: "PMC Fribourg",
    address: "Rte de Moncor 2A, 1752 Villars-sur-Glane",
    services: [
      {
        day: "Every Sunday",
        time: "17:30 - 20:00",
        type: "Sunday Service",
      },
    ],
    contacts: [
      {
        name: "Pastor Anton",
        phone: "079 598 36 17",
        role: "Pastor",
      },
    ],
  },
  {
    id: "lausanne",
    name: "PMC Lausanne",
    address: "Avenue des Boveresses 58, 1010 Lausanne",
    services: [
      {
        day: "Every Sunday",
        time: "14:30 - 16:00",
        type: "Sunday Service",
      },
    ],
    contacts: [
      {
        name: "Pastor Caleb",
        phone: "078 176 17 36",
        role: "Pastor",
      },
    ],
  },
  {
    id: "geneva",
    name: "PMC Geneva",
    address: "Rue Elisabeth-Baulacre 14, 1202 Genève",
    services: [
      {
        day: "Every Sunday",
        time: "14:30 - 16:00",
        type: "Sunday Service",
      },
    ],
    contacts: [
      {
        name: "Pastor Balendra",
        phone: "+33 6 23 35 23 35",
        role: "Pastor",
      },
    ],
  },
];

export function LocationsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedService, setSelectedService] = useState("all");

  // Get unique service types for filter
  const serviceTypes = useMemo(() => {
    const types = new Set<string>();
    churchLocations.forEach((location) => {
      location.services.forEach((service) => {
        types.add(service.type);
      });
    });
    return Array.from(types).sort();
  }, []);

  // Filter locations based on search term and service type
  const filteredLocations = useMemo(() => {
    return churchLocations.filter((location) => {
      const matchesSearch =
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.contacts.some((contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesService =
        selectedService === "all" ||
        location.services.some((service) => service.type === selectedService);

      return matchesSearch && matchesService;
    });
  }, [searchTerm, selectedService]);

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
              Locations and Services
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
              {churchLocations.length}
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

        {/* Search and Filter Section */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by location, city, or pastor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 text-sm md:text-base"
                />
              </div>

              {/* Service Type Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 md:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 appearance-none bg-white text-sm md:text-base"
                >
                  <option value="all">All Services</option>
                  {serviceTypes.map((serviceType) => (
                    <option key={serviceType} value={serviceType}>
                      {serviceType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Showing {filteredLocations.length} of {churchLocations.length}{" "}
                locations
              </p>
            </div>
          </div>
        </motion.div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
          {filteredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4 + index * 0.1,
                ease: "easeOut",
              }}
            >
              <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-xl md:rounded-2xl blur-lg md:blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 hover:border-red-200 transition-all duration-300">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-500 p-4 md:p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold">
                      {location.name}
                    </h3>
                    <motion.div
                      className="p-1 md:p-1.5 lg:p-2 bg-white/20 rounded-full"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
                    </motion.div>
                  </div>
                  <div className="flex items-start gap-2 text-red-100">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4 mt-0.5 flex-shrink-0" />
                    <span className="text-xs md:text-sm leading-relaxed">
                      {location.address}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-2 mb-3 md:mb-4">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                    <h4 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
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
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm md:text-base text-gray-800 break-words">
                            {service.day} - {service.time}
                          </div>
                          <div className="text-xs md:text-sm text-gray-600 break-words">
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

                  {/* Contacts */}
                  <div className="border-t border-gray-200 pt-3 md:pt-4">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <Users className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                      <h4 className="text-sm md:text-base lg:text-lg font-semibold text-gray-800">
                        Contact
                      </h4>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      {location.contacts.map((contact, contactIndex) => (
                        <div
                          key={contactIndex}
                          className="space-y-1.5 md:space-y-2"
                        >
                          <div className="flex items-center gap-2 text-gray-700 flex-wrap">
                            <Star className="h-3 w-3 md:h-4 md:w-4 text-red-500 flex-shrink-0" />
                            <span className="font-medium text-sm md:text-base break-words">
                              {contact.name}
                            </span>
                            {contact.role && (
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full flex-shrink-0">
                                {contact.role}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-gray-600 ml-5">
                            <Phone className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                            <a
                              href={`tel:${contact.phone}`}
                              className="hover:text-red-600 transition-colors text-sm md:text-base break-all"
                            >
                              {contact.phone}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="px-4 md:px-6 pb-4 md:pb-6">
                  <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-lg md:rounded-xl group text-sm md:text-base py-2.5 md:py-3">
                    <MapPin className="mr-2 h-3 w-3 md:h-4 md:w-4 group-hover:scale-110 transition-transform" />
                    Get Directions
                    <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredLocations.length === 0 && (
          <motion.div
            className="text-center py-8 md:py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl md:rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200">
              <Search className="h-8 w-8 md:h-12 md:w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                No locations found
              </h3>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Try adjusting your search terms or service filter.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedService("all");
                }}
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white text-sm md:text-base"
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
