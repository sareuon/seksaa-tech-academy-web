'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Simple GA configuration without external dependencies
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Check if GA is enabled
const isGAEnabled = !!GA_TRACKING_ID;

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isGAEnabled) return;

    // Load Google Analytics script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });

    return () => {
      // Cleanup script on unmount
      const scripts = document.querySelectorAll(`script[src*="${GA_TRACKING_ID}"]`);
      scripts.forEach(script => script.remove());
    };
  }, []);

  useEffect(() => {
    if (!isGAEnabled || !window.gtag) return;

    const url = pathname + searchParams.toString();
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.origin + url,
    });
  }, [pathname, searchParams]);

  return null;
}

// Export simplified tracking functions for use in components
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!isGAEnabled || !window.gtag) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Specific tracking functions for Seksaa Tech Academy
export const analytics = {
  // Program interactions
  trackProgramView: (programName: string) => {
    trackEvent('view_program', 'Programs', programName);
  },
  
  trackProgramEnrollment: (programName: string, programPrice?: number) => {
    trackEvent('begin_enrollment', 'Enrollment', programName, programPrice);
  },
  
  // Contact and engagement
  trackContactForm: (formType: 'general' | 'enrollment' | 'consultation' | 'newsletter') => {
    trackEvent('form_submit', 'Contact', formType);
  },
  
  trackWhatsAppClick: () => {
    trackEvent('click', 'WhatsApp', 'contact_button');
  },
  
  trackPhoneCall: () => {
    trackEvent('click', 'Phone', 'call_button');
  },
  
  trackEmailClick: () => {
    trackEvent('click', 'Email', 'email_link');
  },
  
  // Language switching
  trackLanguageChange: (fromLang: string, toLang: string) => {
    trackEvent('language_change', 'Localization', `${fromLang} -> ${toLang}`);
  },
  
  // Navigation tracking
  trackInternalLink: (linkText: string, destination: string) => {
    trackEvent('click', 'Internal_Link', `${linkText} -> ${destination}`);
  },
  
  // Virtual tour and campus
  trackVirtualTour: (section?: string) => {
    trackEvent('virtual_tour', 'Campus', section || 'start');
  },
  
  // Conversions
  trackConsultationBooked: (consultationType: 'general' | 'program_specific' | 'career_guidance') => {
    trackEvent('consultation_booked', 'Conversion', consultationType);
  },
  
  trackNewsletterSignup: (source: string) => {
    trackEvent('newsletter_signup', 'Engagement', source);
  }
}; 