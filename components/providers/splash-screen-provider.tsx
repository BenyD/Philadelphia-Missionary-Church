"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/ui/splash-screen";

interface SplashScreenProviderProps {
  children: React.ReactNode;
}

export function SplashScreenProvider({ children }: SplashScreenProviderProps) {
  const [showSplash, setShowSplash] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("pmc-church-visited");

    if (!hasVisited) {
      setShowSplash(true);
      // Mark as visited
      localStorage.setItem("pmc-church-visited", "true");
    } else {
      setIsLoaded(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setIsTransitioning(true);
    setShowSplash(false);

    // Minimal delay for smooth transition
    setTimeout(() => {
      setIsLoaded(true);
      setIsTransitioning(false);
    }, 100);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.5,
                ease: "easeInOut",
              },
            }}
            className="fixed inset-0 z-50"
          >
            <SplashScreen onComplete={handleSplashComplete} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoaded && !showSplash && (
                    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
