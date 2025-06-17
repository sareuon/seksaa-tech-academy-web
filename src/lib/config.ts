// Third-party service configurations
export const config = {
  // Formspree form endpoints
  formspree: {
    contact: process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID || "https://formspree.io/f/your-contact-form-id",
    enrollment: process.env.NEXT_PUBLIC_FORMSPREE_ENROLLMENT_ID || "https://formspree.io/f/your-enrollment-form-id", 
    newsletter: process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ID || "https://formspree.io/f/your-newsletter-form-id",
    trialClass: process.env.NEXT_PUBLIC_FORMSPREE_TRIAL_CLASS_ID || "https://formspree.io/f/your-trial-class-form-id",
    consultation: process.env.NEXT_PUBLIC_FORMSPREE_CONSULTATION_ID || "https://formspree.io/f/your-consultation-form-id"
  },

  // Contact information
  contact: {
    email: {
      general: "info@seksaatech.com",
      admissions: "admissions@seksaatech.com",
      support: "support@seksaatech.com",
      careers: "careers@seksaatech.com"
    },
    phone: {
      main: "+855 12 345 678",
      whatsapp: "+855 12 345 678",
      emergency: "+855 23 123 456"
    },
    address: {
      street: "123 Tech Street",
      city: "Phnom Penh",
      province: "Phnom Penh",
      country: "Cambodia",
      postalCode: "12000"
    },
    social: {
      facebook: "https://facebook.com/seksaatech",
      instagram: "https://instagram.com/seksaatech", 
      linkedin: "https://linkedin.com/company/seksaatech",
      youtube: "https://youtube.com/@seksaatech",
      telegram: "https://t.me/seksaatech"
    }
  },

  // WhatsApp integration
  whatsapp: {
    businessNumber: "+85512345678",
    getWhatsAppUrl: (message: string = "Hello! I'm interested in your tech programs.") => {
      const encodedMessage = encodeURIComponent(message)
      return `https://wa.me/85512345678?text=${encodedMessage}`
    }
  },

  // Email service configuration (for future use)
  email: {
    service: process.env.EMAIL_SERVICE || "formspree", // formspree, emailjs, sendgrid
    templates: {
      welcome: "welcome-template",
      enrollment: "enrollment-confirmation",
      trialClass: "trial-class-confirmation",
      newsletter: "newsletter-welcome",
      contact: "contact-confirmation"
    }
  },

  // Analytics (for future implementation)
  analytics: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    facebookPixel: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
    hotjar: process.env.NEXT_PUBLIC_HOTJAR_ID
  },

  // Feature flags
  features: {
    newsletter: true,
    whatsappIntegration: true,
    liveChat: false,
    multiLanguage: false,
    darkMode: false
  }
}

// Helper functions
export const getFormspreeEndpoint = (formType: keyof typeof config.formspree) => {
  return config.formspree[formType]
}

export const getContactEmail = (type: keyof typeof config.contact.email) => {
  return config.contact.email[type]
}

export const getWhatsAppUrl = (message?: string) => {
  return config.whatsapp.getWhatsAppUrl(message)
}

export const getSocialUrl = (platform: keyof typeof config.contact.social) => {
  return config.contact.social[platform]
} 