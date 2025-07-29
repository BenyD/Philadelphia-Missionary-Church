"use client";

import { useState } from "react";
import { Cookie, Settings, Shield, Database, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsentContext } from "@/components/providers/cookie-consent-provider";

export function CookiePreferences() {
  const { preferences, updatePreferences, acceptAll, rejectAll } =
    useCookieConsentContext();

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleAnalytics = () => {
    updatePreferences({ analytics: !preferences.analytics });
  };

  const handleToggleMarketing = () => {
    updatePreferences({ marketing: !preferences.marketing });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-red-100 rounded-lg">
          <Cookie className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Cookie Preferences
          </h3>
          <p className="text-sm text-gray-600">
            Manage your cookie settings and privacy preferences
          </p>
        </div>
      </div>

      {/* Essential Cookies - Always Enabled */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3">
            <Shield className="h-5 w-5 text-green-600" />
            <div>
              <h4 className="font-medium text-green-900">Essential Cookies</h4>
              <p className="text-sm text-green-700">
                Required for basic site functionality
              </p>
            </div>
          </div>
          <div className="w-12 h-6 bg-green-500 rounded-full relative">
            <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Analytics Cookies */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-900">Analytics Cookies</h4>
              <p className="text-sm text-blue-700">
                Help us understand how you use our website
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleAnalytics}
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
              preferences.analytics ? "bg-blue-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                preferences.analytics ? "right-1" : "left-1"
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Marketing Cookies */}
      <div className="mb-6">
        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-3">
            <Database className="h-5 w-5 text-purple-600" />
            <div>
              <h4 className="font-medium text-purple-900">Marketing Cookies</h4>
              <p className="text-sm text-purple-700">
                Used for personalized content and advertisements
              </p>
            </div>
          </div>
          <button
            onClick={handleToggleMarketing}
            className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${
              preferences.marketing ? "bg-purple-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                preferences.marketing ? "right-1" : "left-1"
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Button
          onClick={acceptAll}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white"
        >
          Accept All Cookies
        </Button>
        <Button
          onClick={rejectAll}
          variant="outline"
          className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Reject All
        </Button>
      </div>

      {/* Advanced Settings Toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <Settings className="h-4 w-4" />
        <span>Advanced Settings</span>
      </button>

      {/* Advanced Settings */}
      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-medium text-gray-900 mb-3">Advanced Settings</h4>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <strong>Essential Cookies:</strong> These cookies are necessary
              for the website to function properly and cannot be disabled.
            </p>
            <p>
              <strong>Analytics Cookies:</strong> These cookies help us
              understand how visitors interact with our website by collecting
              and reporting information anonymously.
            </p>
            <p>
              <strong>Marketing Cookies:</strong> These cookies are used to
              track visitors across websites to display relevant and engaging
              advertisements.
            </p>
          </div>
        </div>
      )}

      {/* Privacy Links */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a
            href="/privacy-policy"
            className="text-gray-600 hover:text-red-600 transition-colors flex items-center space-x-1"
          >
            <Shield className="h-4 w-4" />
            <span>Privacy Policy</span>
          </a>
          <a
            href="/cookie-policy"
            className="text-gray-600 hover:text-red-600 transition-colors flex items-center space-x-1"
          >
            <Cookie className="h-4 w-4" />
            <span>Cookie Policy</span>
          </a>
        </div>
      </div>
    </div>
  );
}
