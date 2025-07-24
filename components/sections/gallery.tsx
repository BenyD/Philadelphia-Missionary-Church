"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import {
  Grid,
  List,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Camera,
  Filter,
} from "lucide-react";

// Sample gallery images - replace with actual images
const galleryImages = [
  {
    id: 1,
    title: "Sunday Service",
    description: "Our congregation gathered for Sunday worship",
    category: "Services",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 2,
    title: "Youth Group Meeting",
    description: "Our youth group enjoying fellowship and activities",
    category: "Youth",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 3,
    title: "Community Outreach",
    description: "Serving our local community with love and compassion",
    category: "Outreach",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 4,
    title: "Worship Team",
    description: "Our talented worship team leading praise and worship",
    category: "Worship",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 5,
    title: "Bible Study",
    description: "Deepening our faith through Bible study and discussion",
    category: "Education",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 6,
    title: "Children's Ministry",
    description: "Nurturing young hearts in our children's ministry",
    category: "Children",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 7,
    title: "Prayer Meeting",
    description: "Coming together in prayer and intercession",
    category: "Prayer",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
  {
    id: 8,
    title: "Fellowship Dinner",
    description: "Sharing meals and building relationships",
    category: "Fellowship",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=300&q=80",
  },
];

type ViewMode = "grid" | "list";

export function Gallery() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedImage, setSelectedImage] = useState<
    (typeof galleryImages)[0] | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    ...Array.from(new Set(galleryImages.map((img) => img.category))),
  ];

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (image: (typeof galleryImages)[0]) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage.id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
    } else {
      newIndex =
        currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="relative pt-20 pb-8 md:pt-20 md:pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        {/* Enhanced Background with Glass Morphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-red-50/30 to-blue-50/30">
          {/* Animated Background Elements */}
          <motion.div
            className="absolute top-20 right-10 w-32 md:w-72 h-32 md:h-72 bg-gradient-to-r from-red-400/15 to-blue-400/15 rounded-full blur-2xl md:blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-40 md:w-96 h-40 md:h-96 bg-gradient-to-r from-blue-400/15 to-red-400/15 rounded-full blur-2xl md:blur-3xl"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 md:w-64 h-32 md:h-64 bg-gradient-to-r from-red-300/10 to-blue-300/10 rounded-full blur-xl md:blur-2xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </div>

        <Container className="relative z-10">
          {/* Enhanced Page Header */}
          <motion.div
            className="text-center mb-6 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 mb-3 md:mb-4 px-3 md:px-4 py-2 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border border-red-100">
              <Camera className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
              <span className="text-xs md:text-sm font-medium text-gray-600">
                Visual Stories
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 md:mb-6">
              <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 bg-clip-text text-transparent">
                Our Gallery
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4 lg:px-0">
              Explore moments from our church community, services, events, and
              ministry activities captured through the lens of faith and
              fellowship.
            </p>
          </motion.div>
          {/* Enhanced Controls */}
          <motion.div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 md:gap-6 mb-6 md:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            {/* Enhanced Category Filter */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Filter className="h-3 w-3 md:h-4 md:w-4" />
                <span className="text-sm md:text-base">Filter:</span>
              </div>
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-2 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-red-600 to-red-500 text-white scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-red-200 hover:scale-105"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>

            {/* Enhanced View Toggle */}
            <div className="flex items-center gap-1 md:gap-2 bg-white rounded-xl border border-gray-200 p-1">
              <motion.button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 md:p-3 rounded-lg transition-all duration-300 ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid className="h-3 w-3 md:h-5 md:w-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode("list")}
                className={`p-1.5 md:p-3 rounded-lg transition-all duration-300 ${
                  viewMode === "list"
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="h-3 w-3 md:h-5 md:w-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Enhanced Gallery Grid */}
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8"
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group cursor-pointer"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="relative overflow-hidden rounded-lg md:rounded-xl lg:rounded-2xl bg-gray-100 border border-gray-200 transition-all duration-500">
                      <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-lg md:rounded-xl lg:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative">
                        <img
                          src={image.thumbnailUrl}
                          alt={image.title}
                          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 lg:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <h3 className="text-white font-bold text-sm md:text-base lg:text-lg mb-1 md:mb-2">
                            {image.title}
                          </h3>
                          <p className="text-white/90 text-xs md:text-sm mb-2 md:mb-3">
                            {image.description}
                          </p>
                          <span className="inline-block px-2 md:px-3 py-1 bg-white/20 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                            {image.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-3 md:space-y-6"
              >
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: 8, scale: 1.01 }}
                    className="group cursor-pointer bg-white rounded-lg md:rounded-xl lg:rounded-2xl border border-gray-200 overflow-hidden transition-all duration-500"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-64 h-40 sm:h-auto">
                        <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-blue-500/20 rounded-lg md:rounded-xl lg:rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative h-full">
                          <img
                            src={image.thumbnailUrl}
                            alt={image.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                      <div className="flex-1 p-3 md:p-6 lg:p-8">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 md:space-y-4">
                            <div className="inline-flex items-center gap-2 px-2 md:px-3 py-1 bg-gradient-to-r from-red-50 to-blue-50 rounded-full border border-red-100 w-fit">
                              <Star className="h-3 w-3 md:h-4 md:w-4 text-red-500" />
                              <span className="text-xs md:text-sm font-medium text-red-600">
                                {image.category}
                              </span>
                            </div>
                            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                              {image.title}
                            </h3>
                            <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">
                              {image.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {filteredImages.length === 0 && (
            <motion.div
              className="text-center py-8 md:py-12 lg:py-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-16 md:h-16 bg-gradient-to-r from-red-50 to-blue-50 rounded-full mb-3 md:mb-4">
                <Camera className="h-5 w-5 md:h-8 md:w-8 text-red-500" />
              </div>
              <p className="text-gray-500 text-base md:text-lg lg:text-xl font-medium">
                No images found for this category.
              </p>
              <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">
                Try selecting a different category or check back later.
              </p>
            </motion.div>
          )}
        </Container>
      </section>

      {/* Enhanced Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-5xl max-h-full">
              <motion.button
                onClick={closeLightbox}
                className="absolute top-2 md:top-4 right-2 md:right-4 z-10 p-1.5 md:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-3 w-3 md:h-6 md:w-6" />
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("prev");
                }}
                className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 p-1.5 md:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="h-3 w-3 md:h-6 md:w-6" />
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage("next");
                }}
                className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 p-1.5 md:p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="h-3 w-3 md:h-6 md:w-6" />
              </motion.button>

              <div className="relative" onClick={(e) => e.stopPropagation()}>
                <img
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="max-w-full max-h-[80vh] md:max-h-[85vh] object-contain rounded-lg md:rounded-xl lg:rounded-2xl border border-gray-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 lg:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-lg md:rounded-b-xl lg:rounded-b-2xl">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <Star className="h-3 w-3 md:h-5 md:w-5 text-red-400" />
                    <span className="text-xs md:text-sm font-medium text-red-200">
                      {selectedImage.category}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg lg:text-2xl font-bold text-white mb-1 md:mb-2">
                    {selectedImage.title}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm lg:text-lg leading-relaxed">
                    {selectedImage.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
