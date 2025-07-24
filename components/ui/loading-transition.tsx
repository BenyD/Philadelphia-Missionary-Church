"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Church, Cross, Heart, Star, Sparkles, BookOpen } from "lucide-react";
import { useMemo } from "react";

interface LoadingTransitionProps {
  isLoading: boolean;
}

export function LoadingTransition({ isLoading }: LoadingTransitionProps) {
  // Memoize prayer beads for performance
  const prayerBeads = useMemo(() => {
    return Array.from({ length: 9 }, (_, index) => ({
      id: index,
      delay: index * 0.1,
      size: index % 3 === 0 ? "large" : "small",
    }));
  }, []);

  // Memoize floating elements
  const floatingElements = useMemo(() => {
    return Array.from({ length: 6 }, (_, index) => ({
      id: index,
      left: `${10 + ((index * 15) % 80)}%`,
      top: `${15 + ((index * 20) % 70)}%`,
      delay: index * 0.3,
      icon: index % 3 === 0 ? Heart : index % 3 === 1 ? Star : Sparkles,
    }));
  }, []);

  if (!isLoading) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-red-900/30 to-slate-900 overflow-hidden backdrop-blur-md"
      >
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        </div>

        {/* Floating Light Orbs */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-red-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-full blur-3xl"
          />
        </div>

        {/* Floating Elements */}
        {floatingElements.map((element) => {
          const IconComponent = element.icon;
          return (
            <motion.div
              key={element.id}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6 + element.id * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.delay,
              }}
              className="absolute text-white/60"
              style={{
                left: element.left,
                top: element.top,
              }}
            >
              <IconComponent className="h-4 w-4" />
            </motion.div>
          );
        })}

        {/* Main Content */}
        <div className="relative z-10 text-center space-y-12">
          {/* Central Icon with Prayer Beads */}
          <div className="relative">
            {/* Prayer Beads Circle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="relative w-48 h-48"
            >
              {prayerBeads.map((bead, index) => {
                const angle = index * 40 * (Math.PI / 180);
                const radius = 80;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={bead.id}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: bead.delay,
                    }}
                    className="absolute w-3 h-3 bg-gradient-to-r from-red-400 to-orange-400 rounded-full shadow-lg"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                );
              })}
            </motion.div>

            {/* Central Church Icon */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                y: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-6 bg-gradient-to-br from-red-500/40 via-orange-500/30 to-red-500/40 rounded-full blur-2xl"
                />

                {/* Main Icon Container */}
                <div className="relative w-20 h-20 bg-gradient-to-br from-slate-800 via-red-800 to-slate-800 rounded-full shadow-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Church className="h-10 w-10 text-white drop-shadow-lg" />
                  </motion.div>
                </div>

                {/* Cross Icon */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    opacity: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center"
                >
                  <Cross className="h-3 w-3 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Loading Text */}
          <div className="space-y-4">
            <motion.div
              animate={{
                opacity: [0.9, 1, 0.9],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-3xl font-bold text-white drop-shadow-lg"
            >
              Welcome to PMC Church
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-sm text-green-300 font-medium"
            >
              ✓ Ready to continue
            </motion.div>
            <motion.div
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-lg text-gray-200 font-medium max-w-md mx-auto leading-relaxed drop-shadow-md"
            >
              Preparing your spiritual journey with us
            </motion.div>
          </div>

          {/* Modern Progress Indicator */}
          <div className="w-80 mx-auto space-y-4">
            {/* Progress Bar */}
            <div className="relative h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-red-500 rounded-full relative"
              >
                <motion.div
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                />
              </motion.div>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center space-x-2">
              {Array.from({ length: 7 }, (_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.1,
                  }}
                  className="w-2 h-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-full shadow-sm"
                />
              ))}
            </div>
          </div>

          {/* Bottom Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex justify-center space-x-8"
          >
            <div className="flex items-center space-x-2 text-gray-300">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Scripture</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Heart className="h-4 w-4" />
              <span className="text-sm font-medium">Love</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Star className="h-4 w-4" />
              <span className="text-sm font-medium">Faith</span>
            </div>
          </motion.div>
        </div>

        {/* Corner Decorations */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-red-500/40 rounded-tl-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-blue-500/40 rounded-tr-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-red-500/40 rounded-bl-2xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-orange-500/40 rounded-br-2xl"
        />
      </motion.div>
    </AnimatePresence>
  );
}
