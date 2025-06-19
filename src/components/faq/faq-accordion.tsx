"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp, Star, Tag } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useLocale } from 'next-intl'
import { FAQ } from '@/types'

interface FAQAccordionProps {
  faqs: FAQ[]
  className?: string
}

interface AccordionItemProps {
  faq: FAQ
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ faq, isOpen, onToggle }: AccordionItemProps) {
  const locale = useLocale() as 'en' | 'km'
  
  return (
    <Card className={`transition-all duration-200 ${isOpen ? 'ring-2 ring-brand-200' : 'hover:shadow-md'}`}>
      <CardHeader className="pb-3">
        <Button
          variant="ghost"
          onClick={onToggle}
          className="w-full justify-between text-left p-0 h-auto hover:bg-transparent"
        >
          <div className="flex-1">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                  {faq.question[locale]}
                </h3>
                
                {/* Category and Featured Badge */}
                <div className="flex items-center gap-2 mt-2">
                  <Badge 
                    variant="outline" 
                    className="text-xs capitalize"
                  >
                    {faq.category}
                  </Badge>
                  
                  {faq.featured && (
                    <Badge 
                      variant="default" 
                      className="text-xs bg-amber-100 text-amber-800 hover:bg-amber-200"
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex-shrink-0 ml-4">
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
          </div>
        </Button>
      </CardHeader>
      
      {/* Animated Content */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <CardContent className="pt-0 pb-4">
          <div className="border-t pt-4">
            <p className="text-muted-foreground leading-relaxed mb-4">
              {faq.answer[locale]}
            </p>
            
            {/* Tags */}
            {faq.tags && faq.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag className="h-3 w-3 text-gray-400" />
                {faq.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="text-xs"
                  >
                    {tag.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export function FAQAccordion({ faqs, className = "" }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const expandAll = () => {
    setOpenItems(new Set(faqs.map(faq => Number(faq.id))))
  }

  const collapseAll = () => {
    setOpenItems(new Set())
  }

  if (faqs.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No FAQs found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Expand/Collapse Controls */}
      {faqs.length > 1 && (
        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={expandAll}
            className="text-xs"
          >
            Expand All
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={collapseAll}
            className="text-xs"
          >
            Collapse All
          </Button>
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <AccordionItem
            key={faq.id}
            faq={faq}
            isOpen={openItems.has(Number(faq.id))}
            onToggle={() => toggleItem(Number(faq.id))}
          />
        ))}
      </div>
    </div>
  )
} 