import { 
  Program, 
  ProgramsData, 
  Testimonial, 
  TestimonialsData, 
  SiteConfig, 
  SuccessStory,
  EnrollmentData,
  PaymentPlan,
  Scholarship,
  EnrollmentStep,
  OnboardingStep,
  SupportService,
  EnrollmentRequirements,
  AdminData,
  AdminUser,
  AdminRole,
  AdminPermission,
  DashboardMetrics,
  AdminActivity,
  AdminNotification,
  QuickAction,
  SystemHealth,
  StudentRecord,
  StudentInquiry,
  SecurityData,
  PrivacyPolicy,
  TermsOfService,
  CookiePolicy,
  GDPRCompliance,
  SecurityMeasures,
  ComplianceFramework,
  IncidentResponse,
  CookieConsent,
  PrivacyRequest,
  SecurityAuditLog,
  SecurityIncident
} from '@/types'

// Import static data
import programsData from '@/data/programs.json'
import testimonialsData from '@/data/testimonials.json'
import siteConfigData from '@/data/site-config.json'
import enrollmentData from '@/data/enrollment.json'
import adminData from '@/data/admin.json'
import securityData from '@/data/security.json'

// Type assertions for imported JSON data
const programs = (programsData as ProgramsData).programs
const testimonials = (testimonialsData as TestimonialsData).testimonials
const successStories = (testimonialsData as TestimonialsData).successStories
const siteConfig = siteConfigData as SiteConfig

// Program data functions
export function getAllPrograms(): Program[] {
  return programs.filter(program => program.isActive)
}

export function getFeaturedPrograms(): Program[] {
  return programs.filter(program => program.isActive && program.featured)
}

export function getProgramCategories() {
  const categories = [
    { id: 'ai', name: { en: 'AI & Machine Learning', km: 'បញ្ញាប្រឌិត និង ការរៀនម៉ាស៊ីន' } },
    { id: 'data', name: { en: 'Data Engineering', km: 'វិស្វកម្មទិន្នន័យ' } },
    { id: 'web', name: { en: 'Web Development', km: 'ការអភិវឌ្ឍន៍វេបសាយ' } },
    { id: 'mobile', name: { en: 'Mobile Development', km: 'ការអភិវឌ្ឍន៍ម៉ូបាយ' } },
    { id: 'devops', name: { en: 'DevOps & Cloud', km: 'DevOps និង ពពក' } },
    { id: 'design', name: { en: 'UX/UI Design', km: 'ការរចនា UX/UI' } }
  ]
  return categories
}

export function getProgramCategoryInfo(category: string, language: 'en' | 'km' = 'en') {
  const categoryMap: Record<string, { icon: string; color: string; name: { en: string; km: string } }> = {
    'ai': { 
      icon: '🧠', 
      color: 'from-navy-600 to-purple-600',
      name: { en: 'AI & Machine Learning', km: 'បញ្ញាប្រឌិត និង ការរៀនម៉ាស៊ីន' }
    },
    'data': { 
      icon: '📈', 
      color: 'from-navy-600 to-blue-600',
      name: { en: 'Data Engineering', km: 'វិស្វកម្មទិន្នន័យ' }
    },
    'web': { 
      icon: '🌐', 
      color: 'from-navy-600 to-orange-600',
      name: { en: 'Web Development', km: 'ការអភិវឌ្ឍន៍វេបសាយ' }
    },
    'mobile': { 
      icon: '📱', 
      color: 'from-orange-500 to-red-500',
      name: { en: 'Mobile Development', km: 'ការអភិវឌ្ឍន៍ម៉ូបាយ' }
    },
    'devops': { 
      icon: '☁️', 
      color: 'from-indigo-500 to-purple-500',
      name: { en: 'DevOps & Cloud', km: 'DevOps និង ពពក' }
    },
    'design': { 
      icon: '🎨', 
      color: 'from-pink-500 to-rose-500',
      name: { en: 'UX/UI Design', km: 'ការរចនា UX/UI' }
    }
  }
  
  return categoryMap[category] || {
    icon: '📚',
    color: 'from-navy-500 to-orange-500',
    name: { en: 'General', km: 'ទូទៅ' }
  }
}

export function getProgramById(id: string): Program | undefined {
  return programs.find(program => program.id === id && program.isActive)
}

// Instructor Management System Data
export interface Instructor {
  id: string
  name: string
  title: string
  bio: string
  longBio: string
  expertise: string[]
  image: string
  email: string
  linkedin?: string
  github?: string
  twitter?: string
  website?: string
  education: {
    degree: string
    institution: string
    year: string
  }[]
  experience: {
    position: string
    company: string
    duration: string
    description: string
  }[]
  achievements: string[]
  certifications: string[]
  languages: string[]
  teachingExperience: string
  rating: number
  totalStudents: number
  coursesTeaching: string[]
  isActive: boolean
  featured: boolean
  joinedDate: string
  videoIntroUrl?: string
}

// Mock instructor data
const mockInstructors: Instructor[] = [
  {
    id: 'prof-sokha',
    name: 'Prof. Sokha Lim',
    title: 'AI Research Director & Lead Instructor',
    bio: 'Former Google AI researcher with 10+ years in machine learning and deep learning. PhD in Computer Science from Stanford.',
    longBio: 'Prof. Sokha Lim is a distinguished AI researcher and educator with over a decade of experience in cutting-edge machine learning and artificial intelligence. After completing his PhD in Computer Science at Stanford University, he spent 8 years at Google Research, where he led breakthrough projects in computer vision and natural language processing. His research has been published in top-tier conferences including NeurIPS, ICML, and ICLR. Prof. Lim is passionate about democratizing AI education and has mentored over 500 students in their AI journey.',
    expertise: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Natural Language Processing', 'TensorFlow', 'PyTorch', 'Python'],
    image: '/images/instructors/prof-sokha.jpg',
    email: 'sokha.lim@seksaatech.com',
    linkedin: 'https://linkedin.com/in/sokha-lim',
    github: 'https://github.com/sokha-lim',
    twitter: 'https://twitter.com/sokha_ai',
    education: [
      {
        degree: 'PhD in Computer Science',
        institution: 'Stanford University',
        year: '2012'
      },
      {
        degree: 'MS in Computer Science',
        institution: 'MIT',
        year: '2008'
      }
    ],
    experience: [
      {
        position: 'Senior Research Scientist',
        company: 'Google Research',
        duration: '2015-2023',
        description: 'Led AI research projects in computer vision and NLP, published 25+ papers, managed team of 12 researchers.'
      },
      {
        position: 'Research Scientist',
        company: 'Google DeepMind',
        duration: '2012-2015',
        description: 'Developed novel deep learning architectures for image recognition and language understanding.'
      }
    ],
    achievements: [
      'Published 40+ research papers in top AI conferences',
      'Google Research Excellence Award (2019, 2021)',
      'Best Paper Award at NeurIPS 2020',
      'Featured in Forbes 30 Under 30 in Technology (2016)'
    ],
    certifications: [
      'Google Cloud Professional Machine Learning Engineer',
      'AWS Certified Machine Learning - Specialty',
      'TensorFlow Developer Certificate'
    ],
    languages: ['English', 'Khmer', 'Mandarin'],
    teachingExperience: '5+ years teaching AI/ML at Stanford and industry workshops',
    rating: 4.9,
    totalStudents: 847,
    coursesTeaching: ['ai-ml-bootcamp'],
    isActive: true,
    featured: true,
    joinedDate: '2023-01-15',
    videoIntroUrl: 'https://youtube.com/watch?v=intro-sokha'
  },
  {
    id: 'dr-mey',
    name: 'Dr. Mey Chan',
    title: 'Data Science Lead & Senior Instructor',
    bio: 'Senior Data Scientist at Microsoft with expertise in statistical modeling and big data analytics. PhD in Statistics from MIT.',
    longBio: 'Dr. Mey Chan is a renowned data scientist and statistician with extensive experience in transforming complex data into actionable business insights. With a PhD in Statistics from MIT and 12 years of industry experience, she has led data science initiatives at Fortune 500 companies including Microsoft, where she developed predictive models that generated millions in revenue.',
    expertise: ['Data Science', 'Statistics', 'Machine Learning', 'Python', 'R', 'SQL', 'Tableau', 'Apache Spark'],
    image: '/images/instructors/dr-mey.jpg',
    email: 'mey.chan@seksaatech.com',
    linkedin: 'https://linkedin.com/in/mey-chan',
    github: 'https://github.com/mey-chan',
    education: [
      {
        degree: 'PhD in Statistics',
        institution: 'Massachusetts Institute of Technology (MIT)',
        year: '2011'
      },
      {
        degree: 'MS in Applied Mathematics',
        institution: 'University of California, Berkeley',
        year: '2007'
      }
    ],
    experience: [
      {
        position: 'Principal Data Scientist',
        company: 'Microsoft',
        duration: '2018-2023',
        description: 'Led data science team of 15+ members, developed ML models for Azure services, increased revenue by $50M annually.'
      },
      {
        position: 'Senior Data Scientist',
        company: 'Amazon',
        duration: '2014-2018',
        description: 'Built recommendation systems and demand forecasting models for e-commerce platform.'
      }
    ],
    achievements: [
      'Led data science projects generating $100M+ in business value',
      'Microsoft Technical Achievement Award (2020, 2022)',
      'Published 15+ papers in statistical journals',
      'Kaggle Grandmaster with 3 gold medals'
    ],
    certifications: [
      'Microsoft Certified: Azure Data Scientist Associate',
      'Google Cloud Professional Data Engineer',
      'Tableau Desktop Certified Professional'
    ],
    languages: ['English', 'Khmer', 'Mandarin', 'French'],
    teachingExperience: '7+ years teaching statistics and data science at universities and bootcamps',
    rating: 4.8,
    totalStudents: 623,
    coursesTeaching: ['data-engineering-pro'],
    isActive: true,
    featured: true,
    joinedDate: '2023-02-01',
    videoIntroUrl: 'https://youtube.com/watch?v=intro-mey'
  },
  {
    id: 'eng-david',
    name: 'David Kim',
    title: 'Senior Software Engineer & Full-Stack Instructor',
    bio: 'Full-stack engineer with 8+ years at tech startups. Expert in modern web technologies and cloud architecture.',
    longBio: 'David Kim is a seasoned full-stack software engineer with a passion for building scalable web applications and mentoring the next generation of developers. With 8+ years of experience at high-growth tech startups, he has architected and built systems serving millions of users.',
    expertise: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'MongoDB', 'PostgreSQL'],
    image: '/images/instructors/eng-david.jpg',
    email: 'david.kim@seksaatech.com',
    linkedin: 'https://linkedin.com/in/david-kim-dev',
    github: 'https://github.com/david-kim-dev',
    twitter: 'https://twitter.com/davidkim_dev',
    website: 'https://davidkim.dev',
    education: [
      {
        degree: 'MS in Computer Science',
        institution: 'University of Washington',
        year: '2015'
      },
      {
        degree: 'BS in Software Engineering',
        institution: 'Seoul National University',
        year: '2013'
      }
    ],
    experience: [
      {
        position: 'Senior Software Engineer',
        company: 'Stripe',
        duration: '2020-2023',
        description: 'Built payment infrastructure serving 100M+ transactions, led team of 8 engineers, improved system performance by 40%.'
      },
      {
        position: 'Full-Stack Engineer',
        company: 'Airbnb',
        duration: '2017-2020',
        description: 'Developed booking platform features, implemented real-time messaging system, mentored junior developers.'
      }
    ],
    achievements: [
      'Led engineering teams through 5+ successful product launches',
      'Stripe Engineering Excellence Award (2022)',
      'Open source contributor with 10K+ GitHub stars',
      'Technical mentor to 100+ junior engineers'
    ],
    certifications: [
      'AWS Certified Solutions Architect - Professional',
      'Google Cloud Professional Cloud Architect',
      'Certified Kubernetes Administrator (CKA)'
    ],
    languages: ['English', 'Korean', 'Japanese'],
    teachingExperience: '4+ years teaching web development at coding bootcamps and workshops',
    rating: 4.9,
    totalStudents: 892,
    coursesTeaching: ['fullstack-web-dev'],
    isActive: true,
    featured: true,
    joinedDate: '2023-03-01',
    videoIntroUrl: 'https://youtube.com/watch?v=intro-david'
  },
  {
    id: 'dev-sarah',
    name: 'Sarah Chen',
    title: 'Frontend Architect & UX/UI Design Instructor',
    bio: 'UI/UX specialist and frontend architect with experience at design-focused tech companies.',
    longBio: 'Sarah Chen is a creative technologist who bridges the gap between design and development. With 7+ years of experience at design-forward tech companies, she has crafted user experiences for products used by millions.',
    expertise: ['React', 'TypeScript', 'UI/UX Design', 'Figma', 'Design Systems', 'Accessibility', 'CSS/SCSS', 'Next.js'],
    image: '/images/instructors/dev-sarah.jpg',
    email: 'sarah.chen@seksaatech.com',
    linkedin: 'https://linkedin.com/in/sarah-chen-design',
    github: 'https://github.com/sarah-chen-design',
    twitter: 'https://twitter.com/sarahchen_ux',
    website: 'https://sarahchen.design',
    education: [
      {
        degree: 'MS in Human-Computer Interaction',
        institution: 'Carnegie Mellon University',
        year: '2016'
      },
      {
        degree: 'BS in Computer Science',
        institution: 'University of California, San Diego',
        year: '2014'
      }
    ],
    experience: [
      {
        position: 'Senior Frontend Architect',
        company: 'Figma',
        duration: '2019-2023',
        description: 'Led frontend architecture for design tools, built component library used by 50M+ users, improved app performance by 60%.'
      },
      {
        position: 'Senior UX Engineer',
        company: 'Adobe',
        duration: '2017-2019',
        description: 'Developed Creative Cloud interfaces, collaborated with design teams on user research and prototyping.'
      }
    ],
    achievements: [
      'Led design system adoption across 20+ product teams',
      'Figma Design Excellence Award (2021, 2022)',
      'Accessibility advocate with WCAG 2.1 expertise',
      'Conference speaker at Design+Research and Frontend Masters'
    ],
    certifications: [
      'Google UX Design Professional Certificate',
      'Certified Accessibility Professional (CPACC)',
      'Adobe Certified Expert in XD'
    ],
    languages: ['English', 'Mandarin', 'Cantonese'],
    teachingExperience: '5+ years teaching UX/UI design and frontend development',
    rating: 4.8,
    totalStudents: 567,
    coursesTeaching: ['react-native-mobile'],
    isActive: true,
    featured: true,
    joinedDate: '2023-04-01',
    videoIntroUrl: 'https://youtube.com/watch?v=intro-sarah'
  }
]

export function getAllInstructors(): Instructor[] {
  return mockInstructors.filter(instructor => instructor.isActive)
}

export function getFeaturedInstructors(): Instructor[] {
  return mockInstructors.filter(instructor => instructor.isActive && instructor.featured)
}

export function getInstructorById(id: string): Instructor | undefined {
  return mockInstructors.find(instructor => instructor.id === id && instructor.isActive)
}

export function getInstructorsByIds(ids: string[]): Instructor[] {
  return mockInstructors.filter(instructor => ids.includes(instructor.id) && instructor.isActive)
}

export function getInstructorsByExpertise(expertise: string): Instructor[] {
  return mockInstructors.filter(instructor => 
    instructor.isActive && 
    instructor.expertise.some(skill => skill.toLowerCase().includes(expertise.toLowerCase()))
  )
}

export function getInstructorsByCourse(courseId: string): Instructor[] {
  return mockInstructors.filter(instructor => 
    instructor.isActive && 
    instructor.coursesTeaching.includes(courseId)
  )
}

export function getProgramsByCategory(category: string): Program[] {
  return programs.filter(program => program.isActive && program.category === category)
}

// Testimonial data functions
export function getAllTestimonials(): Testimonial[] {
  return testimonials.filter(testimonial => testimonial.isActive)
}

export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter(testimonial => testimonial.isActive && testimonial.featured)
}

export function getTestimonialsByProgram(programId: string): Testimonial[] {
  return testimonials.filter(testimonial => 
    testimonial.isActive && testimonial.programId === programId
  )
}

// Success story functions
export function getAllSuccessStories(): SuccessStory[] {
  return successStories.filter(story => story.isActive)
}

export function getFeaturedSuccessStories(): SuccessStory[] {
  return successStories.filter(story => story.isActive && story.featured)
}

export function getCareerOutcomes() {
  return testimonialsData.careerOutcomes
}

export function getProjectPortfolio() {
  return testimonialsData.projectPortfolio
}

export function getFeaturedProjects() {
  return testimonialsData.projectPortfolio.filter(project => project.featured)
}

export function getProjectsByProgram(programName: string) {
  return testimonialsData.projectPortfolio.filter(project => project.program === programName)
}

// Site configuration functions
export function getSiteConfig(): SiteConfig {
  return siteConfig
}

export function getSiteStatistics() {
  return siteConfig.statistics
}

// Utility functions for localized content
export function getLocalizedText(content: { en: string; km?: string }, language: 'en' | 'km' = 'en'): string {
  return content[language] || content.en
}

// Homepage specific data aggregation
export interface HomepageData {
  featuredPrograms: Program[]
  featuredTestimonials: Testimonial[]
  successStories: SuccessStory[]
  statistics: {
    totalGraduates: number
    jobPlacementRate: number
    totalBootcamps: number
  }
  siteInfo: {
    name: string
    description: string
  }
}

export function getHomepageData(language: 'en' | 'km' = 'en'): HomepageData {
  return {
    featuredPrograms: getFeaturedPrograms(),
    featuredTestimonials: getFeaturedTestimonials(),
    successStories: getFeaturedSuccessStories(),
    statistics: getSiteStatistics(),
    siteInfo: {
      name: getLocalizedText(siteConfig.general.siteName, language),
      description: getLocalizedText(siteConfig.general.description, language)
    }
  }
}

// Program category mappings
export const PROGRAM_CATEGORIES = {
  'ai': {
    en: 'AI & Machine Learning',
    km: 'បញ្ញាប្រឌិត និង ការរៀនម៉ាស៊ីន',
    icon: '🧠',
    color: 'from-navy-600 to-purple-600'
  },
  'data': {
    en: 'Data Engineering',
    km: 'វិស្វកម្មទិន្នន័យ',
    icon: '📈',
    color: 'from-navy-600 to-blue-600'
  },
  'web': {
    en: 'Web Development',
    km: 'ការអភិវឌ្ឍន៍វេបសាយ',
    icon: '🌐',
    color: 'from-navy-600 to-orange-600'
  },
  'mobile': {
    en: 'Mobile Development',
    km: 'ការអភិវឌ្ឍន៍ម៉ូបាយ',
    icon: '📱',
    color: 'from-orange-500 to-red-500'
  },
  'devops': {
    en: 'DevOps & Cloud',
    km: 'DevOps និង ពពក',
    icon: '☁️',
    color: 'from-indigo-500 to-purple-500'
  },
  'design': {
    en: 'UX/UI Design',
    km: 'ការរចនា UX/UI',
    icon: '🎨',
    color: 'from-pink-500 to-rose-500'
  }
} as const

// Schedule and Booking System Data
export interface ScheduleClass {
  id: string
  programId: string
  programTitle: string
  instructorId: string
  instructorName: string
  dayOfWeek: number // 0 = Sunday, 1 = Monday, etc.
  startTime: string // "09:00"
  endTime: string // "12:00"
  format: 'online' | 'in-person' | 'hybrid'
  location?: string
  maxStudents: number
  currentStudents: number
  isTrialAvailable: boolean
  price: number
  currency: string
  startDate: string // "2024-01-15"
  endDate: string // "2024-04-15"
  isActive: boolean
}

export interface BookingRequest {
  id: string
  classId: string
  studentName: string
  studentEmail: string
  studentPhone: string
  isTrialClass: boolean
  requestedDate: string
  status: 'pending' | 'confirmed' | 'cancelled'
  createdAt: string
  notes?: string
}

// Mock schedule data
const mockScheduleClasses: ScheduleClass[] = [
  {
    id: 'class-1',
    programId: 'ai-ml-bootcamp',
    programTitle: 'AI & Machine Learning Bootcamp',
    instructorId: 'prof-sokha',
    instructorName: 'Prof. Sokha Lim',
    dayOfWeek: 1, // Monday
    startTime: '09:00',
    endTime: '12:00',
    format: 'hybrid',
    location: 'Seksaa Tech Academy - Phnom Penh',
    maxStudents: 25,
    currentStudents: 18,
    isTrialAvailable: true,
    price: 150,
    currency: 'USD',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    isActive: true
  },
  {
    id: 'class-2',
    programId: 'ai-ml-bootcamp',
    programTitle: 'AI & Machine Learning Bootcamp',
    instructorId: 'prof-sokha',
    instructorName: 'Prof. Sokha Lim',
    dayOfWeek: 3, // Wednesday
    startTime: '14:00',
    endTime: '17:00',
    format: 'online',
    maxStudents: 30,
    currentStudents: 22,
    isTrialAvailable: true,
    price: 150,
    currency: 'USD',
    startDate: '2024-01-17',
    endDate: '2024-04-17',
    isActive: true
  },
  {
    id: 'class-3',
    programId: 'data-engineering-pro',
    programTitle: 'Data Engineering Professional',
    instructorId: 'dr-mey',
    instructorName: 'Dr. Mey Chan',
    dayOfWeek: 2, // Tuesday
    startTime: '18:30',
    endTime: '21:30',
    format: 'hybrid',
    location: 'Seksaa Tech Academy - Phnom Penh',
    maxStudents: 20,
    currentStudents: 15,
    isTrialAvailable: true,
    price: 200,
    currency: 'USD',
    startDate: '2024-01-16',
    endDate: '2024-05-16',
    isActive: true
  },
  {
    id: 'class-4',
    programId: 'fullstack-web-dev',
    programTitle: 'Full-Stack Web Development',
    instructorId: 'eng-david',
    instructorName: 'David Kim',
    dayOfWeek: 4, // Thursday
    startTime: '19:00',
    endTime: '22:00',
    format: 'online',
    maxStudents: 25,
    currentStudents: 20,
    isTrialAvailable: true,
    price: 120,
    currency: 'USD',
    startDate: '2024-01-18',
    endDate: '2024-04-18',
    isActive: true
  },
  {
    id: 'class-5',
    programId: 'fullstack-web-dev',
    programTitle: 'Full-Stack Web Development',
    instructorId: 'eng-david',
    instructorName: 'David Kim',
    dayOfWeek: 6, // Saturday
    startTime: '09:00',
    endTime: '12:00',
    format: 'in-person',
    location: 'Seksaa Tech Academy - Phnom Penh',
    maxStudents: 20,
    currentStudents: 12,
    isTrialAvailable: true,
    price: 120,
    currency: 'USD',
    startDate: '2024-01-20',
    endDate: '2024-04-20',
    isActive: true
  },
  {
    id: 'class-6',
    programId: 'react-native-mobile',
    programTitle: 'React Native Mobile Development',
    instructorId: 'dev-sarah',
    instructorName: 'Sarah Chen',
    dayOfWeek: 5, // Friday
    startTime: '18:00',
    endTime: '21:00',
    format: 'hybrid',
    location: 'Seksaa Tech Academy - Phnom Penh',
    maxStudents: 18,
    currentStudents: 14,
    isTrialAvailable: true,
    price: 140,
    currency: 'USD',
    startDate: '2024-01-19',
    endDate: '2024-04-19',
    isActive: true
  }
]

// Schedule and booking functions
export function getAllScheduleClasses(): ScheduleClass[] {
  return mockScheduleClasses.filter(cls => cls.isActive)
}

export function getScheduleClassesByProgram(programId: string): ScheduleClass[] {
  return mockScheduleClasses.filter(cls => cls.isActive && cls.programId === programId)
}

export function getScheduleClassesByInstructor(instructorId: string): ScheduleClass[] {
  return mockScheduleClasses.filter(cls => cls.isActive && cls.instructorId === instructorId)
}

export function getScheduleClassesByFormat(format: 'online' | 'in-person' | 'hybrid'): ScheduleClass[] {
  return mockScheduleClasses.filter(cls => cls.isActive && cls.format === format)
}

export function getScheduleClassById(id: string): ScheduleClass | undefined {
  return mockScheduleClasses.find(cls => cls.id === id && cls.isActive)
}

export function getAvailableTrialClasses(): ScheduleClass[] {
  return mockScheduleClasses.filter(cls => cls.isActive && cls.isTrialAvailable && cls.currentStudents < cls.maxStudents)
}

export function getDayName(dayOfWeek: number, language: 'en' | 'km' = 'en'): string {
  const days = {
    en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    km: ['អាទិត្យ', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរ៍']
  }
  return days[language][dayOfWeek] || days.en[dayOfWeek]
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function getClassAvailability(cls: ScheduleClass): {
  available: number
  percentage: number
  status: 'available' | 'limited' | 'full'
} {
  const available = cls.maxStudents - cls.currentStudents
  const percentage = (cls.currentStudents / cls.maxStudents) * 100
  
  let status: 'available' | 'limited' | 'full' = 'available'
  if (available === 0) status = 'full'
  else if (percentage >= 80) status = 'limited'
  
  return { available, percentage, status }
}

// Enrollment System Functions
export function getEnrollmentData(): EnrollmentData {
  return enrollmentData as EnrollmentData
}

export function getPaymentPlans(): PaymentPlan[] {
  return enrollmentData.paymentPlans as PaymentPlan[]
}

export function getPaymentPlanById(id: string): PaymentPlan | undefined {
  return enrollmentData.paymentPlans.find(plan => plan.id === id) as PaymentPlan | undefined
}

export function getFeaturedPaymentPlan(): PaymentPlan | undefined {
  return enrollmentData.paymentPlans.find(plan => plan.featured) as PaymentPlan | undefined
}

export function getScholarships(): Scholarship[] {
  return enrollmentData.scholarships.filter(scholarship => scholarship.available) as Scholarship[]
}

export function getScholarshipById(id: string): Scholarship | undefined {
  return enrollmentData.scholarships.find(scholarship => scholarship.id === id) as Scholarship | undefined
}

export function getEnrollmentSteps(): EnrollmentStep[] {
  return enrollmentData.enrollmentSteps as EnrollmentStep[]
}

export function getEnrollmentRequirements(): EnrollmentRequirements {
  return enrollmentData.enrollmentRequirements as EnrollmentRequirements
}

export function getEnrollmentRequirementsForProgram(programId: string): Array<{en: string, km: string}> {
  const requirements = enrollmentData.enrollmentRequirements as EnrollmentRequirements
  const general = requirements.general || []
  const programSpecific = requirements.programSpecific[programId] || []
  return [...general, ...programSpecific]
}

export function getOnboardingProcess(): OnboardingStep[] {
  return enrollmentData.onboardingProcess as OnboardingStep[]
}

export function getSupportServices(): SupportService[] {
  return enrollmentData.supportServices as SupportService[]
}

export function calculateProgramPrice(programId: string, paymentPlanId: string): {
  originalPrice: number
  discountedPrice: number
  discount: number
  installmentAmount?: number
} {
  const program = getProgramById(programId)
  const paymentPlan = getPaymentPlanById(paymentPlanId)
  
  if (!program || !paymentPlan) {
    return {
      originalPrice: 0,
      discountedPrice: 0,
      discount: 0
    }
  }
  
  const originalPrice = program.pricing.fullPrice
  const discount = (originalPrice * paymentPlan.discountPercentage) / 100
  const discountedPrice = originalPrice - discount
  
  const result = {
    originalPrice,
    discountedPrice,
    discount
  }
  
  if (paymentPlan.installments > 1) {
    return {
      ...result,
      installmentAmount: discountedPrice / paymentPlan.installments
    }
  }
  
  return result
}

export function calculateScholarshipPrice(originalPrice: number, scholarshipId: string): {
  originalPrice: number
  scholarshipDiscount: number
  finalPrice: number
} {
  const scholarship = getScholarshipById(scholarshipId)
  
  if (!scholarship) {
    return {
      originalPrice,
      scholarshipDiscount: 0,
      finalPrice: originalPrice
    }
  }
  
  const scholarshipDiscount = (originalPrice * scholarship.discountPercentage) / 100
  const finalPrice = originalPrice - scholarshipDiscount
  
  return {
    originalPrice,
    scholarshipDiscount,
    finalPrice
  }
}

// Admin Dashboard Functions
export function getAdminData(): AdminData {
  return adminData as AdminData
}

export function getAdminUsers(): AdminUser[] {
  return (adminData as AdminData).adminUsers
}

export function getAdminUserById(id: string): AdminUser | undefined {
  return (adminData as AdminData).adminUsers.find(user => user.id === id)
}

export function getAdminUserByEmail(email: string): AdminUser | undefined {
  return (adminData as AdminData).adminUsers.find(user => user.email === email)
}

export function getAdminRoles(): AdminRole[] {
  return (adminData as AdminData).roles
}

export function getAdminRoleById(id: string): AdminRole | undefined {
  return (adminData as AdminData).roles.find(role => role.id === id)
}

export function getAdminPermissions(): AdminPermission[] {
  return (adminData as AdminData).permissions
}

export function getDashboardMetrics(): DashboardMetrics {
  return (adminData as AdminData).dashboardMetrics
}

export function getRecentActivities(limit: number = 10): AdminActivity[] {
  return (adminData as AdminData).recentActivities.slice(0, limit)
}

export function getAdminNotifications(): AdminNotification[] {
  return (adminData as AdminData).notifications
}

export function getUnreadNotifications(): AdminNotification[] {
  return (adminData as AdminData).notifications.filter(notif => !notif.isRead)
}

export function getUrgentNotifications(): AdminNotification[] {
  return (adminData as AdminData).notifications.filter(notif => notif.type === 'urgent' && !notif.isRead)
}

export function getQuickActions(): QuickAction[] {
  return (adminData as AdminData).quickActions
}

export function getQuickActionsByPermission(permissions: string[]): QuickAction[] {
  const actions = (adminData as AdminData).quickActions
  if (permissions.includes('all')) {
    return actions
  }
  return actions.filter(action => permissions.includes(action.permission))
}

export function getSystemHealth(): SystemHealth {
  return (adminData as AdminData).systemHealth
}

// User Permission Checking
export function hasPermission(user: AdminUser, permission: string): boolean {
  if (user.permissions.includes('all')) {
    return true
  }
  return user.permissions.includes(permission)
}

export function hasAnyPermission(user: AdminUser, permissions: string[]): boolean {
  if (user.permissions.includes('all')) {
    return true
  }
  return permissions.some(permission => user.permissions.includes(permission))
}

// Analytics and Reporting Functions
export function getEnrollmentTrends(months: number = 6): Array<{
  month: string
  enrollments: number
  revenue: number
}> {
  // Mock data - in real implementation, this would query actual enrollment data
  const trends = []
  const currentDate = new Date()
  
  for (let i = months - 1; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1)
    const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    
    trends.push({
      month: monthName,
      enrollments: Math.floor(Math.random() * 50) + 30, // Mock data
      revenue: Math.floor(Math.random() * 200000) + 300000 // Mock data
    })
  }
  
  return trends
}

export function getProgramPerformance(): Array<{
  programId: string
  programName: string
  enrollments: number
  revenue: number
  completionRate: number
  averageRating: number
}> {
  const programs = getAllPrograms()
  const metrics = getDashboardMetrics()
  
  return programs.map(program => ({
    programId: program.id,
    programName: program.title.en,
    enrollments: metrics.enrollments.byProgram[program.id] || 0,
    revenue: metrics.revenue.byProgram[program.id] || 0,
    completionRate: metrics.programs.completionRates[program.id] || 0,
    averageRating: 4.5 // Default rating - would come from actual reviews
  }))
}

export function getInstructorPerformance(): Array<{
  instructorId: string
  instructorName: string
  totalStudents: number
  averageRating: number
  programsTeaching: number
}> {
  const instructors = getAllInstructors()
  
  return instructors.map(instructor => ({
    instructorId: instructor.id,
    instructorName: instructor.name,
    totalStudents: instructor.totalStudents,
    averageRating: instructor.rating,
    programsTeaching: instructor.coursesTeaching.length
  }))
}

// Mock Student Management Functions (would connect to actual database)
export function getStudentRecords(limit: number = 50): StudentRecord[] {
  // Mock data - in real implementation, this would query student database
  const mockStudents: StudentRecord[] = [
    {
      id: 'student-1',
      firstName: 'Pisach',
      lastName: 'Heng',
      email: 'pisach@example.com',
      phone: '+855 12 345 678',
      enrollmentDate: '2024-01-15',
      programId: 'ai-ml-bootcamp',
      paymentPlan: 'full-payment',
      status: 'active',
      progress: 25,
      lastActivity: '2024-01-15T10:30:00Z'
    },
    {
      id: 'student-2',
      firstName: 'Sovannak',
      lastName: 'Chea',
      email: 'sovannak@example.com',
      phone: '+855 12 987 654',
      enrollmentDate: '2023-12-01',
      programId: 'web-development',
      paymentPlan: 'two-installments',
      status: 'completed',
      progress: 100,
      grade: 95,
      lastActivity: '2024-01-10T14:20:00Z'
    }
  ]
  
  return mockStudents.slice(0, limit)
}

export function getStudentInquiries(limit: number = 20): StudentInquiry[] {
  // Mock data - in real implementation, this would query inquiries database
  const mockInquiries: StudentInquiry[] = [
    {
      id: 'inquiry-1',
      name: 'Mealea Pich',
      email: 'mealea@example.com',
      phone: '+855 12 111 222',
      programInterest: 'cybersecurity',
      message: 'I am interested in the cybersecurity program. Can you provide more information about the curriculum and job placement?',
      source: 'website',
      status: 'new',
      priority: 'high',
      createdAt: '2024-01-15T09:30:00Z',
      updatedAt: '2024-01-15T09:30:00Z'
    },
    {
      id: 'inquiry-2',
      name: 'Kosal Rath',
      email: 'kosal@example.com',
      programInterest: 'mobile-development',
      message: 'What are the payment options for the mobile development course?',
      source: 'facebook',
      status: 'contacted',
      priority: 'medium',
      assignedTo: 'admin-2',
      createdAt: '2024-01-14T16:45:00Z',
      updatedAt: '2024-01-15T08:15:00Z',
      notes: 'Sent program brochure and payment plan details'
    }
  ]
  
  return mockInquiries.slice(0, limit)
}

// Dashboard Summary Functions
export function getDashboardSummary() {
  const metrics = getDashboardMetrics()
  const notifications = getUnreadNotifications()
  const urgentNotifications = getUrgentNotifications()
  const recentActivities = getRecentActivities(5)
  
  return {
    metrics: metrics.overview,
    unreadNotifications: notifications.length,
    urgentNotifications: urgentNotifications.length,
    recentActivities: recentActivities.length,
    systemStatus: getSystemHealth().status
  }
}

export function getRevenueSummary() {
  const metrics = getDashboardMetrics()
  return {
    thisMonth: metrics.revenue.thisMonth,
    lastMonth: metrics.revenue.lastMonth,
    growthRate: metrics.revenue.growthRate,
    projectedAnnual: metrics.revenue.projectedAnnual,
    byProgram: metrics.revenue.byProgram
  }
}

export function getEnrollmentSummary() {
  const metrics = getDashboardMetrics()
  return {
    thisMonth: metrics.enrollments.thisMonth,
    lastMonth: metrics.enrollments.lastMonth,
    growthRate: metrics.enrollments.growthRate,
    byProgram: metrics.enrollments.byProgram,
    byPaymentPlan: metrics.enrollments.byPaymentPlan
  }
}

// Security & Privacy Functions
export function getSecurityData(): SecurityData {
  return securityData as SecurityData
}

export function getPrivacyPolicy(): PrivacyPolicy {
  return (securityData as SecurityData).privacyPolicy
}

export function getTermsOfService(): TermsOfService {
  return (securityData as SecurityData).termsOfService
}

export function getCookiePolicy(): CookiePolicy {
  return (securityData as SecurityData).cookiePolicy
}

export function getGDPRCompliance(): GDPRCompliance {
  return (securityData as SecurityData).gdprCompliance
}

export function getSecurityMeasures(): SecurityMeasures {
  return (securityData as SecurityData).securityMeasures
}

export function getComplianceFrameworks(): ComplianceFramework[] {
  return (securityData as SecurityData).complianceFrameworks
}

export function getIncidentResponse(): IncidentResponse {
  return (securityData as SecurityData).incidentResponse
}

// Cookie Consent Management
export function saveCookieConsent(consent: CookieConsent): void {
  // In a real implementation, this would save to database
  if (typeof window !== 'undefined') {
    localStorage.setItem('cookie_consent', JSON.stringify(consent))
    localStorage.setItem('cookie_consent_date', consent.consentDate)
  }
}

export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null
  
  const consent = localStorage.getItem('cookie_consent')
  if (!consent) return null
  
  try {
    return JSON.parse(consent) as CookieConsent
  } catch {
    return null
  }
}

export function hasCookieConsent(): boolean {
  return getCookieConsent() !== null
}

export function hasConsentForCategory(category: string): boolean {
  const consent = getCookieConsent()
  if (!consent) return false
  
  return consent.categories[category as keyof typeof consent.categories] || false
}

// Privacy Request Management
export function submitPrivacyRequest(request: Omit<PrivacyRequest, 'id' | 'status' | 'submittedAt'>): PrivacyRequest {
  const newRequest: PrivacyRequest = {
    ...request,
    id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    status: 'pending',
    submittedAt: new Date().toISOString()
  }
  
  // In a real implementation, this would save to database and trigger notifications
  console.log('Privacy request submitted:', newRequest)
  
  return newRequest
}

export function getPrivacyRequests(): PrivacyRequest[] {
  // Mock data - in real implementation, this would query database
  return [
    {
      id: 'req_1',
      type: 'access',
      email: 'user@example.com',
      name: 'John Doe',
      description: 'I would like to access all my personal data',
      status: 'completed',
      submittedAt: '2024-01-10T10:00:00Z',
      processedAt: '2024-01-12T15:30:00Z',
      processedBy: 'admin-3',
      response: 'Data export has been sent to your email address'
    },
    {
      id: 'req_2',
      type: 'erasure',
      email: 'user2@example.com',
      name: 'Jane Smith',
      description: 'Please delete all my personal information',
      status: 'in_progress',
      submittedAt: '2024-01-14T14:20:00Z'
    }
  ]
}

// Security Audit Functions
export function logSecurityEvent(event: Omit<SecurityAuditLog, 'id' | 'timestamp'>): void {
  const auditLog: SecurityAuditLog = {
    ...event,
    id: `audit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString()
  }
  
  // In a real implementation, this would save to secure audit database
  console.log('Security event logged:', auditLog)
}

export function getSecurityAuditLogs(limit: number = 100): SecurityAuditLog[] {
  // Mock data - in real implementation, this would query audit database
  return [
    {
      id: 'audit_1',
      timestamp: '2024-01-15T10:30:00Z',
      userId: 'user_123',
      action: 'login',
      resource: '/admin',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0...',
      success: true,
      riskLevel: 'low' as const
    },
    {
      id: 'audit_2',
      timestamp: '2024-01-15T10:25:00Z',
      action: 'failed_login',
      resource: '/admin',
      ipAddress: '192.168.1.200',
      userAgent: 'Mozilla/5.0...',
      success: false,
      riskLevel: 'medium' as const,
      details: { attempts: 3, reason: 'invalid_password' }
    }
  ].slice(0, limit)
}

// Security Incident Management
export function createSecurityIncident(incident: Omit<SecurityIncident, 'id' | 'reportedAt' | 'timeline'>): SecurityIncident {
  const newIncident: SecurityIncident = {
    ...incident,
    id: `inc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    reportedAt: new Date().toISOString(),
    timeline: [
      {
        timestamp: new Date().toISOString(),
        action: 'Incident reported',
        performedBy: incident.reportedBy
      }
    ]
  }
  
  // In a real implementation, this would save to database and trigger alerts
  console.log('Security incident created:', newIncident)
  
  return newIncident
}

export function getSecurityIncidents(): SecurityIncident[] {
  // Mock data - in real implementation, this would query database
  return [
    {
      id: 'inc_1',
      title: 'Suspicious Login Activity',
      description: 'Multiple failed login attempts from unknown IP addresses',
      severity: 'medium',
      status: 'investigating',
      reportedAt: '2024-01-15T08:00:00Z',
      reportedBy: 'security_system',
      assignedTo: 'admin-1',
      affectedSystems: ['authentication', 'user_accounts'],
      affectedUsers: 0,
      timeline: [
        {
          timestamp: '2024-01-15T08:00:00Z',
          action: 'Incident detected by automated monitoring',
          performedBy: 'security_system'
        },
        {
          timestamp: '2024-01-15T08:15:00Z',
          action: 'Incident assigned to security team',
          performedBy: 'admin-1'
        }
      ]
    }
  ]
}

// Compliance Functions
export function checkGDPRCompliance(): {
  compliant: boolean
  issues: string[]
  recommendations: string[]
} {
  const issues: string[] = []
  const recommendations: string[] = []
  
  // Check if privacy policy is up to date
  const privacyPolicy = getPrivacyPolicy()
  const lastUpdated = new Date(privacyPolicy.lastUpdated)
  const oneYearAgo = new Date()
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)
  
  if (lastUpdated < oneYearAgo) {
    issues.push('Privacy policy is more than one year old')
    recommendations.push('Update privacy policy to reflect current practices')
  }
  
  // Check cookie consent implementation
  if (typeof window !== 'undefined' && !hasCookieConsent()) {
    recommendations.push('Implement cookie consent banner for new visitors')
  }
  
  return {
    compliant: issues.length === 0,
    issues,
    recommendations
  }
}

// Security Assessment Functions
export function assessPasswordStrength(password: string): {
  score: number
  strength: 'weak' | 'fair' | 'good' | 'strong'
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0
  
  // Length check
  if (password.length >= 8) score += 1
  else feedback.push('Password should be at least 8 characters long')
  
  if (password.length >= 12) score += 1
  
  // Character variety checks
  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Include lowercase letters')
  
  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Include uppercase letters')
  
  if (/[0-9]/.test(password)) score += 1
  else feedback.push('Include numbers')
  
  if (/[^a-zA-Z0-9]/.test(password)) score += 1
  else feedback.push('Include special characters')
  
  // Common patterns check
  if (!/(.)\1{2,}/.test(password)) score += 1
  else feedback.push('Avoid repeating characters')
  
  const strength = score <= 2 ? 'weak' : score <= 4 ? 'fair' : score <= 6 ? 'good' : 'strong'
  
  return { score, strength, feedback }
}

export function validateSecurityHeaders(headers: Record<string, string>): {
  valid: boolean
  missing: string[]
  recommendations: string[]
} {
  const requiredHeaders = [
    'Strict-Transport-Security',
    'X-Content-Type-Options',
    'X-Frame-Options',
    'X-XSS-Protection',
    'Content-Security-Policy'
  ]
  
  const missing = requiredHeaders.filter(header => !headers[header])
  const recommendations: string[] = []
  
  if (missing.includes('Strict-Transport-Security')) {
    recommendations.push('Add HSTS header to enforce HTTPS')
  }
  
  if (missing.includes('Content-Security-Policy')) {
    recommendations.push('Implement Content Security Policy to prevent XSS attacks')
  }
  
  return {
    valid: missing.length === 0,
    missing,
    recommendations
  }
}

// Data Anonymization Functions
export function anonymizeUserData(userData: any): any {
  const anonymized = { ...userData }
  
  // Remove or hash personally identifiable information
  if (anonymized.email) {
    anonymized.email = `user_${Math.random().toString(36).substr(2, 9)}@anonymized.com`
  }
  
  if (anonymized.name) {
    anonymized.name = 'Anonymous User'
  }
  
  if (anonymized.phone) {
    anonymized.phone = '+XXX XX XXX XXX'
  }
  
  if (anonymized.address) {
    anonymized.address = 'Anonymized Address'
  }
  
  return anonymized
}

export function generateDataExport(userId: string): {
  userData: any
  enrollmentData: any
  activityData: any
  exportDate: string
} {
  // In a real implementation, this would gather all user data from various sources
  return {
    userData: {
      id: userId,
      email: 'user@example.com',
      name: 'John Doe',
      createdAt: '2023-01-01T00:00:00Z'
    },
    enrollmentData: {
      programs: ['ai-ml-bootcamp'],
      enrollmentDate: '2023-06-01T00:00:00Z',
      status: 'active'
    },
    activityData: {
      lastLogin: '2024-01-15T10:00:00Z',
      coursesCompleted: 2,
      certificatesEarned: 1
    },
    exportDate: new Date().toISOString()
  }
}

 