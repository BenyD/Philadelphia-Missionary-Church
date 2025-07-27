"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface EventCardProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  isFeatured?: boolean;
  status?: "active" | "cancelled" | "postponed";
}

export function EventCard({
  title,
  date,
  time,
  location,
  description,
  category,
  isFeatured = false,
  status = "active",
}: EventCardProps) {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { color: "bg-red-100 text-red-800", icon: XCircle },
      postponed: {
        color: "bg-yellow-100 text-yellow-800",
        icon: AlertTriangle,
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    const IconComponent = config.icon;

    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.toUpperCase()}
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      whileHover={{ y: status === "active" ? -2 : 0 }}
      className={`group ${status !== "active" ? "opacity-75" : ""}`}
    >
      <div
        className={`bg-white/70 backdrop-blur-md rounded-2xl overflow-hidden border-2 transition-all duration-200 h-full ${
          status === "active"
            ? "border-red-200 hover:border-red-300"
            : status === "cancelled"
            ? "border-red-300 border-dashed"
            : "border-yellow-300 border-dashed"
        }`}
      >
        {/* Event Content */}
        <div className="p-6 space-y-4 h-full flex flex-col">
          {/* Badges Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border border-red-100">
                <Star className="h-3 w-3 text-red-500" />
                <span className="text-xs font-medium text-gray-600">
                  {category}
                </span>
              </div>
              {getStatusBadge(status)}
            </div>
            {isFeatured && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full">
                <span className="text-xs font-medium text-white">Featured</span>
              </div>
            )}
          </div>

          <h3
            className={`text-xl font-bold transition-colors duration-200 ${
              status === "active"
                ? "text-gray-800 group-hover:text-red-600"
                : status === "cancelled"
                ? "text-gray-500 line-through"
                : "text-gray-600 italic"
            }`}
          >
            {title}
          </h3>

          <p className="text-gray-600 text-sm leading-relaxed flex-grow">
            {description}
          </p>

          {/* Event Details */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Calendar className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <Clock className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
