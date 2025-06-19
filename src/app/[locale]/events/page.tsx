import { Metadata } from 'next';
import EventsPageClient from '@/components/events/events-page-client';

export const metadata: Metadata = {
  title: 'Events & Workshops - Seksaa Tech Academy',
  description: 'Join our workshops, webinars, networking events, and open houses. Advance your tech skills and connect with the community.',
  keywords: 'tech events, workshops, webinars, networking, open house, Cambodia tech education, professional development',
  openGraph: {
    title: 'Events & Workshops - Seksaa Tech Academy',
    description: 'Join our workshops, webinars, networking events, and open houses. Advance your tech skills and connect with the community.',
    type: 'website',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Tech events and workshops at Seksaa Tech Academy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Events & Workshops - Seksaa Tech Academy',
    description: 'Join our workshops, webinars, networking events, and open houses. Advance your tech skills and connect with the community.',
    images: ['https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function EventsPage() {
  return <EventsPageClient />;
} 