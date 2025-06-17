import { notFound } from "next/navigation"
import { getAllSuccessStories, getAllPrograms } from "@/lib/data"
import { SuccessStoryCard } from "@/components/success-stories/success-story-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, TrendingUp, Clock, Award, Building, MapPin, ExternalLink, Linkedin } from "lucide-react"
import Link from "next/link"

interface SuccessStoryPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const successStories = getAllSuccessStories()
  
  return successStories.map((story) => ({
    id: story.id,
  }))
}

export default function SuccessStoryPage({ params }: SuccessStoryPageProps) {
  const successStories = getAllSuccessStories()
  const programs = getAllPrograms()
  
  const story = successStories.find(s => s.id === params.id)
  
  if (!story) {
    notFound()
  }
  
  const program = programs.find(p => p.id === story.programId)
  const enrolledDate = new Date(story.timeline.enrolled)
  const graduatedDate = new Date(story.timeline.graduated)
  const employedDate = new Date(story.timeline.employed)
  
  const timeToEmployment = Math.ceil(
    (employedDate.getTime() - graduatedDate.getTime()) / (1000 * 60 * 60 * 24)
  )
  
  const programDuration = Math.ceil(
    (graduatedDate.getTime() - enrolledDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  )

  return (
    <main className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-brand-50 via-white to-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Link href="/success-stories">
              <Button variant="ghost" className="text-brand-600 hover:text-brand-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Success Stories
              </Button>
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-6 mb-8">
              {/* Profile Image Placeholder */}
              <div className="w-24 h-24 bg-gradient-to-br from-brand-500 to-brand-600 rounded-3xl flex items-center justify-center flex-shrink-0">
                <span className="text-white text-2xl font-bold">
                  {story.studentName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {story.studentName}
                </h1>
                <div className="flex items-center gap-2 text-brand-600 font-medium text-lg mb-2">
                  <Building className="h-5 w-5" />
                  <span>{story.currentPosition.en}</span>
                </div>
                <div className="text-muted-foreground mb-4">
                  {story.currentCompany}
                </div>
                
                {program && (
                  <Badge variant="secondary" className="bg-brand-100 text-brand-700">
                    {program.title.en}
                  </Badge>
                )}
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {story.title.en}
            </h2>
            
            <blockquote className="text-xl text-muted-foreground italic border-l-4 border-brand-500 pl-6">
              "{story.quote.en}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {story.salaryIncrease && (
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    +{story.salaryIncrease.percentage}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Salary Increase
                  </div>
                  {story.salaryIncrease.before && (
                    <div className="text-xs text-muted-foreground mt-1">
                      ${story.salaryIncrease.before} → ${story.salaryIncrease.after}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-4">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {timeToEmployment}d
                </div>
                <div className="text-sm text-muted-foreground">
                  Time to Employment
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  After graduation
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">
                  {programDuration}mo
                </div>
                <div className="text-sm text-muted-foreground">
                  Program Duration
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  From start to finish
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Full Story */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">The Full Story</h3>
            
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {story.story.en}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline & Skills */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Journey Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Enrolled</div>
                    <div className="text-sm text-muted-foreground">
                      {enrolledDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Graduated</div>
                    <div className="text-sm text-muted-foreground">
                      {graduatedDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <div>
                    <div className="font-medium">Employed</div>
                    <div className="text-sm text-muted-foreground">
                      {employedDate.toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Skills Gained
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {story.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-700 py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Success Story?
            </h2>
            <p className="text-xl text-brand-100 mb-8">
              Join {story.studentName} and hundreds of other graduates who transformed their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/programs">
                <Button size="lg" variant="secondary" className="bg-white text-brand-700 hover:bg-gray-100">
                  Explore Programs
                </Button>
              </Link>
              <Link href="/enroll">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 