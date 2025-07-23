"use client";

import { createContext, useContext, useState, useEffect } from "react";
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
  const [transitionType, setTransitionType] = useState<
    "fade" | "slide" | "scale" | "slideUp" | "slideDown"
  >("fade");
  const pathname = usePathname();
  const router = useRouter();

  const navigateTo = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname]);

  const value = {
    isLoading,
    navigateTo,
    transitionType,
    setTransitionType,
  };

  return (
    <NavigationContext.Provider value={value}>
      <LoadingTransition isLoading={isLoading} />
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
    </NavigationContext.Provider>
  );
}
