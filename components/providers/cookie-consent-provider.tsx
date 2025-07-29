"use client";

import { createContext, useContext, ReactNode } from "react";
import {
  useCookieConsent,
  type CookieConsent,
  type CookiePreferences,
} from "@/hooks/use-cookie-consent";

interface CookieConsentContextType {
  consent: CookieConsent;
  preferences: CookiePreferences;
  isLoaded: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  updatePreferences: (preferences: Partial<CookiePreferences>) => void;
  hasConsent: () => boolean;
  canTrackAnalytics: () => boolean;
  canTrackMarketing: () => boolean;
}

const CookieConsentContext = createContext<
  CookieConsentContextType | undefined
>(undefined);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const cookieConsent = useCookieConsent();

  return (
    <CookieConsentContext.Provider value={cookieConsent}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsentContext() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsentContext must be used within a CookieConsentProvider"
    );
  }
  return context;
}
