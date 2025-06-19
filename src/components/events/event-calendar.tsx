'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Event, CalendarView } from '@/types/event';

interface EventCalendarProps {
  events: Event[];
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  onEventSelect: (event: Event) => void;
  onRegisterClick: (event: Event) => void;
}

export default function EventCalendar({
  events,
  view,
  onViewChange,
  onEventSelect,
  onRegisterClick
}: EventCalendarProps) {
  const currentDate = new Date(view.currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get events for current month
  const monthEvents = events.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1);
    } else {
      newDate.setMonth(currentMonth + 1);
    }
    onViewChange({
      ...view,
      currentDate: newDate.toISOString().split('T')[0]
    });
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = monthEvents.filter(event => 
        event.startDate.split('T')[0] === dateString
      );

      days.push(
        <div key={day} className="h-24 border border-gray-200 p-1 overflow-hidden">
          <div className="font-medium text-sm mb-1">{day}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className="text-xs p-1 rounded bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 truncate"
                onClick={() => onEventSelect(event)}
              >
                {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-0 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded">
          {renderCalendarGrid()}
        </div>

        {/* Events List for Selected Month */}
        {monthEvents.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Events This Month</h3>
            <div className="space-y-2">
              {monthEvents.slice(0, 5).map(event => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                  onClick={() => onEventSelect(event)}
                >
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(event.startDate).toLocaleDateString()} at{' '}
                      {new Date(event.startDate).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={event.price === 0 ? 'secondary' : 'default'}>
                      {event.price === 0 ? 'FREE' : `$${event.price}`}
                    </Badge>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRegisterClick(event);
                      }}
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      Register
                    </Button>
                  </div>
                </div>
              ))}
              {monthEvents.length > 5 && (
                <div className="text-center text-sm text-gray-500">
                  And {monthEvents.length - 5} more events this month
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 