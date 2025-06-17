// Base types
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

export interface LocalizedContent {
  en: string
  km?: string
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
  socialMedia: {
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
    telegram?: string
  }
}

// Program & Course Types
export interface Skill {
  name: string
  category: 'technical' | 'soft' | 'tool'
  level: 'beginner' | 'intermediate' | 'advanced'
}

export interface CourseModule {
  id: string
  title: LocalizedContent
  description: LocalizedContent
  duration: number // in hours
  objectives: LocalizedContent[]
  resources?: string[]
}

export interface ProgramModule {
  id: string
  title: LocalizedContent
  description: LocalizedContent
  duration: number
  objectives: LocalizedContent[]
}

export interface ProgramSkill {
  name: string
  category: 'technical' | 'tool' | 'soft'
  level: 'beginner' | 'intermediate' | 'advanced'
}

export interface ProgramDuration {
  weeks: number
  hoursPerWeek: number
  totalHours: number
}

export interface ProgramPricing {
  fullPrice: number
  currency: string
  discountPrice?: number
}

export interface Program {
  id: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  title: LocalizedContent
  shortDescription: LocalizedContent
  fullDescription: LocalizedContent
  slug: string
  category: 'ai' | 'data' | 'web' | 'mobile' | 'devops' | 'cybersecurity' | 'robotics' | 'ux'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration: ProgramDuration
  format: 'online' | 'in-person' | 'hybrid'
  schedule: {
    days: ('monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday')[]
    timeSlots: string[]
    startDates: string[]
  }
  prerequisites: LocalizedContent[]
  learningOutcomes: LocalizedContent[]
  modules: ProgramModule[]
  skills: ProgramSkill[]
  certification: {
    title: LocalizedContent
    accreditation?: string
    validityPeriod?: string
  }
  careerOutcomes: {
    jobTitles: LocalizedContent[]
    averageSalary?: {
      min: number
      max: number
      currency: string
    }
    placementRate: number
  }
  pricing: ProgramPricing
  instructorIds: string[]
  featured: boolean
  enrollmentStatus: 'open' | 'closed' | 'coming-soon' | 'full'
  maxStudents?: number
  currentEnrollment?: number
  tags: string[]
  gallery: {
    thumbnail: string
    images: string[]
    videos?: string[]
  }
}

// Instructor Types
export interface SocialProfile {
  platform: 'linkedin' | 'github' | 'twitter' | 'facebook' | 'instagram'
  url: string
}

export interface WorkExperience {
  company: string
  position: LocalizedContent
  duration: string
  description: LocalizedContent
  technologies?: string[]
}

export interface Education {
  institution: string
  degree: LocalizedContent
  field: LocalizedContent
  year: string
  description?: LocalizedContent
}

export interface Instructor extends BaseEntity {
  name: LocalizedContent
  title: LocalizedContent
  bio: LocalizedContent
  shortBio: LocalizedContent
  slug: string
  profileImage: string
  specialties: string[]
  experience: WorkExperience[]
  education: Education[]
  certifications: {
    name: LocalizedContent
    issuer: string
    year: string
    credential?: string
  }[]
  skills: Skill[]
  socialProfiles: SocialProfile[]
  teachingStyle: LocalizedContent
  achievements: LocalizedContent[]
  languages: ('english' | 'khmer' | 'chinese' | 'french')[]
  availability: {
    days: string[]
    timeSlots: string[]
  }
  rating?: number
  totalStudents?: number
  yearsExperience: number
  featured: boolean
}

// Testimonial & Success Story Types
export interface BeforeAfter {
  before: LocalizedContent
  after: LocalizedContent
}

export interface Testimonial {
  id: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  studentName: string
  programId: string
  courseTitle: LocalizedContent
  testimonial: LocalizedContent
  rating: number
  studentImage: string
  graduationDate: string
  currentPosition: LocalizedContent
  currentCompany: string
  featured: boolean
  beforeAfter: BeforeAfter
  linkedin?: string
}

export interface SalaryIncrease {
  before?: number
  after: number
  percentage: number
  currency: string
}

export interface Timeline {
  enrolled: string
  graduated: string
  employed: string
}

export interface SuccessStory {
  id: string
  createdAt: string
  updatedAt: string
  isActive: boolean
  studentName: string
  title: LocalizedContent
  story: LocalizedContent
  programId: string
  studentImage: string
  currentPosition: LocalizedContent
  currentCompany: string
  salaryIncrease: SalaryIncrease
  timeline: Timeline
  skills: string[]
  featured: boolean
  quote: LocalizedContent
}

// Blog & Content Types
export interface BlogPost extends BaseEntity {
  title: LocalizedContent
  slug: string
  excerpt: LocalizedContent
  content: LocalizedContent
  featuredImage: string
  authorId: string
  category: 'technology' | 'career' | 'education' | 'industry' | 'student-life' | 'success-stories'
  tags: string[]
  publishedAt: string
  readingTime: number
  featured: boolean
  seoMetadata: {
    metaTitle: LocalizedContent
    metaDescription: LocalizedContent
    keywords: string[]
  }
}

export interface Resource extends BaseEntity {
  title: LocalizedContent
  description: LocalizedContent
  type: 'article' | 'video' | 'tool' | 'guide' | 'template' | 'course'
  url: string
  isExternal: boolean
  category: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  featured: boolean
}

// Event Types
export interface Event extends BaseEntity {
  title: LocalizedContent
  description: LocalizedContent
  slug: string
  type: 'workshop' | 'webinar' | 'info-session' | 'career-fair' | 'networking' | 'graduation'
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  timezone: string
  location: {
    type: 'online' | 'in-person' | 'hybrid'
    venue?: LocalizedContent
    address?: string
    onlineLink?: string
  }
  capacity?: number
  currentRegistrations?: number
  registrationDeadline: string
  price: number
  currency: string
  featured: boolean
  speakers: {
    name: string
    title: LocalizedContent
    bio: LocalizedContent
    image?: string
  }[]
  agenda: {
    time: string
    title: LocalizedContent
    description: LocalizedContent
    speaker?: string
  }[]
  requirements?: LocalizedContent[]
  benefits: LocalizedContent[]
  tags: string[]
  gallery: string[]
}

// FAQ Types
export interface FAQ extends BaseEntity {
  question: LocalizedContent
  answer: LocalizedContent
  category: 'general' | 'enrollment' | 'programs' | 'payment' | 'technical' | 'career'
  featured: boolean
  order: number
  tags: string[]
}

// Form & Contact Types
export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  interestedProgram?: string
  preferredContactMethod: 'email' | 'phone' | 'whatsapp'
  status: 'new' | 'contacted' | 'converted' | 'closed'
  submittedAt: string
  source: 'website' | 'social' | 'referral' | 'advertisement'
}

export interface EnrollmentApplication {
  id: string
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dateOfBirth: string
    nationality: string
    address: {
      street: string
      city: string
      province: string
      postalCode: string
      country: string
    }
  }
  programInfo: {
    programId: string
    startDate: string
    preferredSchedule: string
    paymentPlan: 'full' | 'installment'
  }
  background: {
    education: string
    workExperience: string
    technicalExperience: string
    motivation: string
    goals: string
  }
  emergency: {
    contactName: string
    relationship: string
    phone: string
    email: string
  }
  status: 'pending' | 'approved' | 'rejected' | 'waitlist'
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  notes?: string
}

// Site Configuration Types
export interface MultiLanguageText {
  en: string
  km: string
}

export interface SiteConfig {
  general: {
    siteName: MultiLanguageText
    description: MultiLanguageText
    defaultLanguage: string
  }
  contact: ContactInfo
  business: {
    foundedYear: number
    registrationNumber?: string
    taxId?: string
    accreditations: {
      name: LocalizedContent
      issuer: string
      year: string
      validUntil?: string
    }[]
  }
  statistics: {
    totalGraduates: number
    jobPlacementRate: number
    totalBootcamps: number
  }
  features: {
    multiLanguage: boolean
    darkMode: boolean
    notifications: boolean
    livechat: boolean
    blog: boolean
    events: boolean
    forum: boolean
    studentPortal: boolean
  }
  integrations: {
    analytics: {
      googleAnalytics?: string
      facebookPixel?: string
    }
    payments: {
      stripe?: string
      paypal?: string
    }
    communication: {
      emailService?: string
      smsService?: string
      chatService?: string
    }
    social: {
      facebookAppId?: string
      googleClientId?: string
    }
  }
  seo: {
    defaultMetaTitle: LocalizedContent
    defaultMetaDescription: LocalizedContent
    defaultKeywords: string[]
    ogImage: string
    twitterHandle?: string
  }
}

// Utility Types
export type SupportedLanguage = 'en' | 'km'
export type ProgramCategory = Program['category']
export type InstructorSpecialty = string
export type EventType = Event['type']
export type BlogCategory = BlogPost['category']

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Filter Types
export interface ProgramFilters {
  category?: ProgramCategory[]
  level?: Program['level'][]
  format?: Program['format'][]
  duration?: {
    min?: number
    max?: number
  }
  featured?: boolean
  enrollmentStatus?: Program['enrollmentStatus'][]
}

export interface EventFilters {
  type?: EventType[]
  startDate?: string
  endDate?: string
  location?: Event['location']['type'][]
  featured?: boolean
}

export interface BlogFilters {
  category?: BlogCategory[]
  tags?: string[]
  author?: string
  featured?: boolean
  publishedAfter?: string
  publishedBefore?: string
}

// Data Structure Types
export interface ProgramsData {
  programs: Program[]
}

export interface CareerOutcomes {
  placementRate: number
  averageSalaryIncrease: number
  timeToEmployment: number
  topEmployers: string[]
  industryDistribution: {
    [key: string]: number
  }
}

export interface ProjectPortfolio {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  demoUrl?: string
  githubUrl?: string
  imageUrl: string
  program: string
  featured: boolean
}

export interface TestimonialsData {
  testimonials: Testimonial[]
  successStories: SuccessStory[]
  careerOutcomes: CareerOutcomes
  projectPortfolio: ProjectPortfolio[]
}

// Component Props Types
export interface ProgramCardProps {
  program: Program
  language?: 'en' | 'km'
}

export interface TestimonialCardProps {
  testimonial: Testimonial
  language?: 'en' | 'km'
}

export interface SuccessStoryCardProps {
  story: SuccessStory
  language?: 'en' | 'km'
}

// Enrollment System Types
export interface PaymentPlan {
  id: string
  name: {
    en: string
    km: string
  }
  description: {
    en: string
    km: string
  }
  discountPercentage: number
  installments: number
  featured: boolean
}

export interface EnrollmentStep {
  id: string
  title: {
    en: string
    km: string
  }
  description: {
    en: string
    km: string
  }
  fields: string[]
}

export interface Scholarship {
  id: string
  name: {
    en: string
    km: string
  }
  description: {
    en: string
    km: string
  }
  discountPercentage: number
  requirements: string[]
  available: boolean
}

export interface EnrollmentRequirements {
  general: Array<{
    en: string
    km: string
  }>
  programSpecific: {
    [programId: string]: Array<{
      en: string
      km: string
    }>
  }
}

export interface OnboardingStep {
  step: number
  title: {
    en: string
    km: string
  }
  description: {
    en: string
    km: string
  }
  timeline: string
}

export interface SupportService {
  id: string
  name: {
    en: string
    km: string
  }
  description: {
    en: string
    km: string
  }
  included: boolean
}

export interface EnrollmentData {
  paymentPlans: PaymentPlan[]
  enrollmentSteps: EnrollmentStep[]
  scholarships: Scholarship[]
  enrollmentRequirements: EnrollmentRequirements
  onboardingProcess: OnboardingStep[]
  supportServices: SupportService[]
}

export interface EnrollmentFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  city: string
  emergencyContact: string
  
  // Program Selection
  programId: string
  schedulePreference: string
  startDate: string
  learningFormat: 'online' | 'in-person' | 'hybrid'
  
  // Background Information
  education: string
  workExperience: string
  programmingExperience: string
  goals: string
  motivation: string
  
  // Payment Information
  paymentPlan: string
  billingAddress: string
  paymentMethod: string
  
  // Optional
  scholarshipId?: string
  referralSource?: string
  specialRequirements?: string
}

// Admin Dashboard Types
export interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  permissions: string[]
  lastLogin: string
  isActive: boolean
  createdAt: string
}

export interface AdminRole {
  id: string
  name: string
  description: string
  permissions: string[]
  color: string
}

export interface AdminPermission {
  id: string
  name: string
  description: string
}

export interface DashboardMetrics {
  overview: {
    totalStudents: number
    activeEnrollments: number
    totalRevenue: number
    monthlyRevenue: number
    completionRate: number
    jobPlacementRate: number
    averageRating: number
    totalInstructors: number
  }
  enrollments: {
    thisMonth: number
    lastMonth: number
    growthRate: number
    byProgram: Record<string, number>
    byPaymentPlan: Record<string, number>
  }
  revenue: {
    thisMonth: number
    lastMonth: number
    growthRate: number
    byProgram: Record<string, number>
    projectedAnnual: number
  }
  students: {
    active: number
    graduated: number
    dropoutRate: number
    averageAge: number
    genderDistribution: Record<string, number>
    locationDistribution: Record<string, number>
  }
  programs: {
    totalPrograms: number
    averageRating: number
    mostPopular: string
    highestRevenue: string
    completionRates: Record<string, number>
  }
  instructors: {
    totalInstructors: number
    averageRating: number
    totalStudentsTaught: number
    topRated: string
    mostExperienced: string
  }
}

export interface AdminActivity {
  id: string
  type: 'enrollment' | 'program_update' | 'instructor_added' | 'testimonial_approved' | 'blog_published' | 'payment' | 'system'
  title: string
  description: string
  timestamp: string
  user: string
  metadata?: Record<string, any>
}

export interface AdminNotification {
  id: string
  type: 'urgent' | 'warning' | 'info' | 'success'
  title: string
  message: string
  timestamp: string
  isRead: boolean
  actionRequired: boolean
  metadata?: Record<string, any>
}

export interface QuickAction {
  id: string
  title: string
  description: string
  icon: string
  color: string
  permission: string
}

export interface SystemHealth {
  status: 'healthy' | 'warning' | 'critical'
  uptime: number
  lastBackup: string
  databaseSize: string
  activeUsers: number
  serverLoad: number
  memoryUsage: number
  diskUsage: number
  errors24h: number
  warnings24h: number
}

export interface AdminData {
  adminUsers: AdminUser[]
  roles: AdminRole[]
  permissions: AdminPermission[]
  dashboardMetrics: DashboardMetrics
  recentActivities: AdminActivity[]
  notifications: AdminNotification[]
  quickActions: QuickAction[]
  systemHealth: SystemHealth
}

// Student Management Types
export interface StudentRecord {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  enrollmentDate: string
  programId: string
  paymentPlan: string
  status: 'active' | 'completed' | 'dropped' | 'suspended'
  progress: number
  grade?: number
  notes?: string
  lastActivity: string
}

// Inquiry Management Types
export interface StudentInquiry {
  id: string
  name: string
  email: string
  phone?: string
  programInterest: string
  message: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'enrolled' | 'closed'
  priority: 'low' | 'medium' | 'high'
  assignedTo?: string
  createdAt: string
  updatedAt: string
  notes?: string
}

// Security & Privacy Types
export interface PrivacyPolicySection {
  id: string
  title: {
    en: string
    km: string
  }
  content: {
    en: string
    km: string
  }
}

export interface PrivacyPolicy {
  lastUpdated: string
  version: string
  sections: PrivacyPolicySection[]
}

export interface TermsOfServiceSection {
  id: string
  title: {
    en: string
    km: string
  }
  content: {
    en: string
    km: string
  }
}

export interface TermsOfService {
  lastUpdated: string
  version: string
  sections: TermsOfServiceSection[]
}

export interface Cookie {
  name: string
  purpose: string
  duration: string
  type: 'HTTP' | 'JavaScript' | 'LocalStorage'
}

export interface CookieCategory {
  id: string
  name: {
    en: string
    km: string
  }
  description: {
    en: string
    km: string
  }
  required: boolean
  cookies: Cookie[]
}

export interface CookiePolicy {
  lastUpdated: string
  version: string
  categories: CookieCategory[]
}

export interface DataProcessingBasis {
  type: 'consent' | 'contract' | 'legitimate_interest' | 'legal_obligation' | 'vital_interests' | 'public_task'
  description: string
}

export interface GDPRCompliance {
  dataProcessingBasis: DataProcessingBasis[]
  dataRetention: Record<string, string>
  dataSubjectRights: string[]
}

export interface PasswordPolicy {
  minLength: number
  requireUppercase: boolean
  requireLowercase: boolean
  requireNumbers: boolean
  requireSpecialChars: boolean
  maxAge: number
}

export interface TwoFactorAuth {
  enabled: boolean
  methods: string[]
}

export interface SessionManagement {
  timeout: number
  maxConcurrentSessions: number
  secureFlags: boolean
}

export interface Authentication {
  passwordPolicy: PasswordPolicy
  twoFactorAuth: TwoFactorAuth
  sessionManagement: SessionManagement
}

export interface Encryption {
  inTransit: string
  atRest: string
  database: string
}

export interface AccessControl {
  roleBasedAccess: boolean
  principleOfLeastPrivilege: boolean
  regularAccessReviews: boolean
}

export interface SecurityMonitoring {
  securityLogs: boolean
  intrusionDetection: boolean
  vulnerabilityScanning: boolean
  incidentResponse: boolean
}

export interface SecurityMeasures {
  encryption: Encryption
  authentication: Authentication
  accessControl: AccessControl
  monitoring: SecurityMonitoring
}

export interface ComplianceFramework {
  name: string
  description: string
  status: 'compliant' | 'in_progress' | 'non_compliant'
  lastAudit?: string
  targetDate?: string
}

export interface IncidentContact {
  role: string
  email: string
  phone: string
}

export interface IncidentProcedure {
  step: number
  action: string
}

export interface IncidentResponse {
  contacts: IncidentContact[]
  procedures: IncidentProcedure[]
}

export interface SecurityData {
  privacyPolicy: PrivacyPolicy
  termsOfService: TermsOfService
  cookiePolicy: CookiePolicy
  gdprCompliance: GDPRCompliance
  securityMeasures: SecurityMeasures
  complianceFrameworks: ComplianceFramework[]
  incidentResponse: IncidentResponse
}

// Cookie Consent Types
export interface CookieConsent {
  userId?: string
  sessionId: string
  consentDate: string
  consentVersion: string
  categories: {
    essential: boolean
    analytics: boolean
    marketing: boolean
    functional?: boolean
  }
  ipAddress?: string
  userAgent?: string
}

// Privacy Request Types
export interface PrivacyRequest {
  id: string
  type: 'access' | 'rectification' | 'erasure' | 'restrict_processing' | 'data_portability' | 'object' | 'withdraw_consent'
  userId?: string
  email: string
  name: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'rejected'
  submittedAt: string
  processedAt?: string
  processedBy?: string
  response?: string
  attachments?: string[]
}

// Security Audit Types
export interface SecurityAuditLog {
  id: string
  timestamp: string
  userId?: string
  action: string
  resource: string
  ipAddress: string
  userAgent: string
  success: boolean
  details?: Record<string, any>
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

export interface SecurityIncident {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'investigating' | 'contained' | 'resolved' | 'closed'
  reportedAt: string
  reportedBy: string
  assignedTo?: string
  affectedSystems: string[]
  affectedUsers?: number
  timeline: {
    timestamp: string
    action: string
    performedBy: string
  }[]
  resolution?: string
  lessonsLearned?: string
} 