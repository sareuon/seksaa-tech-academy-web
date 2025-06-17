'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  GraduationCap, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  ArrowRight,
  Shield,
  Heart,
  Star,
  Calendar,
  MapPin
} from 'lucide-react'
import EnrollmentForm from '@/components/enrollment/enrollment-form'
import PaymentPlanCard from '@/components/enrollment/payment-plan-card'
import { 
  getAllPrograms, 
  getPaymentPlans, 
  getScholarships,
  getSupportServices,
  getOnboardingProcess
} from '@/lib/data'
import type { EnrollmentFormData, Program } from '@/types'

function EnrollPageContent() {
  const [showForm, setShowForm] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [enrollmentData, setEnrollmentData] = useState<EnrollmentFormData | null>(null)

  const programs = getAllPrograms()
  const paymentPlans = getPaymentPlans()
  const scholarships = getScholarships()
  const supportServices = getSupportServices()
  const onboardingSteps = getOnboardingProcess()

  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program)
    setShowForm(true)
  }

  const handleEnrollmentSubmit = (data: EnrollmentFormData) => {
    setEnrollmentData(data)
    // Here you would typically send the data to your backend
    console.log('Enrollment submitted:', data)
    
    // Show success message or redirect
    alert('Enrollment submitted successfully! You will receive a confirmation email shortly.')
  }

  const handleFormCancel = () => {
    setShowForm(false)
    setSelectedProgram(null)
  }

  if (showForm) {
    return (
      <EnrollmentForm
        programId={selectedProgram?.id}
        onSubmit={handleEnrollmentSubmit}
        onCancel={handleFormCancel}
      />
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Tech Career Journey
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Join thousands of successful graduates who transformed their careers with our intensive bootcamps
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>96% Job Placement Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>285% Average Salary Increase</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                <span>45 Days to Employment</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Program Selection */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Program</h2>
            <p className="text-lg text-gray-600">
              Select the program that aligns with your career goals and start your transformation today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {programs.map((program) => (
              <Card key={program.id} className="relative hover:shadow-lg transition-all duration-200 group">
                {program.featured && (
                  <Badge className="absolute -top-2 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="text-4xl mb-2">🎓</div>
                    <Badge variant="outline">{program.level}</Badge>
                  </div>
                  <CardTitle className="text-xl">{program.title.en}</CardTitle>
                  <CardDescription>{program.shortDescription.en}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {program.duration.weeks} weeks
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {program.format}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Starting from:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${program.pricing.fullPrice.toLocaleString()}
                      </span>
                    </div>
                    {program.pricing.discountPrice && (
                      <div className="text-sm text-gray-500">
                        Or ${program.pricing.discountPrice}/month
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Key Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {program.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill.name}
                        </Badge>
                      ))}
                      {program.skills.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{program.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button 
                    onClick={() => handleProgramSelect(program)}
                    className="w-full group-hover:bg-blue-700 transition-colors"
                  >
                    Enroll Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Plans Preview */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Flexible Payment Options</h2>
              <p className="text-lg text-gray-600">
                Choose a payment plan that works for your budget
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {paymentPlans.map((plan) => (
                <PaymentPlanCard
                  key={plan.id}
                  plan={plan}
                  originalPrice={2500} // Example price
                  showDetails={false}
                />
              ))}
            </div>
          </div>

          {/* Scholarships */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Scholarship Opportunities</h2>
              <p className="text-lg text-gray-600">
                We believe in making tech education accessible to everyone
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {scholarships.map((scholarship) => (
                <Card key={scholarship.id} className="border-2 border-dashed border-green-200 bg-green-50">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-lg">{scholarship.name.en}</CardTitle>
                    </div>
                    <CardDescription>{scholarship.description.en}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Badge className="bg-green-600 text-white">
                        {scholarship.discountPercentage}% Off Tuition
                      </Badge>
                      <div>
                        <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {scholarship.requirements.slice(0, 2).map((req, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {req}
                            </li>
                          ))}
                          {scholarship.requirements.length > 2 && (
                            <li className="text-xs text-gray-500">
                              +{scholarship.requirements.length - 2} more requirements
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Support Services */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Support</h2>
              <p className="text-lg text-gray-600">
                We're with you every step of your journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportServices.map((service) => (
                <Card key={service.id} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{service.name.en}</h3>
                    <p className="text-sm text-gray-600">{service.description.en}</p>
                    <Badge variant="secondary" className="mt-2">
                      Included
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Onboarding Process */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Journey Starts Here</h2>
              <p className="text-lg text-gray-600">
                Here's what happens after you enroll
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {onboardingSteps.map((step, index) => (
                <Card key={step.step} className="relative">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {step.step}
                      </div>
                      <CardTitle className="text-lg">{step.title.en}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{step.description.en}</p>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <Calendar className="h-3 w-3" />
                      {step.timeline}
                    </div>
                  </CardContent>
                  {index < onboardingSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="h-5 w-5 text-gray-400" />
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Join our next cohort and start building your future in tech
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setShowForm(true)}
                >
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Start Enrollment
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  Schedule Campus Visit
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function EnrollPage() {
  return <EnrollPageContent />
} 