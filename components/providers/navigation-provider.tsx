"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingTransition } from "@/components/ui/loading-transition";

interface NavigationContextType {
  isLoading: boolean;
  navigateTo: (path: string) => void;
  transitionType: "fade" | "slide" | "scale" | "slideUp" | "slideDown";
  setTransitionType: (
    type: "fade" | "slide" | "scale" | "slideUp" | "slideDown"
  ) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined
);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}

interface NavigationProviderProps {
  children: React.ReactNode;
}

const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.05 },
  },
  slideUp: {
    initial: { opacity: 0, y: 30 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -30 },
  },
  slideDown: {
    initial: { opacity: 0, y: -30 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 30 },
  },
};

export function NavigationProvider({ children }: NavigationProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [shouldShowLoading, setShouldShowLoading] = useState(false);
  const [skipTransition, setSkipTransition] = useState(false);
  const [transitionType, setTransitionType] = useState<
    "fade" | "slide" | "scale" | "slideUp" | "slideDown"
  >("fade");
  const pathname = usePathname();
  const router = useRouter();
  const navigationStartTime = useRef<number | null>(null);
  const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navigateTo = (path: string) => {
    // Record navigation start time
    navigationStartTime.current = Date.now();

    // Navigate to the new page immediately
    router.push(path);
  };

  // Check if we should skip loading for this navigation
  const shouldSkipLoading = () => {
    if (!navigationStartTime.current) return false;
    const loadTime = Date.now() - navigationStartTime.current;
    return loadTime < 300;
  };

  useEffect(() => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
    }

    // If we have a navigation start time, calculate actual load time
    if (navigationStartTime.current) {
      const loadTime = Date.now() - navigationStartTime.current;
      navigationStartTime.current = null;

      // If page loaded quickly (less than 300ms), skip loading screen entirely
      if (loadTime < 300) {
        // Don't show loading screen at all
        setShouldShowLoading(false);
        setIsLoading(false);
        setSkipTransition(true);
        return;
      }

      // If page took longer, show loading screen
      setShouldShowLoading(true);
      setIsLoading(true);
      setSkipTransition(false);
      const minLoadingTime = Math.max(1000, loadTime); // At least 1 second, or actual load time
      const remainingTime = minLoadingTime - loadTime;

      if (remainingTime > 0) {
        loadingTimeoutRef.current = setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      } else {
        // If we've already exceeded the minimum time, stop loading immediately
        setIsLoading(false);
      }
    } else {
      // For initial page load or direct navigation, show brief loading
      setShouldShowLoading(true);
      setIsLoading(true);
      setSkipTransition(false);
      loadingTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 800);
    }

    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [pathname]);

  const value = {
    isLoading,
    navigateTo,
    transitionType,
    setTransitionType,
  };

  return (
    <NavigationContext.Provider value={value}>
      <LoadingTransition isLoading={isLoading && shouldShowLoading} />
      {skipTransition ? (
        <div className="w-full">{children}</div>
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={transitionVariants[transitionType]}
            transition={{
              type: "tween",
              ease: "easeInOut",
              duration: 0.5,
            }}
            className="w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </NavigationContext.Provider>
  );
}
