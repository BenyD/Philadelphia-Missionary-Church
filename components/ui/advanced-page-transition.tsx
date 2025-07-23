"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface AdvancedPageTransitionProps {
  children: ReactNode;
  transitionType?: "fade" | "slide" | "scale" | "slideUp" | "slideDown";
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

const transitionConfig = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

export function AdvancedPageTransition({
  children,
  transitionType = "fade",
}: AdvancedPageTransitionProps) {
  const pathname = usePathname();
  const variants = transitionVariants[transitionType];

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={transitionConfig}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
