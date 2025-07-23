"use client";

import { motion } from "framer-motion";
import { Church } from "lucide-react";

interface LoadingTransitionProps {
  isLoading: boolean;
}

export function LoadingTransition({ isLoading }: LoadingTransitionProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-yellow-50 to-orange-50"
    >
      <div className="text-center space-y-6">
        {/* Animated Church Icon */}
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="flex justify-center"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl shadow-2xl flex items-center justify-center">
            <Church className="h-8 w-8 text-white" />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-lg font-medium text-gray-600"
        >
          Loading...
        </motion.div>

        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
              className="w-3 h-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
