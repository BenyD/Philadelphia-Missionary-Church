"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Church } from "lucide-react";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Start animation after a brief delay
    const animationTimer = setTimeout(() => {
      setIsAnimating(true);
    }, 500);

    // Complete splash screen after animation
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 400); // Reduced wait time for fade out animation
    }, 3000); // Back to original timing

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
            transition: {
              duration: 0.4,
              ease: "easeInOut",
            },
          }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-50"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-red-400/20 to-orange-400/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-blue-400/15 to-yellow-400/15 rounded-full blur-3xl"
            />
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-center space-y-8">
            {/* Logo Animation */}
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -180 }}
                animate={{
                  scale: isAnimating ? 1 : 0.5,
                  opacity: isAnimating ? 1 : 0,
                  rotate: isAnimating ? 0 : -180,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100,
                }}
                className="relative"
              >
                {/* Logo Container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative w-24 h-24 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center"
                >
                  {/* Church Icon */}
                  <motion.div
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Church className="h-12 w-12 text-white" />
                  </motion.div>

                  {/* Glow Effect */}
                  <motion.div
                    animate={{
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-red-500/50 to-orange-500/50 rounded-2xl blur-xl"
                  />
                </motion.div>

                {/* Floating Particles */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                  }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full"
                />
                <motion.div
                  animate={{
                    y: [10, -10, 10],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="absolute -bottom-2 -left-2 w-3 h-3 bg-red-400 rounded-full"
                />
                <motion.div
                  animate={{
                    x: [-5, 5, -5],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.7,
                  }}
                  className="absolute top-1/2 -right-4 w-2 h-2 bg-orange-400 rounded-full"
                />
              </motion.div>
            </div>

            {/* Church Name */}
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isAnimating ? 1 : 0,
                  y: isAnimating ? 0 : 20,
                }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: "easeOut",
                }}
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent"
              >
                PMC Church
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isAnimating ? 1 : 0,
                  y: isAnimating ? 0 : 20,
                }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: "easeOut",
                }}
                className="text-lg md:text-xl text-gray-600 font-medium"
              >
                Spreading the Good News Since 1989
              </motion.p>
            </div>

            {/* Loading Bar */}
            <div className="w-64 mx-auto">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isAnimating ? "100%" : 0 }}
                  transition={{
                    duration: 2.5,
                    ease: "easeInOut",
                    delay: 0.8,
                  }}
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                />
              </div>
            </div>

            {/* Loading Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isAnimating ? 1 : 0 }}
              transition={{
                duration: 1,
                delay: 1.2,
                ease: "easeOut",
              }}
              className="text-sm text-gray-500"
            >
              Loading...
            </motion.p>
          </div>

          {/* Corner Decorations */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-red-500/30 rounded-tl-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-orange-500/30 rounded-tr-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-yellow-500/30 rounded-bl-2xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-red-500/30 rounded-br-2xl"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
