export interface EventLocation {
  type: 'online' | 'in-person' | 'hybrid';
  venue?: string;
  address?: string;
  room?: string;
  meetingLink?: string;
  meetingId?: string;
}

export interface EventInstructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
}

export interface EventRegistration {
  id: string;
  eventId: string;
  participantName: string;
  participantEmail: string;
  participantPhone: string;
  registrationDate: string;
  status: 'registered' | 'confirmed' | 'attended' | 'cancelled';
  specialRequests?: string;
  paymentStatus?: 'pending' | 'completed' | 'refunded';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  type: 'workshop' | 'webinar' | 'open-house' | 'enrollment-deadline' | 'seminar' | 'networking' | 'graduation';
  startDate: string;
  endDate: string;
  duration: number; // in minutes
  location: EventLocation;
  instructor?: EventInstructor;
  capacity: number;
  registeredCount: number;
  price: number;
  currency: string;
  tags: string[];
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  prerequisites?: string[];
  whatYouWillLearn: string[];
  materials?: string[];
  image: string;
  isRecurring: boolean;
  recurringPattern?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval: number;
    endDate?: string;
  };
  registrationDeadline: string;
  cancellationPolicy: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface EventFilters {
  type?: string[];
  category?: string[];
  level?: string[];
  location?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  tags?: string[];
}

export interface CalendarView {
  type: 'month' | 'week' | 'day' | 'list';
  currentDate: string;
}

export interface EventsData {
  events: Event[];
  categories: string[];
  tags: string[];
}

// Calendar Export Types
export interface CalendarExportOptions {
  format: 'ics' | 'google' | 'outlook';
  events: string[]; // event IDs
  timeZone: string;
}

// Event Statistics
export interface EventStats {
  totalEvents: number;
  upcomingEvents: number;
  totalRegistrations: number;
  averageAttendance: number;
  popularEventTypes: Array<{
    type: string;
    count: number;
  }>;
  monthlyStats: Array<{
    month: string;
    eventsCount: number;
    registrationsCount: number;
  }>;
}

// Event Notification Types
export interface EventNotification {
  id: string;
  eventId: string;
  type: 'reminder' | 'confirmation' | 'cancellation' | 'update';
  recipientEmail: string;
  sentAt: string;
  status: 'pending' | 'sent' | 'failed';
  content: {
    subject: string;
    message: string;
  };
}

// Event Search and Pagination
export interface EventSearchParams {
  query?: string;
  filters?: EventFilters;
  sortBy?: 'date' | 'title' | 'popularity' | 'price';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface EventSearchResult {
  events: Event[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
} 