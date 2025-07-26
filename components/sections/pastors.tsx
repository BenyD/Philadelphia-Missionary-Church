"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Pastor {
  id: string;
  name: string;
  role: string;
  phone?: string;
  location?: string;
  imageUrl: string;
}

// Empty pastors array - no fallback data
const emptyPastors: Pastor[] = [];

export function Pastors() {
  const [pastors, setPastors] = useState<Pastor[]>(emptyPastors);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastors = async () => {
      try {
        const response = await fetch("/api/pastors");
        if (response.ok) {
          const data = await response.json();
          if (data.pastors && data.pastors.length > 0) {
            setPastors(data.pastors);
          }
        }
      } catch (error) {
        console.error("Error fetching pastors:", error);
        // Don't keep fallback data - show empty state
      } finally {
        setLoading(false);
      }
    };

    fetchPastors();
  }, []);

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
        <motion.div
          className="mx-auto max-w-2xl text-center"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-pretty text-gray-900">
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              Our Pastors
            </span>
          </h2>
          <p className="mt-4 md:mt-6 text-base md:text-lg/8 text-gray-600 px-4 lg:px-0">
            Meet our dedicated pastoral team who are passionate about serving
            our community and spreading God's love through their ministry and
            leadership.
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            className="mx-auto mt-12 md:mt-20 grid max-w-2xl grid-cols-1 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-3/2 w-full bg-gray-200 rounded-xl md:rounded-2xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </motion.div>
        ) : pastors.length > 0 ? (
          <motion.ul
            role="list"
            className="mx-auto mt-12 md:mt-20 grid max-w-2xl grid-cols-1 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {pastors.map((pastor: Pastor, index: number) => (
              <motion.li
                key={pastor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl border-2 border-red-200">
                  <img
                    alt={pastor.name}
                    src={pastor.imageUrl}
                    className="aspect-3/2 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-4 md:mt-6 text-base md:text-lg/8 font-semibold tracking-tight text-gray-900 group-hover:text-red-600 transition-colors duration-200">
                  {pastor.name}
                </h3>
                <p className="text-sm md:text-base/7 text-gray-600">
                  {pastor.role}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <motion.div
            className="mx-auto mt-12 md:mt-20 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-8 md:p-12 border-2 border-gray-200">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Star className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
                No Pastors Added Yet
              </h3>
              <p className="text-gray-500 text-sm md:text-base">
                Our pastoral team information will be displayed here once added
                to the system.
              </p>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}
