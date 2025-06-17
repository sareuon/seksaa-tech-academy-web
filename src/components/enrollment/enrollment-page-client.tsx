'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  Star,
  Calendar,
  MapPin,
  DollarSign,
  GraduationCap,
  BookOpen,
  Target,
  TrendingUp,
  Shield
} from 'lucide-react'
import EnrollmentForm from '@/components/enrollment/enrollment-form'
import PaymentPlanCard from '@/components/enrollment/payment-plan-card'
import type { EnrollmentFormData, Program, PaymentPlan, Scholarship } from '@/types'
import type { Instructor } from '@/lib/data'

interface EnrollmentPageClientProps {
  program: Program
  paymentPlans: PaymentPlan[]
  scholarships: Scholarship[]
  instructors: Instructor[]
  requirements: any
  priceCalculation: any
}

export default function EnrollmentPageClient({
  program,
  paymentPlans,
  scholarships,
  instructors,
  requirements,
  priceCalculation
}: EnrollmentPageClientProps) {
  const [showForm, setShowForm] = useState(false)
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState('full-payment')
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentFormData | null>(null)

  const handleEnrollmentSubmit = (data: EnrollmentFormData) => {
    setEnrollmentData(data)
    console.log('Enrollment submitted:', data)
    alert('Enrollment submitted successfully! You will receive a confirmation email shortly.')
  }

  const handleFormCancel = () => {
    setShowForm(false)
  }

  if (showForm) {
    return (
      <EnrollmentForm
        programId={program.id}
        onSubmit={handleEnrollmentSubmit}
        onCancel={handleFormCancel}
      />
    )
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
          <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Program Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">{program.fullDescription?.en || program.shortDescription.en}</p>
              
              <div>
                <h4 className="font-semibold mb-3">What You'll Learn:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {program.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Program Highlights:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900">Hands-on Projects</h5>
                      <p className="text-sm text-blue-700">Build real-world applications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-green-900">Career Support</h5>
                      <p className="text-sm text-green-700">Job placement assistance</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="curriculum" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                Comprehensive curriculum designed by industry experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {program.modules.map((module, index) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                        {index + 1}
                      </div>
                      <h4 className="font-medium">{module.title.en}</h4>
                      <Badge variant="outline">{module.duration}h</Badge>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">{module.description.en}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Meet Your Instructors</CardTitle>
              <CardDescription>
                Learn from industry professionals with years of experience
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {instructors.map((instructor) => (
                  <div key={instructor.id} className="flex items-start gap-4 p-4 border rounded-lg">
                    <Image
                      src={instructor.image}
                      alt={instructor.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{instructor.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{instructor.title}</p>
                      <p className="text-sm text-gray-700">{instructor.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outcomes" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Career Outcomes</CardTitle>
              <CardDescription>
                What our graduates achieve after completing this program
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {program.careerOutcomes.placementRate}%
                  </div>
                  <p className="text-sm text-green-700">Job Placement Rate</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    ${program.careerOutcomes.averageSalary?.min.toLocaleString()}+
                  </div>
                  <p className="text-sm text-blue-700">Average Starting Salary</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">3-6</div>
                  <p className="text-sm text-purple-700">Months to Employment</p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold mb-3">Potential Job Titles:</h4>
                <div className="flex flex-wrap gap-2">
                  {program.careerOutcomes.jobTitles.map((title, index) => (
                    <Badge key={index} variant="outline">{title.en}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Enrollment Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Ready to Start Your Journey?
          </CardTitle>
          <CardDescription>
            Join thousands of students who have transformed their careers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => setShowForm(true)}
            >
              <GraduationCap className="h-5 w-5 mr-2" />
              Enroll Now
            </Button>
            <Button variant="outline" size="lg">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule a Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 