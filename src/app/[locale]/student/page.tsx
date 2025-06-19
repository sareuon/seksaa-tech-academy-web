import { Metadata } from 'next';
import StudentPortalClient from '@/components/student/student-portal-client';

export const metadata: Metadata = {
  title: 'Student Portal - Seksaa Tech Academy',
  description: 'Access your courses, assignments, grades, and academic progress in the student portal.',
  keywords: 'student portal, courses, assignments, grades, academic progress, learning management system',
  openGraph: {
    title: 'Student Portal - Seksaa Tech Academy',
    description: 'Access your courses, assignments, grades, and academic progress in the student portal.',
    type: 'website',
  },
};

export default function StudentPortalPage() {
  return <StudentPortalClient />;
} 