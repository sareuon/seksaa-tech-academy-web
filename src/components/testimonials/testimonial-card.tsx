import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Building, GraduationCap } from "lucide-react"
import Link from "next/link"
import { Testimonial } from "@/types"

interface TestimonialCardProps {
  testimonial: Testimonial
  programTitle?: string
  showProgram?: boolean
  compact?: boolean
}

export function TestimonialCard({ 
  testimonial, 
  programTitle, 
  showProgram = true, 
  compact = false 
}: TestimonialCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow h-full">
      <CardContent className={`${compact ? 'p-4' : 'p-6'}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {testimonial.studentName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-900 truncate">{testimonial.studentName}</h4>
            {testimonial.currentPosition && (
              <p className={`text-brand-600 font-medium ${compact ? 'text-xs' : 'text-sm'} truncate`}>
                {testimonial.currentPosition.en}
              </p>
            )}
            {testimonial.currentCompany && (
              <div className={`flex items-center gap-1 ${compact ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
                <Building className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{testimonial.currentCompany}</span>
              </div>
            )}
          </div>
        </div>
        
        {showProgram && programTitle && (
          <Badge variant="outline" className={`mb-3 ${compact ? 'text-xs' : 'text-xs'}`}>
            {programTitle}
          </Badge>
        )}
        
        <blockquote className={`text-muted-foreground italic ${compact ? 'text-sm' : 'text-sm'} mb-4 leading-relaxed ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
          "{testimonial.testimonial.en}"
        </blockquote>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} ${
                  i < testimonial.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'
                }`} 
              />
            ))}
            {!compact && (
              <span className="text-xs text-muted-foreground ml-1">({testimonial.rating}/5)</span>
            )}
          </div>
          
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <GraduationCap className="h-3 w-3" />
            <span>
              {new Date(testimonial.graduationDate).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </span>
          </div>
        </div>
        
        {testimonial.beforeAfter && !compact && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="space-y-2 text-xs">
              <div>
                <span className="text-red-600 font-medium">Before:</span>
                <span className="text-muted-foreground ml-1 line-clamp-1">
                  {testimonial.beforeAfter.before.en}
                </span>
              </div>
              <div>
                <span className="text-green-600 font-medium">After:</span>
                <span className="text-muted-foreground ml-1 line-clamp-1">
                  {testimonial.beforeAfter.after.en}
                </span>
              </div>
            </div>
          </div>
        )}
        
        {testimonial.featured && (
          <div className="mt-4">
            <Link href="/success-stories">
              <button className="text-brand-600 hover:text-brand-700 text-sm font-medium transition-colors">
                Read Full Story →
              </button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 