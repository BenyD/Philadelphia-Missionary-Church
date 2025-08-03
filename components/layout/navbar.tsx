"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Phone,
  MapPin,
  Play,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { AnimatedLink } from "@/components/ui/animated-link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    let rafId: number;
    let lastScrollTop = 0;
    let lastScrollTime = 0;

    const handleScroll = () => {
      const now = Date.now();
      const scrollTop = window.scrollY;

      // Throttle scroll events to improve performance
      if (now - lastScrollTime < 16) {
        // ~60fps
        return;
      }

      // Only update if scroll position changed significantly
      if (Math.abs(scrollTop - lastScrollTop) < 1) {
        return;
      }

      lastScrollTime = now;
      lastScrollTop = scrollTop;

      // Cancel previous animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        setIsScrolled(scrollTop > 20);
        setScrollProgress(Math.min(Math.max(scrollPercent, 0), 100));

        // Detect active section for highlighting
        if (window.location.pathname === "/") {
          const sections = ["who-we-are", "pastors"];
          let currentSection = "";

          sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
              }
            }
          });

          setActiveSection(currentSection);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // Handle hash navigation when component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // Wait a bit for the page to fully load
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
            // Set active section based on hash
            setActiveSection(hash.substring(1));
          }
        }, 100);
      }
    }
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Ministries", href: "/ministries" },
    { name: "Pastors", href: "/#pastors" },
    { name: "Events", href: "/events" },
    { name: "Gallery", href: "/gallery" },
    { name: "Locations", href: "/locations" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out",
          isScrolled
            ? "bg-white/95 backdrop-blur-xl"
            : "bg-white/80 backdrop-blur-md"
        )}
      >
        {/* Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200/20 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-blue-600 transition-all duration-300 ease-out will-change-transform"
            style={{
              width: `${scrollProgress}%`,
              transform: `translateX(${scrollProgress > 0 ? 0 : -100}%)`,
            }}
          />
        </div>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20px_20px,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-50/20 via-transparent to-blue-50/20"></div>

        <Container className="relative z-10">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <AnimatedLink href="/" className="flex items-center space-x-3">
              <div className="relative">
                <Logo size="md" className="hidden sm:flex" />
                <Logo size="sm" className="sm:hidden" showText={false} />
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  PMC
                </h1>
              </div>
            </AnimatedLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {/* Main Navigation Items */}
              <div className="flex items-center space-x-1">
                {navItems.map((item, index) => {
                  const isActive =
                    (item.href === "/" &&
                      window.location.pathname === "/" &&
                      !activeSection) ||
                    (item.href === "/about" &&
                      window.location.pathname === "/about") ||
                    (item.href === "/ministries" &&
                      window.location.pathname === "/ministries") ||
                    (item.href === "/events" &&
                      window.location.pathname === "/events") ||
                    (item.href === "/gallery" &&
                      window.location.pathname === "/gallery") ||
                    (item.href === "/locations" &&
                      window.location.pathname === "/locations") ||
                    (item.href.includes("#") &&
                      activeSection === item.href.split("#")[1]);

                  return (
                    <div key={item.name} className="relative group">
                      {item.href.includes("#") ? (
                        <a
                          href={item.href}
                          className={cn(
                            "relative transition-colors duration-200 font-medium px-4 py-2.5 cursor-pointer",
                            isActive
                              ? "text-red-600"
                              : "text-gray-700 hover:text-red-600"
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            const [path, hash] = item.href.split("#");
                            if (
                              path === "/" &&
                              window.location.pathname !== "/"
                            ) {
                              // If we're not on homepage, navigate there first
                              window.location.href = item.href;
                            } else {
                              // If we're already on homepage, just scroll to section
                              const element = document.querySelector(
                                `#${hash}`
                              );
                              if (element) {
                                element.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                                setActiveSection(hash);
                              }
                            }
                          }}
                        >
                          <span className="relative">
                            {item.name}
                            <span
                              className={cn(
                                "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300",
                                isActive ? "w-full" : "w-0 group-hover:w-full"
                              )}
                            ></span>
                          </span>
                        </a>
                      ) : (
                        <AnimatedLink
                          href={item.href}
                          transitionType="fade"
                          className={cn(
                            "relative transition-colors duration-200 font-medium px-4 py-2.5",
                            isActive
                              ? "text-red-600"
                              : "text-gray-700 hover:text-red-600"
                          )}
                        >
                          <span className="relative">
                            {item.name}
                            <span
                              className={cn(
                                "absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300",
                                isActive ? "w-full" : "w-0 group-hover:w-full"
                              )}
                            ></span>
                          </span>
                        </AnimatedLink>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent mx-2"></div>

              {/* CTA Button */}
              <AnimatedLink href="/prayer-request" transitionType="fade">
                <Button className="relative overflow-hidden bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 group border-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Phone className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">Prayer Request</span>
                </Button>
              </AnimatedLink>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden relative p-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all duration-300 border border-red-200/50 hover:border-red-300/50 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-6 h-6">
                <span
                  className={`absolute top-1 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-3 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Navigation - Outside Container */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 backdrop-blur-sm transition-all duration-500 ease-in-out",
          isMenuOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        {/* Full Screen Content */}
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/20 z-10"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Navigation Content */}
          <div className="flex-1 px-6 pt-12 pb-6 overflow-y-auto">
            {/* Church Name */}
            <div className="mb-6 text-center">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-1">
                PMC Church
              </h3>
              <p className="text-gray-400 text-sm">
                Philadelphia Missionary Church
              </p>
            </div>

            {/* Navigation Items */}
            <div className="space-y-2 mb-6">
              {navItems.map((item, index) => {
                const isActive =
                  (item.href === "/" &&
                    window.location.pathname === "/" &&
                    !activeSection) ||
                  (item.href === "/about" &&
                    window.location.pathname === "/about") ||
                  (item.href === "/ministries" &&
                    window.location.pathname === "/ministries") ||
                  (item.href === "/events" &&
                    window.location.pathname === "/events") ||
                  (item.href === "/gallery" &&
                    window.location.pathname === "/gallery") ||
                  (item.href === "/locations" &&
                    window.location.pathname === "/locations") ||
                  (item.href.includes("#") &&
                    activeSection === item.href.split("#")[1]);

                return item.href.includes("#") ? (
                  <a
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block p-4 rounded-xl transition-all duration-300 font-medium relative group border border-transparent hover:scale-[1.02]",
                      isActive
                        ? "text-red-400 bg-white/10 border-red-500/30"
                        : "text-white hover:text-red-400 hover:bg-white/5 hover:border-red-500/30"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      setTimeout(() => {
                        const [path, hash] = item.href.split("#");
                        if (path === "/" && window.location.pathname !== "/") {
                          // If we're not on homepage, navigate there first
                          window.location.href = item.href;
                        } else {
                          // If we're already on homepage, just scroll to section
                          const element = document.querySelector(`#${hash}`);
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "start",
                            });
                            setActiveSection(hash);
                          }
                        }
                      }, 300); // Small delay to allow menu to close
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full transition-transform",
                          isActive
                            ? "bg-red-400 scale-125"
                            : "bg-red-500 group-hover:scale-125"
                        )}
                      ></div>
                      <span className="text-lg">{item.name}</span>
                    </div>
                  </a>
                ) : (
                  <AnimatedLink
                    key={item.name}
                    href={item.href}
                    transitionType="fade"
                    className={cn(
                      "block p-4 rounded-xl transition-all duration-300 font-medium relative group border border-transparent hover:scale-[1.02]",
                      isActive
                        ? "text-red-400 bg-white/10 border-red-500/30"
                        : "text-white hover:text-red-400 hover:bg-white/5 hover:border-red-500/30"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full transition-transform",
                          isActive
                            ? "bg-red-400 scale-125"
                            : "bg-red-500 group-hover:scale-125"
                        )}
                      ></div>
                      <span className="text-lg">{item.name}</span>
                    </div>
                  </AnimatedLink>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700/50 bg-black/10">
            <div className="grid grid-cols-2 gap-4 text-center">
              <AnimatedLink
                href="/prayer-request"
                transitionType="fade"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105"
              >
                <Phone className="h-5 w-5 text-red-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Prayer Request</span>
              </AnimatedLink>
              <AnimatedLink
                href="/locations"
                transitionType="fade"
                onClick={() => setIsMenuOpen(false)}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105"
              >
                <MapPin className="h-5 w-5 text-red-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Locations</span>
              </AnimatedLink>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Philadelphia Missionary Church
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
