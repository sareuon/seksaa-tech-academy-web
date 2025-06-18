// Google Analytics 4 Configuration and Event Tracking
// Enhanced analytics for Seksaa Tech Academy

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// Check if GA is enabled
export const isGAEnabled = !!GA_TRACKING_ID && typeof window !== 'undefined';

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (!isGAEnabled || typeof window === 'undefined') return;
  
  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function() {
    window.dataLayer?.push(arguments);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_TRACKING_ID, {
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (!isGAEnabled) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_title: title || document.title,
    page_location: url,
  });
};

// Enhanced event tracking for education website
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (!isGAEnabled) return;
  
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
  
  trackEnrollmentComplete: (programName: string, programPrice?: number) => {
    trackEvent('purchase', 'Enrollment', programName, programPrice);
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
  
  // Content engagement
  trackDownload: (fileName: string, fileType: string) => {
    trackEvent('file_download', 'Content', `${fileName}.${fileType}`);
  },
  
  trackVideoPlay: (videoTitle: string) => {
    trackEvent('video_play', 'Media', videoTitle);
  },
  
  trackBlogRead: (articleTitle: string) => {
    trackEvent('blog_read', 'Content', articleTitle);
  },
  
  // Navigation and user flow
  trackInternalLink: (linkText: string, destination: string) => {
    trackEvent('click', 'Internal_Link', `${linkText} -> ${destination}`);
  },
  
  trackExternalLink: (linkText: string, destination: string) => {
    trackEvent('click', 'External_Link', `${linkText} -> ${destination}`);
  },
  
  // Search and filtering
  trackSearch: (searchTerm: string, resultCount?: number) => {
    trackEvent('search', 'Site_Search', searchTerm, resultCount);
  },
  
  trackFilter: (filterType: string, filterValue: string) => {
    trackEvent('filter', 'Content_Filter', `${filterType}: ${filterValue}`);
  },
  
  // Language and accessibility
  trackLanguageChange: (fromLang: string, toLang: string) => {
    trackEvent('language_change', 'Localization', `${fromLang} -> ${toLang}`);
  },
  
  // Social media
  trackSocialShare: (platform: string, contentType: string, contentTitle?: string) => {
    trackEvent('share', 'Social', `${platform}: ${contentType}${contentTitle ? ` - ${contentTitle}` : ''}`);
  },
  
  // Campus and virtual tour
  trackVirtualTour: (section?: string) => {
    trackEvent('virtual_tour', 'Campus', section || 'start');
  },
  
  trackCampusVisitRequest: () => {
    trackEvent('campus_visit_request', 'Contact', 'in_person');
  },
  
  // Error tracking
  trackError: (errorType: string, errorMessage: string) => {
    trackEvent('exception', 'Error', `${errorType}: ${errorMessage}`);
  },
  
  // Performance tracking
  trackPerformance: (metric: string, value: number, unit: string) => {
    trackEvent('timing_complete', 'Performance', `${metric} (${unit})`, value);
  },
  
  // Custom conversions for education sector
  trackConsultationBooked: (consultationType: 'general' | 'program_specific' | 'career_guidance') => {
    trackEvent('consultation_booked', 'Conversion', consultationType);
  },
  
  trackBrochureRequest: (programName?: string) => {
    trackEvent('brochure_request', 'Lead_Generation', programName || 'general');
  },
  
  trackNewsletterSignup: (source: string) => {
    trackEvent('newsletter_signup', 'Engagement', source);
  },
  
  // Scholarship and financial aid
  trackScholarshipInquiry: (programName?: string) => {
    trackEvent('scholarship_inquiry', 'Financial_Aid', programName);
  },
  
  trackPaymentPlanView: (planType: string) => {
    trackEvent('payment_plan_view', 'Financial', planType);
  }
};

// Enhanced conversion tracking
export const trackConversion = (conversionType: string, value?: number, currency = 'USD') => {
  if (!isGAEnabled) return;
  
  window.gtag('event', 'conversion', {
    send_to: GA_TRACKING_ID,
    value: value,
    currency: currency,
    transaction_id: Date.now().toString(),
  });
  
  // Also track as custom event
  trackEvent('conversion', 'Business', conversionType, value);
};

// User identification for enhanced tracking
export const identifyUser = (userId: string, userType: 'student' | 'prospect' | 'admin' = 'prospect') => {
  if (!isGAEnabled) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    user_id: userId,
    custom_map: {
      custom_dimension_1: userType
    }
  });
};

// Enhanced ecommerce tracking for course purchases
export const trackPurchase = (transactionId: string, items: Array<{
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  quantity: number;
}>, value: number, currency = 'USD') => {
  if (!isGAEnabled) return;
  
  window.gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items
  });
};

// Session quality tracking
export const trackEngagement = (engagementTime: number, scrollDepth: number) => {
  if (!isGAEnabled) return;
  
  window.gtag('event', 'user_engagement', {
    engagement_time_msec: engagementTime,
    custom_parameter_1: scrollDepth
  });
};

 