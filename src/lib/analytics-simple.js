// Simple Google Analytics 4 tracking utilities
// JavaScript version to avoid TypeScript configuration issues

export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Specific tracking functions for Seksaa Tech Academy
export const analytics = {
  // Program interactions
  trackProgramView: (programName) => {
    trackEvent('view_program', 'Programs', programName);
  },
  
  trackProgramEnrollment: (programName, programPrice) => {
    trackEvent('begin_enrollment', 'Enrollment', programName, programPrice);
  },
  
  // Contact and engagement
  trackContactForm: (formType) => {
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
  trackLanguageChange: (fromLang, toLang) => {
    trackEvent('language_change', 'Localization', `${fromLang} -> ${toLang}`);
  },
  
  // Navigation tracking
  trackInternalLink: (linkText, destination) => {
    trackEvent('click', 'Internal_Link', `${linkText} -> ${destination}`);
  },
  
  // Virtual tour and campus
  trackVirtualTour: (section) => {
    trackEvent('virtual_tour', 'Campus', section || 'start');
  },
  
  // Conversions
  trackConsultationBooked: (consultationType) => {
    trackEvent('consultation_booked', 'Conversion', consultationType);
  },
  
  trackNewsletterSignup: (source) => {
    trackEvent('newsletter_signup', 'Engagement', source);
  },
  
  // Downloads and content
  trackDownload: (fileName, fileType) => {
    trackEvent('file_download', 'Content', `${fileName}.${fileType}`);
  },
  
  trackBlogRead: (articleTitle) => {
    trackEvent('blog_read', 'Content', articleTitle);
  }
}; 