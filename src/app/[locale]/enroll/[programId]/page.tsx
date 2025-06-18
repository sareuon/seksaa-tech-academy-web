import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  Clock, 
  Users, 
  Award, 
  Star,
  Calendar,
  DollarSign
} from 'lucide-react'
import EnrollmentPageClient from '@/components/enrollment/enrollment-page-client'
import { 
  getProgramById,
  getAllPrograms,
  getPaymentPlans,
  getScholarships,
  getEnrollmentRequirementsForProgram,
  getInstructorsByIds,
  calculateProgramPrice
} from '@/lib/data'

export async function generateStaticParams() {
  const programs = getAllPrograms()
  return programs.map((program) => ({
    programId: program.id,
  }))
}

interface ProgramEnrollPageProps {
  params: {
    programId: string
  }
}

export default function ProgramEnrollPage({ params }: ProgramEnrollPageProps) {
  const program = getProgramById(params.programId)
  const paymentPlans = getPaymentPlans()
  const scholarships = getScholarships()

  if (!program) {
    notFound()
  }

  const requirements = getEnrollmentRequirementsForProgram(program.id)
  const instructors = getInstructorsByIds(program.instructorIds || [])
  const priceCalculation = calculateProgramPrice(program.id, 'full-payment')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/enroll">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Programs
              </Button>
            </Link>
          </div>
          
          <div className="flex items-start gap-6">
            <div className="text-6xl">🎓</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{program.title.en}</h1>
                {program.featured && (
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Most Popular
                  </Badge>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">{program.shortDescription.en}</p>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {program.duration.weeks} weeks
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {program.format}
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  {program.level}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Next cohort: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <EnrollmentPageClient
                program={program}
                paymentPlans={paymentPlans}
                scholarships={scholarships}
                instructors={instructors}
                requirements={requirements}
                priceCalculation={priceCalculation}
              />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Program Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      ${program.pricing.fullPrice.toLocaleString()}
                    </div>
                    {program.pricing.discountPrice && (
                      <div className="text-lg text-gray-500 line-through">
                        ${program.pricing.discountPrice.toLocaleString()}
                      </div>
                    )}
                    <div className="text-sm text-gray-600">Full program price</div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">What&apos;s Included:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {program.duration.totalHours} hours of instruction</li>
                      <li>• Hands-on projects and assignments</li>
                      <li>• Career support and job placement assistance</li>
                      <li>• Certificate of completion</li>
                      <li>• Lifetime access to course materials</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Program Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-medium">{program.duration.weeks} weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Hours per week:</span>
                    <span className="text-sm font-medium">{program.duration.hoursPerWeek} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total hours:</span>
                    <span className="text-sm font-medium">{program.duration.totalHours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Format:</span>
                    <span className="text-sm font-medium">{program.format}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 