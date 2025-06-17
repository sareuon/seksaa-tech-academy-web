'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  Star, 
  CreditCard, 
  Calendar,
  User,
  GraduationCap,
  DollarSign,
  Shield,
  Clock,
  Award
} from 'lucide-react'
import { 
  getEnrollmentSteps, 
  getPaymentPlans, 
  getScholarships, 
  getAllPrograms,
  getProgramById,
  calculateProgramPrice,
  calculateScholarshipPrice,
  getEnrollmentRequirementsForProgram
} from '@/lib/data'
import type { EnrollmentFormData, Program } from '@/types'

interface EnrollmentFormProps {
  programId?: string
  onSubmit?: (data: EnrollmentFormData) => void
  onCancel?: () => void
}

export default function EnrollmentForm({ programId, onSubmit, onCancel }: EnrollmentFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Partial<EnrollmentFormData>>({
    programId: programId || '',
    learningFormat: 'hybrid',
    paymentPlan: 'full-payment'
  })
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [priceCalculation, setPriceCalculation] = useState({
    originalPrice: 0,
    discountedPrice: 0,
    discount: 0,
    installmentAmount: 0
  })

  const enrollmentSteps = getEnrollmentSteps()
  const paymentPlans = getPaymentPlans()
  const scholarships = getScholarships()
  const programs = getAllPrograms()

  useEffect(() => {
    if (formData.programId) {
      const program = getProgramById(formData.programId)
      setSelectedProgram(program || null)
    }
  }, [formData.programId])

  useEffect(() => {
    if (formData.programId && formData.paymentPlan) {
      const calculation = calculateProgramPrice(formData.programId, formData.paymentPlan)
      let finalCalculation = calculation

      if (formData.scholarshipId) {
        const scholarshipCalc = calculateScholarshipPrice(calculation.discountedPrice, formData.scholarshipId)
        finalCalculation = {
          ...calculation,
          discountedPrice: scholarshipCalc.finalPrice,
          discount: calculation.discount + scholarshipCalc.scholarshipDiscount
        }
      }

      setPriceCalculation({
        ...finalCalculation,
        installmentAmount: finalCalculation.installmentAmount || 0
      })
    }
  }, [formData.programId, formData.paymentPlan, formData.scholarshipId])

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < enrollmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData as EnrollmentFormData)
    }
  }

  const isStepValid = (stepIndex: number): boolean => {
    const step = enrollmentSteps[stepIndex]
    if (!step) return false

    return step.fields.every(field => {
      const value = formData[field as keyof EnrollmentFormData]
      return value !== undefined && value !== ''
    })
  }

  const getStepIcon = (stepIndex: number) => {
    const icons = [User, GraduationCap, Award, CreditCard]
    const Icon = icons[stepIndex] || User
    return <Icon className="h-5 w-5" />
  }

  const renderPersonalInfoStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName || ''}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName || ''}
            onChange={(e) => updateFormData('lastName', e.target.value)}
            placeholder="Enter your last name"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email || ''}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={formData.phone || ''}
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="+855 12 345 678"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="city">City *</Label>
          <Select value={formData.city || ''} onValueChange={(value) => updateFormData('city', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="phnom-penh">Phnom Penh</SelectItem>
              <SelectItem value="siem-reap">Siem Reap</SelectItem>
              <SelectItem value="battambang">Battambang</SelectItem>
              <SelectItem value="kampong-cham">Kampong Cham</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="address">Address *</Label>
        <Textarea
          id="address"
          value={formData.address || ''}
          onChange={(e) => updateFormData('address', e.target.value)}
          placeholder="Enter your full address"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="emergencyContact">Emergency Contact *</Label>
        <Input
          id="emergencyContact"
          value={formData.emergencyContact || ''}
          onChange={(e) => updateFormData('emergencyContact', e.target.value)}
          placeholder="Name and phone number of emergency contact"
        />
      </div>
    </div>
  )

  const renderProgramSelectionStep = () => (
    <div className="space-y-6">
      <div>
        <Label>Select Program *</Label>
        <RadioGroup 
          value={formData.programId || ''} 
          onValueChange={(value) => updateFormData('programId', value)}
          className="mt-2"
        >
          {programs.map((program) => (
            <div key={program.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50">
              <RadioGroupItem value={program.id} id={program.id} className="mt-1" />
              <div className="flex-1">
                <Label htmlFor={program.id} className="font-medium cursor-pointer">
                  {program.title.en}
                </Label>
                <p className="text-sm text-gray-600 mt-1">{program.shortDescription.en}</p>
                <div className="flex items-center gap-4 mt-2">
                  <Badge variant="secondary">{program.duration.totalHours}h</Badge>
                  <Badge variant="outline">{program.level}</Badge>
                  <span className="text-lg font-bold text-blue-600">
                    ${program.pricing.fullPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {selectedProgram && (
        <>
          <Separator />
          <div>
            <Label>Learning Format *</Label>
            <RadioGroup 
              value={formData.learningFormat || 'hybrid'} 
              onValueChange={(value) => updateFormData('learningFormat', value)}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online">Online Classes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person">In-Person Classes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hybrid" id="hybrid" />
                <Label htmlFor="hybrid">Hybrid (Online + In-Person)</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="schedulePreference">Schedule Preference *</Label>
              <Select 
                value={formData.schedulePreference || ''} 
                onValueChange={(value) => updateFormData('schedulePreference', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select preferred schedule" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekday-morning">Weekday Morning (9AM-12PM)</SelectItem>
                  <SelectItem value="weekday-afternoon">Weekday Afternoon (2PM-5PM)</SelectItem>
                  <SelectItem value="weekday-evening">Weekday Evening (6PM-9PM)</SelectItem>
                  <SelectItem value="weekend-morning">Weekend Morning (9AM-12PM)</SelectItem>
                  <SelectItem value="weekend-afternoon">Weekend Afternoon (2PM-5PM)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">Preferred Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate || ''}
                onChange={(e) => updateFormData('startDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Program Requirements */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Program Requirements</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              {getEnrollmentRequirementsForProgram(selectedProgram.id).map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="h-4 w-4 mt-0.5 text-blue-600" />
                  {req.en}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )

  const renderBackgroundInfoStep = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="education">Educational Background *</Label>
        <Select 
          value={formData.education || ''} 
          onValueChange={(value) => updateFormData('education', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your highest education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high-school">High School</SelectItem>
            <SelectItem value="associate">Associate Degree</SelectItem>
            <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
            <SelectItem value="master">Master's Degree</SelectItem>
            <SelectItem value="phd">PhD</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="workExperience">Work Experience *</Label>
        <Select 
          value={formData.workExperience || ''} 
          onValueChange={(value) => updateFormData('workExperience', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your work experience level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="no-experience">No Work Experience</SelectItem>
            <SelectItem value="0-2-years">0-2 Years</SelectItem>
            <SelectItem value="3-5-years">3-5 Years</SelectItem>
            <SelectItem value="6-10-years">6-10 Years</SelectItem>
            <SelectItem value="10-plus-years">10+ Years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="programmingExperience">Programming Experience *</Label>
        <Select 
          value={formData.programmingExperience || ''} 
          onValueChange={(value) => updateFormData('programmingExperience', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your programming experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Programming Experience</SelectItem>
            <SelectItem value="beginner">Beginner (Some tutorials/courses)</SelectItem>
            <SelectItem value="intermediate">Intermediate (Built some projects)</SelectItem>
            <SelectItem value="advanced">Advanced (Professional experience)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="goals">Career Goals *</Label>
        <Textarea
          id="goals"
          value={formData.goals || ''}
          onChange={(e) => updateFormData('goals', e.target.value)}
          placeholder="Describe your career goals and what you hope to achieve with this program"
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="motivation">Motivation *</Label>
        <Textarea
          id="motivation"
          value={formData.motivation || ''}
          onChange={(e) => updateFormData('motivation', e.target.value)}
          placeholder="What motivates you to pursue this program? Why now?"
          rows={3}
        />
      </div>
    </div>
  )

  const renderPaymentInfoStep = () => (
    <div className="space-y-6">
      {/* Payment Plans */}
      <div>
        <Label className="text-lg font-medium">Payment Plan *</Label>
        <RadioGroup 
          value={formData.paymentPlan || 'full-payment'} 
          onValueChange={(value) => updateFormData('paymentPlan', value)}
          className="mt-4"
        >
          {paymentPlans.map((plan) => (
            <div key={plan.id} className={`relative p-4 border rounded-lg hover:bg-gray-50 ${plan.featured ? 'border-blue-500 bg-blue-50' : ''}`}>
              {plan.featured && (
                <Badge className="absolute -top-2 left-4 bg-blue-600">
                  <Star className="h-3 w-3 mr-1" />
                  Recommended
                </Badge>
              )}
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={plan.id} className="font-medium cursor-pointer">
                    {plan.name.en}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{plan.description.en}</p>
                  {plan.discountPercentage > 0 && (
                    <Badge variant="secondary" className="mt-2">
                      {plan.discountPercentage}% Discount
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Scholarships */}
      <div>
        <Label className="text-lg font-medium">Scholarship (Optional)</Label>
        <p className="text-sm text-gray-600 mb-4">Apply for a scholarship to reduce your program cost</p>
        <RadioGroup 
          value={formData.scholarshipId || 'none'} 
          onValueChange={(value) => updateFormData('scholarshipId', value === 'none' ? undefined : value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="no-scholarship" />
            <Label htmlFor="no-scholarship">No Scholarship</Label>
          </div>
          {scholarships.map((scholarship) => (
            <div key={scholarship.id} className="p-4 border rounded-lg">
              <div className="flex items-start space-x-3">
                <RadioGroupItem value={scholarship.id} id={scholarship.id} className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor={scholarship.id} className="font-medium cursor-pointer">
                    {scholarship.name.en}
                  </Label>
                  <p className="text-sm text-gray-600 mt-1">{scholarship.description.en}</p>
                  <Badge variant="outline" className="mt-2">
                    {scholarship.discountPercentage}% Off
                  </Badge>
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 font-medium">Requirements:</p>
                    <ul className="text-xs text-gray-500 mt-1 space-y-1">
                      {scholarship.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-blue-500">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Price Summary */}
      {selectedProgram && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Price Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Program Price:</span>
              <span className="font-medium">${selectedProgram.pricing.fullPrice.toLocaleString()}</span>
            </div>
            {priceCalculation.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Total Discount:</span>
                <span className="font-medium">-${priceCalculation.discount.toLocaleString()}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Final Price:</span>
              <span className="text-blue-600">${priceCalculation.discountedPrice.toLocaleString()}</span>
            </div>
            {priceCalculation.installmentAmount && priceCalculation.installmentAmount > 0 && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>Per Installment:</span>
                <span>${priceCalculation.installmentAmount.toLocaleString()}</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div>
        <Label htmlFor="billingAddress">Billing Address *</Label>
        <Textarea
          id="billingAddress"
          value={formData.billingAddress || ''}
          onChange={(e) => updateFormData('billingAddress', e.target.value)}
          placeholder="Enter your billing address"
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="paymentMethod">Payment Method *</Label>
        <Select 
          value={formData.paymentMethod || ''} 
          onValueChange={(value) => updateFormData('paymentMethod', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="credit-card">Credit Card</SelectItem>
            <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="aba-pay">ABA Pay</SelectItem>
            <SelectItem value="wing">Wing</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )

  const currentStepData = enrollmentSteps[currentStep]
  const progress = ((currentStep + 1) / enrollmentSteps.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Program Enrollment</CardTitle>
              <CardDescription>
                Complete your enrollment in {enrollmentSteps.length} easy steps
              </CardDescription>
            </div>
            {onCancel && (
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Step {currentStep + 1} of {enrollmentSteps.length}</span>
              <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="flex items-center justify-between mt-4">
            {enrollmentSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  index < currentStep 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : index === currentStep 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : 'bg-gray-100 border-gray-300 text-gray-500'
                }`}>
                  {index < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    getStepIcon(index)
                  )}
                </div>
                {index < enrollmentSteps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{currentStepData.title.en}</h3>
            <p className="text-gray-600">{currentStepData.description.en}</p>
          </div>

          {/* Step Content */}
          {currentStep === 0 && renderPersonalInfoStep()}
          {currentStep === 1 && renderProgramSelectionStep()}
          {currentStep === 2 && renderBackgroundInfoStep()}
          {currentStep === 3 && renderPaymentInfoStep()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            {currentStep === enrollmentSteps.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Shield className="h-4 w-4" />
                Complete Enrollment
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 