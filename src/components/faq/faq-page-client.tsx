"use client"

import React, { useState, useMemo } from 'react'
import { FAQSearch } from './faq-search'
import { FAQAccordion } from './faq-accordion'
import { FAQ } from '@/types'

interface FAQPageClientProps {
  faqs: FAQ[]
}

export function FAQPageClient({ faqs }: FAQPageClientProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  // Extract all unique tags from FAQs
  const availableTags = useMemo(() => {
    const tags = new Set<string>()
    faqs.forEach(faq => {
      faq.tags?.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [faqs])

  // Filter FAQs based on search and filters
  const filteredFAQs = useMemo(() => {
    return faqs.filter(faq => {
      // Search filter
      const matchesSearch = !searchQuery || 
        faq.question.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.question.km && faq.question.km.toLowerCase().includes(searchQuery.toLowerCase())) ||
        faq.answer.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faq.answer.km && faq.answer.km.toLowerCase().includes(searchQuery.toLowerCase())) ||
        faq.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory

      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => faq.tags?.includes(tag))

      return matchesSearch && matchesCategory && matchesTags
    }).sort((a, b) => {
      // Sort by featured first, then by order
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return a.order - b.order
    })
  }, [faqs, searchQuery, selectedCategory, selectedTags])

  return (
    <div className="max-w-4xl mx-auto">
      {/* Search and Filters */}
      <div className="mb-8">
        <FAQSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          availableTags={availableTags}
        />
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          {filteredFAQs.length === faqs.length 
            ? `Showing all ${faqs.length} questions`
            : `Showing ${filteredFAQs.length} of ${faqs.length} questions`
          }
        </p>
      </div>

      {/* FAQ Accordion */}
      <FAQAccordion faqs={filteredFAQs} />
    </div>
  )
} 