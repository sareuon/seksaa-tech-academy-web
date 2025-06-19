'use client'

import { useState, useMemo } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { BlogCard } from './blog-card'
import { BlogFilters } from './blog-filters'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPost {
  id: string
  title: { en: string; km: string }
  slug: string
  excerpt: { en: string; km: string }
  content: { en: string; km: string }
  featuredImage: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  category: string
  tags: string[]
  publishedAt: string
  readingTime: number
  featured: boolean
  isActive: boolean
}

interface BlogListProps {
  posts: BlogPost[]
}

export function BlogList({ posts }: BlogListProps) {
  const locale = useLocale() as 'en' | 'km'
  const t = useTranslations('blog')
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  
  const postsPerPage = 6

  // Get available categories and tags
  const availableCategories = useMemo(() => {
    const categories = posts.filter(post => post.isActive).map(post => post.category)
    return Array.from(new Set(categories))
  }, [posts])

  const availableTags = useMemo(() => {
    const tags = posts.filter(post => post.isActive).flatMap(post => post.tags)
    return Array.from(new Set(tags)).sort()
  }, [posts])

  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      if (!post.isActive) return false
      
      // Search filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        const titleMatch = post.title[locale].toLowerCase().includes(searchLower)
        const excerptMatch = post.excerpt[locale].toLowerCase().includes(searchLower)
        const contentMatch = post.content[locale].toLowerCase().includes(searchLower)
        const tagMatch = post.tags.some(tag => tag.toLowerCase().includes(searchLower))
        const authorMatch = post.author.name.toLowerCase().includes(searchLower)
        
        if (!titleMatch && !excerptMatch && !contentMatch && !tagMatch && !authorMatch) {
          return false
        }
      }
      
      // Category filter
      if (selectedCategory && post.category !== selectedCategory) {
        return false
      }
      
      // Tag filter
      if (selectedTag && !post.tags.includes(selectedTag)) {
        return false
      }
      
      return true
    })
  }, [posts, searchQuery, selectedCategory, selectedTag, locale])

  // Separate featured and regular posts
  const featuredPosts = filteredPosts.filter(post => post.featured)
  const regularPosts = filteredPosts.filter(post => !post.featured)

  // Pagination
  const totalPages = Math.ceil(regularPosts.length / postsPerPage)
  const paginatedPosts = regularPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  // Reset pagination when filters change
  const handleFilterChange = (filterFn: () => void) => {
    filterFn()
    setCurrentPage(1)
  }

  const hasResults = filteredPosts.length > 0
  const hasFilters = searchQuery || selectedCategory || selectedTag

  return (
    <div className="space-y-8">
      {/* Filters */}
      <BlogFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedTag={selectedTag}
        availableCategories={availableCategories}
        availableTags={availableTags}
        onSearchChange={(search) => handleFilterChange(() => setSearchQuery(search))}
        onCategoryChange={(category) => handleFilterChange(() => setSelectedCategory(category))}
        onTagChange={(tag) => handleFilterChange(() => setSelectedTag(tag))}
      />

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          {hasFilters ? (
            t('filteredResults', { count: filteredPosts.length })
          ) : (
            t('totalPosts', { count: posts.filter(p => p.isActive).length })
          )}
        </p>
      </div>

      {/* No Results */}
      {!hasResults && hasFilters && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {t('noResults.title')}
            </h3>
            <p className="text-gray-600 mb-4">
              {t('noResults.description')}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
                setSelectedTag(null)
                setCurrentPage(1)
              }}
            >
              {t('noResults.clearFilters')}
            </Button>
          </div>
        </div>
      )}

      {/* Featured Posts */}
      {hasResults && featuredPosts.length > 0 && currentPage === 1 && !hasFilters && (
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold">{t('featured.title')}</h2>
            <span className="text-sm text-gray-500">({featuredPosts.length})</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredPosts.slice(0, 2).map((post) => (
              <BlogCard key={post.id} post={post} variant="featured" />
            ))}
          </div>
        </div>
      )}

      {/* Regular Posts */}
      {hasResults && (
        <div className="space-y-6">
          {(featuredPosts.length > 0 && currentPage === 1 && !hasFilters) && (
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{t('latest.title')}</h2>
              <span className="text-sm text-gray-500">({regularPosts.length})</span>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="default" />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                {t('pagination.previous')}
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = 
                    page === 1 || 
                    page === totalPages || 
                    Math.abs(page - currentPage) <= 1
                  
                  if (!showPage) {
                    // Show ellipsis
                    if (page === 2 && currentPage > 4) {
                      return <span key={page} className="px-2 text-gray-400">...</span>
                    }
                    if (page === totalPages - 1 && currentPage < totalPages - 3) {
                      return <span key={page} className="px-2 text-gray-400">...</span>
                    }
                    return null
                  }
                  
                  return (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 p-0"
                    >
                      {page}
                    </Button>
                  )
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                {t('pagination.next')}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 