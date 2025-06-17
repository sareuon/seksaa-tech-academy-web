'use client'

import { Testimonial } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'
import { getLocalizedText } from '@/lib/data'

interface TestimonialCardProps {
  testimonial: Testimonial
  language?: 'en' | 'km'
  className?: string
}

export function TestimonialCard({ testimonial, language = 'en', className = '' }: TestimonialCardProps) {
  const testimonialText = getLocalizedText(testimonial.testimonial, language)
  const currentPosition = getLocalizedText(testimonial.currentPosition, language)
  const courseTitle = getLocalizedText(testimonial.courseTitle, language)
  
  return (
    <Card className={`bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 ${className}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {testimonial.studentName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{testimonial.studentName}</h4>
            <p className="text-sm text-muted-foreground">{currentPosition}</p>
            <p className="text-xs text-muted-foreground">{testimonial.currentCompany}</p>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
        
        <div className="relative">
          <Quote className="w-8 h-8 text-muted-foreground/20 absolute -top-2 -left-2" />
          <p className="text-muted-foreground italic pl-6 leading-relaxed">
            {testimonialText}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <Badge variant="outline" className="text-xs">
            {courseTitle}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
} 