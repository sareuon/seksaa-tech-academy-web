'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, ExternalLink, Download } from 'lucide-react';
import { Event } from '@/types/event';

interface EventListProps {
  events: Event[];
  onEventSelect: (event: Event) => void;
  onRegisterClick: (event: Event) => void;
}

export default function EventList({ events, onEventSelect, onRegisterClick }: EventListProps) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilEvent = (startDate: string) => {
    const today = new Date();
    const eventDate = new Date(startDate);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isEventPast = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const getEventStatusBadge = (event: Event) => {
    const daysUntil = getDaysUntilEvent(event.startDate);
    const isPast = isEventPast(event.endDate);

    if (isPast) {
      return <Badge variant="secondary">Completed</Badge>;
    }
    if (daysUntil < 0) {
      return <Badge variant="destructive">Ongoing</Badge>;
    }
    if (daysUntil === 0) {
      return <Badge variant="default" className="bg-green-600">Today</Badge>;
    }
    if (daysUntil === 1) {
      return <Badge variant="default" className="bg-orange-600">Tomorrow</Badge>;
    }
    if (daysUntil <= 7) {
      return <Badge variant="outline">This Week</Badge>;
    }
    return <Badge variant="outline">Upcoming</Badge>;
  };

  const getLocationIcon = (locationType: string) => {
    switch (locationType) {
      case 'online':
        return '💻';
      case 'in-person':
        return '🏢';
      case 'hybrid':
        return '🔗';
      default:
        return '📍';
    }
  };

  const exportToCalendar = (event: Event) => {
    // Create ICS file content
    const startDate = new Date(event.startDate);
    const endDate = new Date(event.endDate);
    
    const formatICSDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Seksaa Tech Academy//Events//EN
BEGIN:VEVENT
UID:${event.id}@seksaatech.edu.kh
DTSTART:${formatICSDate(startDate)}
DTEND:${formatICSDate(endDate)}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location.venue || event.location.meetingLink || 'Online'}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    // Create and download file
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.title.replace(/[^a-zA-Z0-9]/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📅</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
        <p className="text-gray-600">Try adjusting your filters to find events that match your interests.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">
          {events.length} Event{events.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="text-sm text-gray-500">
          Sorted by date
        </div>
      </div>

      <div className="space-y-4">
        {events.map((event) => {
          const isExpanded = expandedEvent === event.id;
          const daysUntil = getDaysUntilEvent(event.startDate);
          const isPast = isEventPast(event.endDate);
          const availableSpots = event.capacity - event.registeredCount;

          return (
            <Card 
              key={event.id} 
              className={`transition-all duration-200 hover:shadow-lg ${isPast ? 'opacity-75' : ''}`}
            >
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getEventStatusBadge(event)}
                      <Badge variant="outline" className="capitalize">
                        {event.type.replace('-', ' ')}
                      </Badge>
                      <Badge variant={event.price === 0 ? 'secondary' : 'default'}>
                        {event.price === 0 ? 'FREE' : `$${event.price}`}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                    <CardDescription className="text-base">{event.description}</CardDescription>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => exportToCalendar(event)}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                    {!isPast && (
                      <Button
                        onClick={() => onRegisterClick(event)}
                        className="bg-orange-500 hover:bg-orange-600 flex items-center gap-2"
                        disabled={availableSpots <= 0}
                      >
                        {availableSpots <= 0 ? 'Full' : 'Register'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {/* Date & Time */}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">{formatDate(event.startDate)}</div>
                      <div className="text-sm text-gray-500">
                        {formatTime(event.startDate)} - {formatTime(event.endDate)}
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium flex items-center gap-1">
                        <span>{getLocationIcon(event.location.type)}</span>
                        <span className="capitalize">{event.location.type.replace('-', ' ')}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {event.location.venue || event.location.meetingLink ? 'Details available' : 'TBA'}
                      </div>
                    </div>
                  </div>

                  {/* Capacity */}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <div>
                      <div className="font-medium">
                        {event.registeredCount} / {event.capacity || 'Unlimited'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {availableSpots > 0 ? `${availableSpots} spots left` : 'Fully booked'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.slice(0, 5).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {event.tags.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{event.tags.length - 5} more
                    </Badge>
                  )}
                </div>

                {/* Instructor */}
                {event.instructor && (
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={event.instructor.avatar}
                      alt={event.instructor.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium">{event.instructor.name}</div>
                      <div className="text-sm text-gray-500">{event.instructor.title}</div>
                    </div>
                  </div>
                )}

                {/* Expandable Details */}
                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {isExpanded ? 'Show Less' : 'Show Details'}
                  </Button>
                  
                  {daysUntil >= 0 && !isPast && (
                    <div className="text-sm text-gray-500">
                      {daysUntil === 0 ? 'Today' : 
                       daysUntil === 1 ? 'Tomorrow' : 
                       `In ${daysUntil} days`}
                    </div>
                  )}
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t space-y-4">
                    {/* What You'll Learn */}
                    {event.whatYouWillLearn.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">What You'll Learn</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {event.whatYouWillLearn.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Prerequisites */}
                    {event.prerequisites && event.prerequisites.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Prerequisites</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {event.prerequisites.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Materials */}
                    {event.materials && event.materials.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Required Materials</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {event.materials.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Location Details */}
                    <div>
                      <h4 className="font-semibold mb-2">Location Details</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        {event.location.venue && (
                          <div><strong>Venue:</strong> {event.location.venue}</div>
                        )}
                        {event.location.address && (
                          <div><strong>Address:</strong> {event.location.address}</div>
                        )}
                        {event.location.room && (
                          <div><strong>Room:</strong> {event.location.room}</div>
                        )}
                        {event.location.meetingLink && (
                          <div className="flex items-center gap-2">
                            <strong>Meeting Link:</strong>
                            <a 
                              href={event.location.meetingLink} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                            >
                              Join Meeting <ExternalLink className="h-3 w-3" />
                            </a>
                          </div>
                        )}
                        {event.location.meetingId && (
                          <div><strong>Meeting ID:</strong> {event.location.meetingId}</div>
                        )}
                      </div>
                    </div>

                    {/* Cancellation Policy */}
                    <div>
                      <h4 className="font-semibold mb-2">Cancellation Policy</h4>
                      <p className="text-sm text-gray-600">{event.cancellationPolicy}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
} 