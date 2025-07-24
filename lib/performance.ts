// Performance monitoring utilities
export const performanceMetrics = {
  // Track Core Web Vitals
  trackLCP: () => {
    if (typeof window !== "undefined") {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log("LCP:", entry.startTime);
          // Send to analytics service
        }
      }).observe({ entryTypes: ["largest-contentful-paint"] });
    }
  },

  trackFID: () => {
    if (typeof window !== "undefined") {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log("FID:", (entry as any).processingStart - entry.startTime);
          // Send to analytics service
        }
      }).observe({ entryTypes: ["first-input"] });
    }
  },

  trackCLS: () => {
    if (typeof window !== "undefined") {
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!("hadRecentInput" in entry) || !entry.hadRecentInput) {
            clsValue += (entry as any).value;
            console.log("CLS:", clsValue);
            // Send to analytics service
          }
        }
      }).observe({ entryTypes: ["layout-shift"] });
    }
  },

  // Track page load time
  trackPageLoad: () => {
    if (typeof window !== "undefined") {
      window.addEventListener("load", () => {
        const loadTime = performance.now();
        console.log("Page Load Time:", loadTime);
        // Send to analytics service
      });
    }
  },

  // Track resource loading
  trackResources: () => {
    if (typeof window !== "undefined") {
      const resources = performance.getEntriesByType("resource");
      resources.forEach((resource) => {
        if (resource.duration > 1000) {
          // Log slow resources
          console.log("Slow Resource:", resource.name, resource.duration);
        }
      });
    }
  },

  // Initialize all tracking
  init: () => {
    if (typeof window !== "undefined") {
      performanceMetrics.trackLCP();
      performanceMetrics.trackFID();
      performanceMetrics.trackCLS();
      performanceMetrics.trackPageLoad();
      performanceMetrics.trackResources();
    }
  },
};

// Lazy loading utility
export const lazyLoad = {
  // Intersection Observer for lazy loading images
  observeImages: () => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || "";
            img.classList.remove("lazy");
            observer.unobserve(img);
          }
        });
      });

      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    }
  },

  // Lazy load components
  loadComponent: (importFn: () => Promise<any>) => {
    return importFn().then((module) => module.default);
  },
};

// Cache utilities
export const cacheUtils = {
  // Set cache headers
  setCacheHeaders: (response: Response, maxAge: number = 3600) => {
    response.headers.set(
      "Cache-Control",
      `public, max-age=${maxAge}, s-maxage=${maxAge}`
    );
    return response;
  },

  // Check if resource is cached
  isCached: (url: string) => {
    return caches.match(url).then((response) => !!response);
  },
};
