// Site Configuration
export const SITE_CONFIG = {
  name: "Seksaa Tech Academy",
  description: "Transform your career with cutting-edge tech programs. Part-time STEM and IT courses in Robotics, AI, Data Engineering, DevOps, and UX/UI. 100% job placement success.",
  url: "https://seksaatech.com",
  ogImage: "/images/og-image.jpg",
  creator: "Seksaa Tech Academy",
  keywords: [
    "tech education",
    "Cambodia",
    "STEM",
    "IT training",
    "programming bootcamp",
    "career transformation",
    "robotics",
    "AI",
    "data engineering",
    "DevOps",
    "UX/UI design"
  ],
  theme: {
    primary: "navy",
    secondary: "orange",
    colors: {
      navy: "#1e293b",
      orange: "#f97316",
      gradient: "from-navy-700 via-orange-500 to-navy-800"
    }
  }
};

// Contact Information
export const CONTACT_INFO = {
  phone: "+855 12 345 678",
  whatsapp: "+855123456789",
  email: "info@seksaatech.com",
  address: "Phnom Penh, Cambodia"
} as const;

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/seksaatech",
  twitter: "https://twitter.com/seksaatech",
  linkedin: "https://linkedin.com/company/seksaatech",
  instagram: "https://instagram.com/seksaatech"
} as const;

// Navigation Routes
export const ROUTES = {
  home: "/",
  programs: "/programs",
  instructors: "/instructors",
  schedule: "/schedule",
  blog: "/blog",
  contact: "/contact",
  enroll: "/enroll",
  successStories: "/success-stories",
  admin: "/admin",
  terms: "/terms",
  privacy: "/privacy"
} as const;

// Program Categories
export const PROGRAM_CATEGORIES = {
  STEM: "STEM",
  IT: "IT",
  DESIGN: "Design",
  DATA: "Data Science",
  ROBOTICS: "Robotics"
} as const;

export type ProgramCategory = typeof PROGRAM_CATEGORIES[keyof typeof PROGRAM_CATEGORIES]; 