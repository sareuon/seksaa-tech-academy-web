'use client'

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useTranslations } from 'next-intl'

interface BlogFiltersProps {
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string | null) => void
  onTagChange: (tag: string | null) => void
  selectedCategory: string | null
  selectedTag: string | null
  searchQuery: string
  availableCategories: string[]
  availableTags: string[]
}

export function BlogFilters({
  onSearchChange,
  onCategoryChange,
  onTagChange,
  selectedCategory,
  selectedTag,
  searchQuery,
  availableCategories,
  availableTags
}: BlogFiltersProps) {
  const t = useTranslations('blog')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const clearAllFilters = () => {
    onSearchChange('')
    onCategoryChange(null)
    onTagChange(null)
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      technology: t('categories.technology'),
      career: t('categories.career'),
      education: t('categories.education'),
      tutorial: t('categories.tutorial')
    }
    return labels[category] || category
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2 w-full"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSearchChange('')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {t('filters')}
          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2">
              {[searchQuery, selectedCategory, selectedTag].filter(Boolean).length}
            </Badge>
          )}
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4 mr-1" />
            {t('clearFilters')}
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1">
              {t('search')}: "{searchQuery}"
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange('')}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedCategory && (
            <Badge variant="outline" className="flex items-center gap-1">
              {t('category')}: {getCategoryLabel(selectedCategory)}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCategoryChange(null)}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {selectedTag && (
            <Badge variant="outline" className="flex items-center gap-1">
              {t('tag')}: {selectedTag}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onTagChange(null)}
                className="h-4 w-4 p-0 ml-1"
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      {/* Expandable Filters */}
      {isFilterOpen && (
        <Card className="p-4 space-y-4">
          {/* Categories */}
          <div>
            <h4 className="font-medium mb-3">{t('categories.title')}</h4>
            <div className="flex flex-wrap gap-2">
              {availableCategories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer hover:bg-brand-100 transition-colors"
                  onClick={() => onCategoryChange(selectedCategory === category ? null : category)}
                >
                  {getCategoryLabel(category)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h4 className="font-medium mb-3">{t('tags.title')}</h4>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  className="cursor-pointer hover:bg-brand-100 transition-colors"
                  onClick={() => onTagChange(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
} 