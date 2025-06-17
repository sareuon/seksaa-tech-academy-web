'use client'

import { Program } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, BookOpen, Star } from 'lucide-react'
import { getLocalizedText, getProgramCategoryInfo } from '@/lib/data'
import Link from 'next/link'
import Image from 'next/image'

interface ProgramCardProps {
  program: Program
  language?: 'en' | 'km'
  className?: string
}

// Temporary high-quality images representing Khmer/Asian students in tech learning
const getTemporaryThumbnail = (programId: string) => {
  const thumbnails = {
    'ai-machine-learning': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'data-engineering': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    'web-development': 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  }
  return thumbnails[programId as keyof typeof thumbnails] || thumbnails['web-development']
}

export function ProgramCard({ program, language = 'en', className = '' }: ProgramCardProps) {
  const categoryInfo = getProgramCategoryInfo(program.category, language)
  const title = getLocalizedText(program.title, language)
  const description = getLocalizedText(program.shortDescription, language)
  
  // Use temporary image or the actual thumbnail if it exists
  const thumbnailSrc = getTemporaryThumbnail(program.id)
  
  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col overflow-hidden ${className}`}>
      {/* Background Image Header */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={thumbnailSrc}
          alt={`${title} program - Asian students learning technology in modern classroom`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Featured Badge */}
        {program.featured && (
          <Badge 
            className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg border-0"
            title="Most Popular Program - Highly recommended by students and industry professionals"
          >
            <Star className="w-3 h-3 mr-1 fill-current" />
            Featured
          </Badge>
        )}
        
        {/* Program Category Icon */}
        <div className="absolute top-4 left-4">
          <div className={`w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center text-lg shadow-lg`}>
            {categoryInfo?.icon || '📚'}
          </div>
        </div>
        
        {/* Level Badge */}
        <div className="absolute bottom-4 left-4">
          <Badge variant="outline" className="bg-white/90 text-navy-700 border-white/50 backdrop-blur-sm font-medium capitalize">
            {program.level}
          </Badge>
        </div>
        
        {/* Format Badge */}
        <div className="absolute bottom-4 right-4">
          <Badge variant="outline" className="bg-orange-100/90 text-orange-700 border-orange-200/50 backdrop-blur-sm font-medium capitalize">
            {program.format}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex-1 flex flex-col p-6">
        <CardHeader className="p-0 pb-4 flex-shrink-0">
          <CardTitle className="text-xl font-bold text-navy-700 group-hover:text-navy-600 transition-colors leading-tight">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground line-clamp-3 leading-relaxed min-h-[4rem]">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-0 flex-1 flex flex-col">
          {/* Program Stats */}
          <div className="space-y-3 mb-6 flex-shrink-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-navy-600" />
              <span className="font-medium">{program.duration.weeks} weeks • {program.duration.hoursPerWeek} hours/week</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 text-navy-600" />
              <span className="font-medium">{program.modules.length} modules</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-navy-600" />
              <span className="font-medium">{program.instructorIds.length} expert instructor{program.instructorIds.length > 1 ? 's' : ''}</span>
            </div>
          </div>
          
          {/* Key Skills */}
          <div className="space-y-3 mb-6 flex-1">
            <p className="text-sm font-semibold text-navy-700">Key Skills:</p>
            <div className="flex flex-wrap gap-2">
              {program.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-medium bg-navy-50 text-navy-700 hover:bg-navy-100">
                  {skill.name}
                </Badge>
              ))}
              {program.skills.length > 3 && (
                <Badge variant="secondary" className="text-xs font-medium bg-orange-50 text-orange-700 hover:bg-orange-100">
                  +{program.skills.length - 3} more
                </Badge>
              )}
            </div>
          </div>
          
          {/* Pricing and CTA */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-navy-600">
                  ${program.pricing.fullPrice.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground font-medium">USD</span>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Job Placement</div>
                <div className="text-sm font-bold text-green-600">{program.careerOutcomes?.placementRate || 96}%</div>
              </div>
            </div>
            
            <Link href={`/programs/${program.id}` as any}>
              <Button 
                className="w-full bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                size="default"
              >
                Learn More & Enroll
              </Button>
            </Link>
          </div>
        </CardContent>
      </div>
    </Card>
  )
} 