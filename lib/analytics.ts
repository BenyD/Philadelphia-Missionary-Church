// Analytics utility that respects cookie consent

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export function trackPageView(url: string, canTrack: boolean = true) {
  if (!canTrack || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("config", "GA_MEASUREMENT_ID", {
    page_path: url,
  });
}

export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number,
  canTrack: boolean = true
) {
  if (!canTrack || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

export function trackCustomEvent(
  eventName: string,
  parameters: Record<string, any> = {},
  canTrack: boolean = true
) {
  if (!canTrack || typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("event", eventName, parameters);
}

// Initialize Google Analytics with consent mode
export function initializeAnalytics() {
  if (typeof window === "undefined") {
    return;
  }

  // Initialize gtag with consent mode
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    if (window.dataLayer) {
      window.dataLayer.push(arguments);
    }
  };

  window.gtag("js", new Date());
  window.gtag("config", "GA_MEASUREMENT_ID", {
    consent_mode: "default",
    analytics_storage: "denied",
    ad_storage: "denied",
  });
}

// Update consent mode based on user preferences
export function updateConsentMode(analytics: boolean, marketing: boolean) {
  if (typeof window === "undefined" || !window.gtag) {
    return;
  }

  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
  });
}

// Extend Window interface
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
} 