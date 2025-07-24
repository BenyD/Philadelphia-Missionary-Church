"use client";

import { useState, useEffect } from "react";
import { X, Cookie, Shield, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem("cookie-consent");
    if (!cookieConsent) {
      // Show banner after a short delay
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setIsVisible(false);
  };

  const handleSettings = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4"
      >
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 border border-red-500/20 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.02)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-red-800/5 to-red-700/10"></div>

            {/* Accent Lines */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>

            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl border border-red-500/20">
                    <Cookie className="h-6 w-6 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Cookie Preferences
                    </h3>
                    <p className="text-sm text-gray-300">
                      We use cookies to enhance your experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReject}
                  className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Content */}
              <div className="mb-6">
                <p className="text-gray-200 leading-relaxed mb-4">
                  Philadelphia Missionary Church uses cookies to provide you
                  with the best possible experience on our website. These
                  cookies help us understand how you use our site and improve
                  our services.
                </p>

                {/* Cookie Types */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-white">
                        Essential
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      Required for basic site functionality
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-medium text-white">
                        Analytics
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      Help us understand site usage
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium text-white">
                        Marketing
                      </span>
                    </div>
                    <p className="text-xs text-gray-300">
                      Personalized content and ads
                    </p>
                  </div>
                </div>

                {/* Settings Toggle */}
                <button
                  onClick={handleSettings}
                  className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white transition-colors mb-4"
                >
                  <Settings className="h-4 w-4" />
                  <span>Advanced Settings</span>
                </button>

                {/* Advanced Settings */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-4 p-4 bg-black/20 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-white">
                              Essential Cookies
                            </h4>
                            <p className="text-xs text-gray-300">
                              Always active
                            </p>
                          </div>
                          <div className="w-12 h-6 bg-red-500 rounded-full relative">
                            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-white">
                              Analytics Cookies
                            </h4>
                            <p className="text-xs text-gray-300">
                              Help improve our website
                            </p>
                          </div>
                          <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer hover:bg-gray-500 transition-colors">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-white">
                              Marketing Cookies
                            </h4>
                            <p className="text-xs text-gray-300">
                              Personalized content
                            </p>
                          </div>
                          <div className="w-12 h-6 bg-gray-600 rounded-full relative cursor-pointer hover:bg-gray-500 transition-colors">
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Accept All Cookies
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-6 py-3 rounded-xl font-medium transition-all duration-300"
                >
                  Reject All
                </Button>
              </div>

              {/* Privacy Links */}
              <div className="mt-4 pt-4 border-t border-gray-700/50">
                <div className="flex flex-wrap justify-center gap-4 text-xs">
                  <a
                    href="/privacy-policy"
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center space-x-1"
                  >
                    <Shield className="h-3 w-3" />
                    <span>Privacy Policy</span>
                  </a>
                  <a
                    href="/cookie-policy"
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center space-x-1"
                  >
                    <Cookie className="h-3 w-3" />
                    <span>Cookie Policy</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
