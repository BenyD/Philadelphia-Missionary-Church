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
  Building,
  School,
  HandHeart,
  Lightbulb,
} from "lucide-react";

export function MinistriesContent() {
  const ministries = [
    {
      id: "youth",
      title: "PMC Youth",
      subtitle: "Building God's Kingdom",
      description:
        "PMC Youth, part of PMC International headquartered in Bern, Switzerland, is a youth focused organization dedicated to proclaiming the good news of God and building God's kingdom. Inclusive and welcoming to all, regardless of background or identity, PMC Youth is committed to helping young people develop a personal relationship with God, engage in their community, and grow spiritually.",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      features: [
        "Youth-focused ministry",
        "Inclusive and welcoming",
        "Personal relationship with God",
        "Community engagement",
        "Spiritual growth",
      ],
    },
    {
      id: "sri-lanka",
      title: "PMC Sri Lanka",
      subtitle: "Spreading Hope Since 2003",
      description:
        "In Sri Lanka, Philadelphia Missionary Church started on July 2003 in a small tent. We dedicated to spreading the Gospel, planting churches, and serving communities in need. Our work focuses on evangelism, discipleship, and providing practical support to those who are suffering, including widows, orphans, and the poor.",
      icon: Building,
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      features: [
        "Church planting",
        "Evangelism and discipleship",
        "Support for widows and orphans",
        "Community service",
        "El Shaddai International School project",
      ],
      additionalInfo:
        "A key project we are currently building is the El Shaddai International School. Once completed, the school will offer quality education with a Christian foundation to children from underprivileged backgrounds, giving them hope for a brighter future. We trust in Revelation 3:8, believing that God is opening doors for us to make a lasting impact in Sri Lanka, and we are excited to see this vision come to life.",
    },
    {
      id: "india",
      title: "PMC India",
      subtitle: "Empowering Communities",
      description:
        "In India, Philadelphia Missionary Church is dedicated to spreading the Gospel, planting churches, and serving communities in need. Our work focuses on evangelism, discipleship, and providing practical support to those who are suffering, including widows, orphans, and the poor.",
      icon: HandHeart,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      borderColor: "border-orange-200",
      features: [
        "Gospel spreading",
        "Church planting",
        "Local leader empowerment",
        "Spiritual growth",
        "Compassionate care",
      ],
      additionalInfo:
        "We are committed to empowering local leaders and fostering spiritual growth within Indian communities, helping individuals encounter the transforming power of Christ. Through various outreach initiatives, we aim to meet both the spiritual and physical needs of those we serve, following Christ's example of compassion and care. We trust in Revelation 3:8, knowing that God is opening doors for us to reach more lives in India, and we are excited to continue walking in faith to fulfill His mission.",
    },
  ];

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
            <Globe className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
            <span className="text-xs md:text-sm font-medium text-gray-600">
              International Ministry
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
              Our Ministries
            </span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Uniting Hearts, Spreading Hope
          </p>
          <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed px-4 mt-4">
            Explore Our Ministries – Pathways to Deeper Connection, Spiritual
            Growth, and Actively Living Out Your Faith in Service to God and
            Neighbor
          </p>
        </motion.div>

        {/* Ministries Grid */}
        <div className="space-y-16 md:space-y-20 lg:space-y-24">
          {ministries.map((ministry, index) => (
            <motion.div
              key={ministry.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              {/* Content */}
              <div
                className={`space-y-4 md:space-y-6 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border border-red-100 w-fit">
                  <ministry.icon className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                  <span className="text-xs md:text-sm font-medium text-gray-700">
                    {ministry.subtitle}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                  {ministry.title}
                </h2>
                <div className="space-y-3 md:space-y-4 text-base md:text-lg text-gray-700 leading-relaxed">
                  <p>{ministry.description}</p>
                  {ministry.additionalInfo && (
                    <p className="mt-4">{ministry.additionalInfo}</p>
                  )}
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-6">
                  {ministry.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-center gap-3 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200/50"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${ministry.color} rounded-full`}
                      />
                      <span className="text-sm md:text-base text-gray-700 font-medium">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Visual Element */}
              <div
                className={`relative group ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div
                  className={`absolute -inset-2 md:-inset-4 bg-gradient-to-r ${ministry.color
                    .replace("500", "400")
                    .replace(
                      "600",
                      "500"
                    )}/20 rounded-2xl md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
                <div
                  className={`relative bg-gradient-to-br ${ministry.bgColor} rounded-2xl md:rounded-3xl p-8 md:p-12 border-2 ${ministry.borderColor} shadow-xl group-hover:shadow-2xl transition-all duration-500`}
                >
                  <div className="text-center space-y-6 md:space-y-8">
                    <motion.div
                      className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r ${ministry.color} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <ministry.icon className="h-10 w-10 md:h-12 md:w-12 text-white" />
                    </motion.div>
                    <div className="space-y-2 md:space-y-3">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                        {ministry.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        {ministry.subtitle}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div
                        className={`w-16 h-1 bg-gradient-to-r ${ministry.color} rounded-full`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-2xl md:rounded-3xl p-8 md:p-12 border-2 border-red-200 shadow-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                <Lightbulb className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Join Our Mission
            </h3>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
              Whether you're interested in youth ministry, international
              outreach, or supporting our various initiatives, there are many
              ways to get involved and make a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/prayer-request"
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Heart className="h-4 w-4 mr-2" />
                Prayer Request
              </a>
              <a
                href="/locations"
                className="inline-flex items-center justify-center px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 hover:border-gray-400 rounded-xl font-semibold transition-all duration-300"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Find a Location
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
