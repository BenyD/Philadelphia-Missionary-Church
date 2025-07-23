"use client";

import { motion } from "framer-motion";
import { useNavigation } from "@/components/providers/navigation-provider";
import { ReactNode } from "react";

interface AnimatedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  transitionType?: "fade" | "slide" | "scale" | "slideUp" | "slideDown";
  onClick?: () => void;
}

export function AnimatedLink({
  href,
  children,
  className = "",
  transitionType,
  onClick,
}: AnimatedLinkProps) {
  const { navigateTo, setTransitionType } = useNavigation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (transitionType) {
      setTransitionType(transitionType);
    }

    if (onClick) {
      onClick();
    }

    navigateTo(href);
  };

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17,
      }}
    >
      {children}
    </motion.a>
  );
}
