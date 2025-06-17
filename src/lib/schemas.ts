import { z } from 'zod'

// Base schemas
export const BaseEntitySchema = z.object({
  id: z.string().min(1),
  createdAt: z.string(),
  updatedAt: z.string(),
  isActive: z.boolean().default(true)
})

export const LocalizedContentSchema = z.object({
  en: z.string().min(1),
  km: z.string().optional()
})

export const ContactInfoSchema = z.object({
  phone: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  socialMedia: z.object({
    facebook: z.string().url().optional(),
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    youtube: z.string().url().optional(),
    telegram: z.string().url().optional()
  })
})

// Program & Course schemas
export const SkillSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['technical', 'soft', 'tool']),
  level: z.enum(['beginner', 'intermediate', 'advanced'])
})

export const CourseModuleSchema = z.object({
  id: z.string().min(1),
  title: LocalizedContentSchema,
  description: LocalizedContentSchema,
  duration: z.number().positive(),
  objectives: z.array(LocalizedContentSchema),
  resources: z.array(z.string()).optional()
})

export const ProgramSchema = BaseEntitySchema.extend({
  title: LocalizedContentSchema,
  shortDescription: LocalizedContentSchema,
  fullDescription: LocalizedContentSchema,
  slug: z.string().min(1),
  category: z.enum(['ai', 'data', 'web', 'mobile', 'devops', 'cybersecurity', 'robotics', 'ux']),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  duration: z.object({
    weeks: z.number().positive(),
    hoursPerWeek: z.number().positive(),
    totalHours: z.number().positive()
  }),
  format: z.enum(['online', 'in-person', 'hybrid']),
  prerequisites: z.array(LocalizedContentSchema),
  learningOutcomes: z.array(LocalizedContentSchema),
  modules: z.array(CourseModuleSchema),
  skills: z.array(SkillSchema),
  certification: z.object({
    title: LocalizedContentSchema,
    accreditation: z.string().optional(),
    validityPeriod: z.string().optional()
  }),
  careerOutcomes: z.object({
    jobTitles: z.array(LocalizedContentSchema),
    averageSalary: z.object({
      min: z.number().positive(),
      max: z.number().positive(),
      currency: z.string().length(3)
    }).optional(),
    placementRate: z.number().min(0).max(100)
  }),
  pricing: z.object({
    fullPrice: z.number().positive(),
    currency: z.string().length(3)
  }),
  instructorIds: z.array(z.string()),
  featured: z.boolean().default(false),
  enrollmentStatus: z.enum(['open', 'closed', 'coming-soon', 'full']),
  maxStudents: z.number().positive().optional(),
  currentEnrollment: z.number().min(0).optional(),
  tags: z.array(z.string()),
  gallery: z.object({
    thumbnail: z.string().url(),
    images: z.array(z.string().url()),
    videos: z.array(z.string().url()).optional()
  })
})

// Instructor schemas
export const SocialProfileSchema = z.object({
  platform: z.enum(['linkedin', 'github', 'twitter', 'facebook', 'instagram']),
  url: z.string().url()
})

export const WorkExperienceSchema = z.object({
  company: z.string().min(1),
  position: LocalizedContentSchema,
  duration: z.string().min(1),
  description: LocalizedContentSchema,
  technologies: z.array(z.string()).optional()
})

export const EducationSchema = z.object({
  institution: z.string().min(1),
  degree: LocalizedContentSchema,
  field: LocalizedContentSchema,
  year: z.string().min(4),
  description: LocalizedContentSchema.optional()
})

export const InstructorSchema = BaseEntitySchema.extend({
  name: LocalizedContentSchema,
  title: LocalizedContentSchema,
  bio: LocalizedContentSchema,
  shortBio: LocalizedContentSchema,
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  profileImage: z.string().url(),
  specialties: z.array(z.string()),
  experience: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  certifications: z.array(z.object({
    name: LocalizedContentSchema,
    issuer: z.string().min(1),
    year: z.string().min(4),
    credential: z.string().optional()
  })),
  skills: z.array(SkillSchema),
  socialProfiles: z.array(SocialProfileSchema),
  teachingStyle: LocalizedContentSchema,
  achievements: z.array(LocalizedContentSchema),
  languages: z.array(z.enum(['english', 'khmer', 'chinese', 'french'])),
  availability: z.object({
    days: z.array(z.string()),
    timeSlots: z.array(z.string())
  }),
  rating: z.number().min(0).max(5).optional(),
  totalStudents: z.number().min(0).optional(),
  yearsExperience: z.number().min(0),
  featured: z.boolean().default(false)
})

// Testimonial schemas
export const StudentTestimonialSchema = BaseEntitySchema.extend({
  studentName: z.string().min(1),
  programId: z.string().min(1),
  courseTitle: LocalizedContentSchema,
  testimonial: LocalizedContentSchema,
  rating: z.number().min(1).max(5),
  studentImage: z.string().url().optional(),
  graduationDate: z.string().datetime(),
  currentPosition: LocalizedContentSchema.optional(),
  currentCompany: z.string().optional(),
  featured: z.boolean().default(false),
  beforeAfter: z.object({
    before: LocalizedContentSchema,
    after: LocalizedContentSchema
  }).optional(),
  linkedin: z.string().url().optional()
})

export const SuccessStorySchema = BaseEntitySchema.extend({
  studentName: z.string().min(1),
  title: LocalizedContentSchema,
  story: LocalizedContentSchema,
  programId: z.string().min(1),
  studentImage: z.string().url().optional(),
  currentPosition: LocalizedContentSchema,
  currentCompany: z.string().min(1),
  salaryIncrease: z.object({
    before: z.number().positive().optional(),
    after: z.number().positive(),
    percentage: z.number().positive(),
    currency: z.string().length(3)
  }).optional(),
  timeline: z.object({
    enrolled: z.string().datetime(),
    graduated: z.string().datetime(),
    employed: z.string().datetime()
  }),
  skills: z.array(z.string()),
  featured: z.boolean().default(false),
  quote: LocalizedContentSchema
})

// Blog schemas
export const BlogPostSchema = BaseEntitySchema.extend({
  title: LocalizedContentSchema,
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  excerpt: LocalizedContentSchema,
  content: LocalizedContentSchema,
  featuredImage: z.string().url(),
  authorId: z.string().min(1),
  category: z.enum(['technology', 'career', 'education', 'industry', 'student-life', 'success-stories']),
  tags: z.array(z.string()),
  publishedAt: z.string().datetime(),
  readingTime: z.number().positive(),
  featured: z.boolean().default(false),
  seoMetadata: z.object({
    metaTitle: LocalizedContentSchema,
    metaDescription: LocalizedContentSchema,
    keywords: z.array(z.string())
  })
})

export const ResourceSchema = BaseEntitySchema.extend({
  title: LocalizedContentSchema,
  description: LocalizedContentSchema,
  type: z.enum(['article', 'video', 'tool', 'guide', 'template', 'course']),
  url: z.string().url(),
  isExternal: z.boolean(),
  category: z.string().min(1),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  tags: z.array(z.string()),
  featured: z.boolean().default(false)
})

// Event schemas
export const EventSchema = BaseEntitySchema.extend({
  title: LocalizedContentSchema,
  description: LocalizedContentSchema,
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  type: z.enum(['workshop', 'webinar', 'info-session', 'career-fair', 'networking', 'graduation']),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  timezone: z.string().min(1),
  location: z.object({
    type: z.enum(['online', 'in-person', 'hybrid']),
    venue: LocalizedContentSchema.optional(),
    address: z.string().optional(),
    onlineLink: z.string().url().optional()
  }),
  capacity: z.number().positive().optional(),
  currentRegistrations: z.number().min(0).optional(),
  registrationDeadline: z.string().datetime(),
  price: z.number().min(0),
  currency: z.string().length(3),
  featured: z.boolean().default(false),
  speakers: z.array(z.object({
    name: z.string().min(1),
    title: LocalizedContentSchema,
    bio: LocalizedContentSchema,
    image: z.string().url().optional()
  })),
  agenda: z.array(z.object({
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    title: LocalizedContentSchema,
    description: LocalizedContentSchema,
    speaker: z.string().optional()
  })),
  requirements: z.array(LocalizedContentSchema).optional(),
  benefits: z.array(LocalizedContentSchema),
  tags: z.array(z.string()),
  gallery: z.array(z.string().url())
})

// FAQ schema
export const FAQSchema = BaseEntitySchema.extend({
  question: LocalizedContentSchema,
  answer: LocalizedContentSchema,
  category: z.enum(['general', 'enrollment', 'programs', 'payment', 'technical', 'career']),
  featured: z.boolean().default(false),
  order: z.number().min(0),
  tags: z.array(z.string())
})

// Form schemas
export const ContactSubmissionSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
  interestedProgram: z.string().optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'whatsapp']),
  status: z.enum(['new', 'contacted', 'converted', 'closed']).default('new'),
  submittedAt: z.string().datetime(),
  source: z.enum(['website', 'social', 'referral', 'advertisement']).default('website')
})

export const EnrollmentApplicationSchema = z.object({
  id: z.string().min(1),
  personalInfo: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    dateOfBirth: z.string().datetime(),
    nationality: z.string().min(1),
    address: z.object({
      street: z.string().min(1),
      city: z.string().min(1),
      province: z.string().min(1),
      postalCode: z.string().min(1),
      country: z.string().min(1)
    })
  }),
  programInfo: z.object({
    programId: z.string().min(1),
    startDate: z.string().datetime(),
    preferredSchedule: z.string().min(1),
    paymentPlan: z.enum(['full', 'installment'])
  }),
  background: z.object({
    education: z.string().min(1),
    workExperience: z.string().min(1),
    technicalExperience: z.string().min(1),
    motivation: z.string().min(10),
    goals: z.string().min(10)
  }),
  emergency: z.object({
    contactName: z.string().min(1),
    relationship: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email()
  }),
  status: z.enum(['pending', 'approved', 'rejected', 'waitlist']).default('pending'),
  submittedAt: z.string().datetime(),
  reviewedAt: z.string().datetime().optional(),
  reviewedBy: z.string().optional(),
  notes: z.string().optional()
})

// Site configuration schema
export const SiteConfigSchema = z.object({
  general: z.object({
    siteName: LocalizedContentSchema,
    description: LocalizedContentSchema,
    defaultLanguage: z.enum(['en', 'km'])
  }),
  contact: ContactInfoSchema,
  business: z.object({
    foundedYear: z.number().min(2000).max(new Date().getFullYear()),
    registrationNumber: z.string().optional(),
    taxId: z.string().optional(),
    accreditations: z.array(z.object({
      name: LocalizedContentSchema,
      issuer: z.string().min(1),
      year: z.string().min(4),
      validUntil: z.string().optional()
    }))
  }),
  statistics: z.object({
    totalGraduates: z.number().min(0),
    jobPlacementRate: z.number().min(0).max(100),
    totalBootcamps: z.number().min(0)
  }),
  features: z.object({
    multiLanguage: z.boolean(),
    darkMode: z.boolean(),
    notifications: z.boolean(),
    livechat: z.boolean(),
    blog: z.boolean(),
    events: z.boolean(),
    forum: z.boolean(),
    studentPortal: z.boolean()
  }),
  integrations: z.object({
    analytics: z.object({
      googleAnalytics: z.string().optional(),
      facebookPixel: z.string().optional()
    }),
    payments: z.object({
      stripe: z.string().optional(),
      paypal: z.string().optional()
    }),
    communication: z.object({
      emailService: z.string().optional(),
      smsService: z.string().optional(),
      chatService: z.string().optional()
    }),
    social: z.object({
      facebookAppId: z.string().optional(),
      googleClientId: z.string().optional()
    })
  }),
  seo: z.object({
    defaultMetaTitle: LocalizedContentSchema,
    defaultMetaDescription: LocalizedContentSchema,
    defaultKeywords: z.array(z.string()),
    ogImage: z.string().url(),
    twitterHandle: z.string().optional()
  })
})

// Filter schemas
export const ProgramFiltersSchema = z.object({
  category: z.array(z.enum(['ai', 'data', 'web', 'mobile', 'devops', 'cybersecurity', 'robotics', 'ux'])).optional(),
  level: z.array(z.enum(['beginner', 'intermediate', 'advanced'])).optional(),
  format: z.array(z.enum(['online', 'in-person', 'hybrid'])).optional(),
  duration: z.object({
    min: z.number().positive().optional(),
    max: z.number().positive().optional()
  }).optional(),
  featured: z.boolean().optional(),
  enrollmentStatus: z.array(z.enum(['open', 'closed', 'coming-soon', 'full'])).optional()
})

export const EventFiltersSchema = z.object({
  type: z.array(z.enum(['workshop', 'webinar', 'info-session', 'career-fair', 'networking', 'graduation'])).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  location: z.array(z.enum(['online', 'in-person', 'hybrid'])).optional(),
  featured: z.boolean().optional()
})

export const BlogFiltersSchema = z.object({
  category: z.array(z.enum(['technology', 'career', 'education', 'industry', 'student-life', 'success-stories'])).optional(),
  tags: z.array(z.string()).optional(),
  author: z.string().optional(),
  featured: z.boolean().optional(),
  publishedAfter: z.string().datetime().optional(),
  publishedBefore: z.string().datetime().optional()
})

// Utility function to validate data with schema
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}

// Helper to safely parse data with error handling
export function safeParseData<T>(schema: z.ZodSchema<T>, data: unknown) {
  return schema.safeParse(data)
} 