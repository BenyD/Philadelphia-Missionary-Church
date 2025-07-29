"use client";

import { useState, useEffect } from "react";

export type CookieConsent = "accepted" | "rejected" | "partial" | null;

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent>(null);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true
    analytics: false,
    marketing: false,
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load cookie consent from localStorage
    const savedConsent = localStorage.getItem("cookie-consent") as CookieConsent;
    const savedPreferences = localStorage.getItem("cookie-preferences");
    
    if (savedConsent) {
      setConsent(savedConsent);
    }
    
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences({
          essential: true, // Always true
          analytics: parsed.analytics || false,
          marketing: parsed.marketing || false,
        });
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    }
    
    setIsLoaded(true);
  }, []);

  const acceptAll = () => {
    const newPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
    };
    
    setConsent("accepted");
    setPreferences(newPreferences);
    
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-preferences", JSON.stringify(newPreferences));
    
    // Trigger analytics if accepted
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "granted",
      });
    }
  };

  const rejectAll = () => {
    const newPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
    };
    
    setConsent("rejected");
    setPreferences(newPreferences);
    
    localStorage.setItem("cookie-consent", "rejected");
    localStorage.setItem("cookie-preferences", JSON.stringify(newPreferences));
    
    // Disable analytics if rejected
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "denied",
        ad_storage: "denied",
      });
    }
  };

  const updatePreferences = (newPreferences: Partial<CookiePreferences>) => {
    const updatedPreferences = {
      ...preferences,
      ...newPreferences,
      essential: true, // Always true
    };
    
    setPreferences(updatedPreferences);
    localStorage.setItem("cookie-preferences", JSON.stringify(updatedPreferences));
    
    // Determine consent type
    if (updatedPreferences.analytics && updatedPreferences.marketing) {
      setConsent("accepted");
      localStorage.setItem("cookie-consent", "accepted");
    } else if (!updatedPreferences.analytics && !updatedPreferences.marketing) {
      setConsent("rejected");
      localStorage.setItem("cookie-consent", "rejected");
    } else {
      setConsent("partial");
      localStorage.setItem("cookie-consent", "partial");
    }
    
    // Update analytics consent
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: updatedPreferences.analytics ? "granted" : "denied",
        ad_storage: updatedPreferences.marketing ? "granted" : "denied",
      });
    }
  };

  const hasConsent = () => {
    return consent !== null;
  };

  const canTrackAnalytics = () => {
    return preferences.analytics;
  };

  const canTrackMarketing = () => {
    return preferences.marketing;
  };

  return {
    consent,
    preferences,
    isLoaded,
    acceptAll,
    rejectAll,
    updatePreferences,
    hasConsent,
    canTrackAnalytics,
    canTrackMarketing,
  };
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
} 