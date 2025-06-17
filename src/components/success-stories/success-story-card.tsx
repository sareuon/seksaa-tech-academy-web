import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SuccessStory } from "@/types"
import { Building, Calendar, TrendingUp, DollarSign, Clock, Award, ExternalLink, Linkedin } from "lucide-react"
import Link from "next/link"

interface SuccessStoryCardProps {
  story: SuccessStory
  programTitle?: string
  compact?: boolean
  showFullStory?: boolean
}

export function SuccessStoryCard({ 
  story, 
  programTitle, 
  compact = false, 
  showFullStory = false 
}: SuccessStoryCardProps) {
  const enrolledDate = new Date(story.timeline.enrolled)
  const graduatedDate = new Date(story.timeline.graduated)
  const employedDate = new Date(story.timeline.employed)
  
  const timeToEmployment = Math.ceil(
    (employedDate.getTime() - graduatedDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${compact ? 'h-auto' : 'h-full'} group`}>
      <CardHeader className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-orange-50 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex items-start gap-4 mb-4">
            {/* Profile Image Placeholder */}
            <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="text-white text-lg font-bold">
                {story.studentName.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div className="flex-1">
              <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">
                {story.studentName}
              </CardTitle>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-brand-600 font-medium">
                  <Building className="h-4 w-4" />
                  <span>{story.currentPosition.en}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {story.currentCompany}
                </div>
              </div>
            </div>
          </div>

          {/* Story Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
            {story.title.en}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Program Badge */}
        {programTitle && (
          <Badge variant="secondary" className="bg-brand-100 text-brand-700">
            {programTitle}
          </Badge>
        )}

        {/* Story Preview */}
        <blockquote className={`text-muted-foreground italic leading-relaxed ${compact ? 'text-sm line-clamp-3' : 'text-sm line-clamp-4'}`}>
          "{story.quote.en}"
        </blockquote>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-100">
          {story.salaryIncrease && (
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 font-bold text-lg">
                <TrendingUp className="h-4 w-4" />
                <span>+{story.salaryIncrease.percentage}%</span>
              </div>
              <div className="text-xs text-muted-foreground">Salary Increase</div>
            </div>
          )}
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 font-bold text-lg">
              <Clock className="h-4 w-4" />
              <span>{timeToEmployment}d</span>
            </div>
            <div className="text-xs text-muted-foreground">Time to Employment</div>
          </div>
        </div>

        {/* Skills */}
        {!compact && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Award className="h-4 w-4" />
              Key Skills Gained
            </h4>
            <div className="flex flex-wrap gap-1">
              {story.skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {story.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{story.skills.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Timeline */}
        {!compact && (
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Journey Timeline
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Enrolled:</span>
                <span>{enrolledDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Graduated:</span>
                <span>{graduatedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employed:</span>
                <span>{employedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        )}

        {/* Full Story */}
        {showFullStory && (
          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Full Story</h4>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {story.story.en}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="text-xs text-muted-foreground">
            Graduated {graduatedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          
          {!showFullStory && (
            <Link href={`/success-stories/${story.id}` as any}>
              <Button variant="ghost" size="sm" className="text-brand-600 hover:text-brand-700">
                Read Full Story
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 