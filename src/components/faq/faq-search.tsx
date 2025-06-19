"use client"

import React, { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { useTranslations } from 'next-intl'

interface FAQSearchProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedCategory: string
  onCategoryChange: (category: string) => void
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  availableTags: string[]
  className?: string
}

const categories = [
  { value: 'all', labelKey: 'all' },
  { value: 'general', labelKey: 'general' },
  { value: 'programs', labelKey: 'programs' },
  { value: 'enrollment', labelKey: 'enrollment' },
  { value: 'payment', labelKey: 'payment' },
  { value: 'career', labelKey: 'career' },
  { value: 'technical', labelKey: 'technical' }
]

export function FAQSearch({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedTags,
  onTagsChange,
  availableTags,
  className = ""
}: FAQSearchProps) {
  const t = useTranslations('faq')
  const [showFilters, setShowFilters] = useState(false)

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  const clearAllFilters = () => {
    onSearchChange('')
    onCategoryChange('all')
    onTagsChange([])
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedTags.length > 0

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-12"
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Categories */}
            <div>
              <h4 className="text-sm font-medium mb-2">{t('categories.title')}</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => onCategoryChange(category.value)}
                    className="text-xs"
                  >
                    {t(`categories.${category.labelKey}`)}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tags */}
            {availableTags.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">{t('tags.title')}</h4>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-brand-100 text-xs"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            {hasActiveFilters && (
              <div className="pt-2 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-xs"
                >
                  <X className="h-3 w-3 mr-1" />
                  {t('clearFilters')}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">{t('activeFilters')}:</span>
          
          {searchQuery && (
            <Badge variant="secondary" className="text-xs">
              {t('search')}: "{searchQuery}"
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => onSearchChange('')}
              />
            </Badge>
          )}
          
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {t(`categories.${selectedCategory}`)}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => onCategoryChange('all')}
              />
            </Badge>
          )}
          
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag.replace('-', ' ')}
              <X 
                className="h-3 w-3 ml-1 cursor-pointer" 
                onClick={() => handleTagToggle(tag)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
} 