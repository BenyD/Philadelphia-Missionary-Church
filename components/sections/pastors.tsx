"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Star } from "lucide-react";

const pastors = [
  {
    name: "Pastor John Smith",
    role: "Lead Pastor",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Pastor Sarah Johnson",
    role: "Associate Pastor",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Pastor Michael Chen",
    role: "Youth Pastor",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Pastor Emily Davis",
    role: "Worship Pastor",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Pastor David Wilson",
    role: "Outreach Pastor",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
  {
    name: "Pastor Lisa Brown",
    role: "Children's Pastor",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
  },
];

export function Pastors() {
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

        <motion.ul
          role="list"
          className="mx-auto mt-12 md:mt-20 grid max-w-2xl grid-cols-1 gap-x-6 md:gap-x-8 gap-y-12 md:gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {pastors.map((pastor, index) => (
            <motion.li
              key={pastor.name}
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
      </Container>
    </section>
  );
}
