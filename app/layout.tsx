import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationProvider } from "@/components/providers/navigation-provider";
import { SplashScreenProvider } from "@/components/providers/splash-screen-provider";
import { SupabaseProvider } from "@/components/providers/supabase-provider";
import { CookieConsentProvider } from "@/components/providers/cookie-consent-provider";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/ui/cookie-banner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "PMC Church - Philadelphia Missionary Church",
    template: "%s | PMC Church",
  },
  description:
    "Welcome to PMC Church - A welcoming community dedicated to spreading God's love and serving our neighbors. Join us for worship, fellowship, and spiritual growth.",
  keywords: [
    "church",
    "PMC",
    "Philadelphia Missionary Church",
    "worship",
    "fellowship",
    "Switzerland",
    "Christian community",
  ],
  authors: [{ name: "PMC Church" }],
  creator: "PMC Church",
  publisher: "PMC Church",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pmc-church.org"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pmc-church.org",
    title: "PMC Church - Philadelphia Missionary Church",
    description:
      "Welcome to PMC Church - A welcoming community dedicated to spreading God's love and serving our neighbors.",
    siteName: "PMC Church",
  },
  twitter: {
    card: "summary_large_image",
    title: "PMC Church - Philadelphia Missionary Church",
    description:
      "Welcome to PMC Church - A welcoming community dedicated to spreading God's love and serving our neighbors.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Preload critical CSS */}
        <link rel="preload" href="/globals.css" as="style" />

        {/* Preload critical images */}
        <link
          rel="preload"
          href="/images/logo.png"
          as="image"
          type="image/png"
        />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />

        {/* Performance hints */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Initialize performance monitoring
              if (typeof window !== 'undefined') {
                // Track Core Web Vitals
                if ('PerformanceObserver' in window) {
                  // LCP
                  new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                      console.log('LCP:', entry.startTime);
                    }
                  }).observe({ entryTypes: ['largest-contentful-paint'] });
                  
                  // FID
                  new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                      console.log('FID:', entry.processingStart - entry.startTime);
                    }
                  }).observe({ entryTypes: ['first-input'] });
                  
                  // CLS
                  let clsValue = 0;
                  new PerformanceObserver((entryList) => {
                    for (const entry of entryList.getEntries()) {
                      if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        console.log('CLS:', clsValue);
                      }
                    }
                  }).observe({ entryTypes: ['layout-shift'] });
                }
                
                // Track page load time
                window.addEventListener('load', () => {
                  const loadTime = performance.now();
                  console.log('Page Load Time:', loadTime);
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <SupabaseProvider>
          <CookieConsentProvider>
            <NavigationProvider>
              <SplashScreenProvider>{children}</SplashScreenProvider>
            </NavigationProvider>
            <Toaster />
            <CookieBanner />
          </CookieConsentProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
