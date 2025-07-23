"use client";

import { useState } from "react";
import { Menu, X, ArrowRight, Phone, MapPin, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { AnimatedLink } from "@/components/ui/animated-link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Events", href: "#events" },
    { name: "Ministries", href: "#ministries" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/10 backdrop-blur-md border-b border-white/20">
        <Container>
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <Logo size="md" className="hidden sm:flex" />
              <Logo size="sm" className="sm:hidden" showText={false} />
              <div className="sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  PMC Church
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <AnimatedLink
                  key={item.name}
                  href={item.href}
                  transitionType="fade"
                  className="text-gray-700 hover:text-red-600 transition-colors duration-200 font-medium relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-600 to-red-500 transition-all duration-300 group-hover:w-full"></span>
                </AnimatedLink>
              ))}
              <Button className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-2 rounded-full">
                Join Us
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 hover:from-red-100 hover:to-red-200 transition-all duration-300 border border-red-200/50 hover:border-red-300/50"
            >
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
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block p-4 rounded-xl text-white hover:text-red-400 hover:bg-white/5 transition-all duration-300 font-medium relative group border border-transparent hover:border-red-500/30 hover:scale-[1.02]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full group-hover:scale-125 transition-transform"></div>
                    <span className="text-lg">{item.name}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group">
                <span>Join Now</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button className="w-full bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 group hover:scale-[1.02]">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Watch Live Stream
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700/50 bg-black/10">
            <div className="grid grid-cols-2 gap-4 text-center">
              <a
                href="tel:+15551234567"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105"
              >
                <Phone className="h-5 w-5 text-red-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Call Us</span>
              </a>
              <a
                href="#"
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:scale-105"
              >
                <MapPin className="h-5 w-5 text-red-400 mx-auto mb-2" />
                <span className="text-sm text-gray-300">Directions</span>
              </a>
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
