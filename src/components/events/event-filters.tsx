'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import { Event, EventFilters as EventFiltersType, EventsData } from '@/types/event';

interface EventFiltersProps {
  filters: EventFiltersType;
  onFiltersChange: (filters: EventFiltersType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  events: Event[];
}

export default function EventFilters({
  filters,
  onFiltersChange,
  searchQuery,
  onSearchChange,
  events
}: EventFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract unique values from events
  const eventTypes = Array.from(new Set(events.map(e => e.type)));
  const categories = Array.from(new Set(events.map(e => e.category)));
  const levels = Array.from(new Set(events.map(e => e.level)));
  const locationTypes = Array.from(new Set(events.map(e => e.location.type)));
  const allTags = Array.from(new Set(events.flatMap(e => e.tags)));

  const handleFilterChange = (key: keyof EventFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleArrayFilterChange = (key: keyof EventFiltersType, value: string, checked: boolean) => {
    const currentArray = (filters[key] as string[]) || [];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter(item => item !== value);
    
    handleFilterChange(key, newArray.length > 0 ? newArray : undefined);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
    onSearchChange('');
  };

  const hasActiveFilters = Object.keys(filters).length > 0 || searchQuery.length > 0;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Events</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="Search by title, description, or tags..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Event Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Event Type</Label>
          <div className="space-y-2">
            {eventTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={(filters.type || []).includes(type)}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('type', type, checked as boolean)
                  }
                />
                <Label htmlFor={`type-${type}`} className="text-sm capitalize">
                  {type.replace('-', ' ')}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Category</Label>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={(filters.category || []).includes(category)}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('category', category, checked as boolean)
                  }
                />
                <Label htmlFor={`category-${category}`} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Level */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Level</Label>
          <div className="space-y-2">
            {levels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${level}`}
                  checked={(filters.level || []).includes(level)}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('level', level, checked as boolean)
                  }
                />
                <Label htmlFor={`level-${level}`} className="text-sm capitalize">
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Location Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Location</Label>
          <div className="space-y-2">
            {locationTypes.map((locationType) => (
              <div key={locationType} className="flex items-center space-x-2">
                <Checkbox
                  id={`location-${locationType}`}
                  checked={(filters.location || []).includes(locationType)}
                  onCheckedChange={(checked) => 
                    handleArrayFilterChange('location', locationType, checked as boolean)
                  }
                />
                <Label htmlFor={`location-${locationType}`} className="text-sm capitalize">
                  {locationType.replace('-', ' ')}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Price Range</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min-price" className="text-xs text-gray-500">Min</Label>
              <Input
                id="min-price"
                type="number"
                placeholder="$0"
                value={filters.priceRange?.min || ''}
                onChange={(e) => {
                  const min = parseInt(e.target.value) || 0;
                  handleFilterChange('priceRange', {
                    min,
                    max: filters.priceRange?.max || 1000
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs text-gray-500">Max</Label>
              <Input
                id="max-price"
                type="number"
                placeholder="$1000"
                value={filters.priceRange?.max || ''}
                onChange={(e) => {
                  const max = parseInt(e.target.value) || 1000;
                  handleFilterChange('priceRange', {
                    min: filters.priceRange?.min || 0,
                    max
                  });
                }}
              />
            </div>
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Date Range</Label>
          <div className="space-y-2">
            <div>
              <Label htmlFor="start-date" className="text-xs text-gray-500">From</Label>
              <Input
                id="start-date"
                type="date"
                value={filters.dateRange?.start || ''}
                onChange={(e) => {
                  handleFilterChange('dateRange', {
                    start: e.target.value,
                    end: filters.dateRange?.end || ''
                  });
                }}
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-xs text-gray-500">To</Label>
              <Input
                id="end-date"
                type="date"
                value={filters.dateRange?.end || ''}
                onChange={(e) => {
                  handleFilterChange('dateRange', {
                    start: filters.dateRange?.start || '',
                    end: e.target.value
                  });
                }}
              />
            </div>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Popular Tags</Label>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, isExpanded ? allTags.length : 8).map((tag) => (
              <Badge
                key={tag}
                variant={(filters.tags || []).includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-orange-500 hover:text-white"
                onClick={() => {
                  const isSelected = (filters.tags || []).includes(tag);
                  handleArrayFilterChange('tags', tag, !isSelected);
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
          {allTags.length > 8 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs"
            >
              {isExpanded ? 'Show Less' : `Show ${allTags.length - 8} More`}
            </Button>
          )}
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <div className="space-y-2 pt-4 border-t">
            <Label className="text-sm font-medium">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => onSearchChange('')}
                  />
                </Badge>
              )}
              {filters.type?.map(type => (
                <Badge key={type} variant="secondary" className="flex items-center gap-1">
                  {type}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleArrayFilterChange('type', type, false)}
                  />
                </Badge>
              ))}
              {filters.category?.map(category => (
                <Badge key={category} variant="secondary" className="flex items-center gap-1">
                  {category}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleArrayFilterChange('category', category, false)}
                  />
                </Badge>
              ))}
              {filters.level?.map(level => (
                <Badge key={level} variant="secondary" className="flex items-center gap-1">
                  {level}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => handleArrayFilterChange('level', level, false)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 