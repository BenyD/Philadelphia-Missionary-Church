"use client";

import { Church } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "white";
}

export function Logo({
  className,
  showText = true,
  size = "md",
  variant = "default",
}: LogoProps) {
  const sizeClasses = {
    sm: {
      container: "h-8 w-8",
      icon: "h-4 w-4",
      text: "text-sm",
      textContainer: "text-xs",
    },
    md: {
      container: "h-10 w-10",
      icon: "h-5 w-5",
      text: "text-lg",
      textContainer: "text-sm",
    },
    lg: {
      container: "h-12 w-12",
      icon: "h-6 w-6",
      text: "text-xl",
      textContainer: "text-base",
    },
  };

  const variantClasses = {
    default: {
      container: "bg-white",
      text: "text-gray-800",
      subtitle: "text-gray-600",
    },
    white: {
      container: "bg-white",
      text: "text-white",
      subtitle: "text-gray-300",
    },
  };

  const currentSize = sizeClasses[size];
  const currentVariant = variantClasses[variant];

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {/* Logo Container */}
      <div
        className={cn(
          "relative rounded-lg flex items-center justify-center shadow-lg overflow-hidden",
          currentSize.container,
          currentVariant.container
        )}
      >
        {/* Try to load logo image first */}
        <div className="relative w-full h-full">
          <Image
            src="/images/logo.png"
            alt="PMC Church Logo"
            fill
            className="object-cover"
            onError={(e) => {
              // Hide image on error and show fallback icon
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = "none";
              const fallback = target.nextElementSibling as HTMLElement;
              if (fallback) {
                fallback.style.display = "flex";
              }
            }}
          />
          {/* Fallback Icon */}
          <div className="hidden items-center justify-center w-full h-full bg-gradient-to-br from-blue-600 to-red-600">
            <Church className={cn("text-white", currentSize.icon)} />
          </div>
        </div>
      </div>

      {/* Text Content */}
      {showText && (
        <div className="flex flex-col">
          <h1
            className={cn(
              "font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent",
              currentSize.text
            )}
          >
            Philadelphia Missionary Church
          </h1>
          <p
            className={cn(
              "font-medium",
              currentSize.textContainer,
              currentVariant.subtitle
            )}
          >
            Proclaiming God's Love
          </p>
        </div>
      )}
    </div>
  );
}
