'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import EventFilters from './event-filters';
import { Event, EventsData, EventFilters as EventFiltersType } from '@/types/event';
import eventsData from '@/data/events.json';

export default function EventsPageClient() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<EventFiltersType>({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const data = eventsData as EventsData;
    setEvents(data.events);
    setFilteredEvents(data.events);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [events, filters, searchQuery]);

  const applyFilters = () => {
    let filtered = [...events];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query)) ||
        event.category.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filters.type && filters.type.length > 0) {
      filtered = filtered.filter(event => filters.type!.includes(event.type));
    }

    // Category filter
    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(event => filters.category!.includes(event.category));
    }

    // Level filter
    if (filters.level && filters.level.length > 0) {
      filtered = filtered.filter(event => 
        filters.level!.includes(event.level) || event.level === 'all'
      );
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      filtered = filtered.filter(event => filters.location!.includes(event.location.type));
    }

    // Only show published events
    filtered = filtered.filter(event => event.status === 'published');

    // Sort by date (upcoming first)
    filtered.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    setFilteredEvents(filtered);
  };

  const upcomingEvents = filteredEvents.filter(event => 
    new Date(event.startDate) > new Date()
  ).slice(0, 3);

  const featuredEvents = filteredEvents.filter(event => 
    event.type === 'workshop' || event.type === 'open-house'
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Events & Workshops
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join our community of learners through workshops, webinars, networking events, and open houses. 
              Advance your tech skills and connect with industry professionals.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Events</CardTitle>
              <span className="text-2xl">📅</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredEvents.length}</div>
              <p className="text-xs text-muted-foreground">Available events</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <span className="text-2xl">⏰</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingEvents.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Free Events</CardTitle>
              <span className="text-2xl">🆓</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredEvents.filter(e => e.price === 0).length}
              </div>
              <p className="text-xs text-muted-foreground">No cost to attend</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Online Events</CardTitle>
              <span className="text-2xl">💻</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredEvents.filter(e => e.location.type === 'online').length}
              </div>
              <p className="text-xs text-muted-foreground">Join from anywhere</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Events */}
        {featuredEvents.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredEvents.map((event) => (
                <Card key={event.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant={event.price === 0 ? 'secondary' : 'default'}>
                        {event.price === 0 ? 'FREE' : `$${event.price}`}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2 capitalize">
                      {event.type.replace('-', ' ')}
                    </Badge>
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {new Date(event.startDate).toLocaleDateString()}
                      </span>
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Register
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <EventFilters
              filters={filters}
              onFiltersChange={setFilters}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              events={events}
            />
          </div>

          {/* Events List */}
          <div className="lg:w-3/4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="text-sm text-gray-500">
                  Sorted by date
                </div>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
                  <p className="text-gray-600">Try adjusting your filters to find events that match your interests.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEvents.map((event) => (
                    <Card key={event.id} className="transition-all duration-200 hover:shadow-lg">
                      <CardHeader>
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="capitalize">
                                {event.type.replace('-', ' ')}
                              </Badge>
                              <Badge variant={event.price === 0 ? 'secondary' : 'default'}>
                                {event.price === 0 ? 'FREE' : `$${event.price}`}
                              </Badge>
                            </div>
                            <CardTitle className="text-xl mb-2">{event.title}</CardTitle>
                            <p className="text-gray-600">{event.description}</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button className="bg-orange-500 hover:bg-orange-600">
                              Register
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="font-medium">
                              {new Date(event.startDate).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(event.startDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })} - {new Date(event.endDate).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </div>
                          </div>

                          <div>
                            <div className="font-medium capitalize">
                              {event.location.type.replace('-', ' ')}
                            </div>
                            <div className="text-sm text-gray-500">
                              {event.location.venue || 'Online'}
                            </div>
                          </div>

                          <div>
                            <div className="font-medium">
                              {event.registeredCount} / {event.capacity}
                            </div>
                            <div className="text-sm text-gray-500">
                              {event.capacity - event.registeredCount} spots left
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
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
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 