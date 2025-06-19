export interface Address {
  street: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: Address;
  emergencyContact: EmergencyContact;
  profileImage: string;
}

export interface AcademicInfo {
  studentId: string;
  enrollmentDate: string;
  status: 'active' | 'inactive' | 'graduated' | 'suspended';
  currentPrograms: string[];
  completedPrograms: string[];
  gpa: number;
  totalCredits: number;
  expectedGraduation: string;
}

export interface CourseSchedule {
  days: string[];
  time: string;
  room: string;
}

export interface CourseEnrollment {
  courseId: string;
  courseName: string;
  instructor: string;
  enrollmentDate: string;
  status: 'in-progress' | 'completed' | 'dropped' | 'pending';
  progress: number;
  grade: string;
  credits: number;
  schedule: CourseSchedule;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'submitted' | 'graded';
  submissionDate: string | null;
  grade: number | null;
  feedback: string | null;
  maxPoints: number;
  weight: number;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: 'instructor' | 'admin' | 'student' | 'system';
}

export interface Notification {
  id: string;
  type: 'assignment' | 'grade' | 'schedule' | 'reminder' | 'announcement';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  category: 'academic' | 'attendance' | 'submission' | 'participation';
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  sms: boolean;
}

export interface StudentPreferences {
  language: string;
  notifications: NotificationPreferences;
  theme: 'light' | 'dark';
  timezone: string;
}

export interface Student {
  id: string;
  personalInfo: PersonalInfo;
  academicInfo: AcademicInfo;
  coursesEnrolled: CourseEnrollment[];
  assignments: Assignment[];
  messages: Message[];
  notifications: Notification[];
  achievements: Achievement[];
  preferences: StudentPreferences;
}

export interface CourseResource {
  id: string;
  title: string;
  type: 'document' | 'video' | 'slides' | 'dataset' | 'notebook' | 'link';
  url: string;
  uploadDate: string;
  size: string;
}

export interface CourseResourceGroup {
  courseId: string;
  resources: CourseResource[];
}

export interface StudentData {
  students: Student[];
  courseResources: CourseResourceGroup[];
}

// Dashboard Statistics Types
export interface DashboardStats {
  totalCourses: number;
  activeCourses: number;
  completedAssignments: number;
  pendingAssignments: number;
  overallGPA: number;
  totalCredits: number;
  attendanceRate: number;
  achievementsCount: number;
}

// Calendar Event Types
export interface CalendarEvent {
  id: string;
  title: string;
  type: 'class' | 'assignment' | 'exam' | 'event';
  startDate: string;
  endDate: string;
  location?: string;
  description?: string;
  courseId?: string;
}

// Progress Tracking Types
export interface CourseProgress {
  courseId: string;
  courseName: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  lastAccessed: string;
  nextDeadline?: string;
}

// Grade Analytics Types
export interface GradeAnalytics {
  courseId: string;
  courseName: string;
  currentGrade: string;
  gradePoints: number;
  assignments: {
    completed: number;
    total: number;
    averageScore: number;
  };
  trend: 'improving' | 'declining' | 'stable';
} 