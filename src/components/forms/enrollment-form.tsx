'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { getAllPrograms } from '@/lib/data'
import { getFormspreeEndpoint } from '@/lib/config'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

// Enrollment form validation schema
const enrollmentFormSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  programId: z.string().min(1, 'Please select a program'),
  startDate: z.string().min(1, 'Please select a start date'),
  paymentPlan: z.enum(['full', 'installment']),
  motivation: z.string().min(20, 'Please tell us more about your motivation (minimum 20 characters)'),
  experience: z.string().optional(),
  goals: z.string().min(10, 'Please describe your goals (minimum 10 characters)')
})

type EnrollmentFormData = z.infer<typeof enrollmentFormSchema>

interface EnrollmentFormProps {
  programId?: string
  formspreeEndpoint?: string
  className?: string
}

export function EnrollmentForm({
  programId,
  formspreeEndpoint = getFormspreeEndpoint('enrollment'),
  className = ""
}: EnrollmentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const programs = getAllPrograms()
  const selectedProgram = programs.find(p => p.id === programId)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<EnrollmentFormData>({
    resolver: zodResolver(enrollmentFormSchema),
    defaultValues: {
      programId: programId || '',
      paymentPlan: 'full'
    }
  })

  const onSubmit = async (data: EnrollmentFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const selectedProgramData = programs.find(p => p.id === data.programId)
      
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          programTitle: selectedProgramData?.title.en || 'Unknown Program',
          _subject: `New Enrollment Application: ${data.firstName} ${data.lastName}`,
          _replyto: data.email,
          _format: 'plain'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        throw new Error('Failed to submit enrollment')
      }
    } catch (error) {
      console.error('Enrollment submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to submit enrollment. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold text-green-700">Enrollment Submitted Successfully!</h3>
              <p className="text-gray-600 mt-2">
                Thank you for your enrollment application. Our admissions team will review your application and contact you within 2 business days.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                You will receive a confirmation email shortly with next steps.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          {selectedProgram ? `Enroll in ${selectedProgram.title.en}` : 'Program Enrollment'}
        </CardTitle>
        <CardDescription className="text-gray-600">
          Complete this form to apply for admission to our program. All fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  placeholder="Enter your first name"
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  placeholder="Enter your last name"
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  {...register('phone')}
                  placeholder="+855 12 345 678"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Program Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Program Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="programId">Select Program *</Label>
                <Select
                  onValueChange={(value: string) => setValue('programId', value)}
                  defaultValue={programId}
                >
                  <SelectTrigger className={errors.programId ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Choose a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((program) => (
                      <SelectItem key={program.id} value={program.id}>
                        {program.title.en} - {program.duration.weeks} weeks
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.programId && (
                  <p className="text-sm text-red-600">{errors.programId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="startDate">Preferred Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  {...register('startDate')}
                  className={errors.startDate ? 'border-red-500' : ''}
                />
                {errors.startDate && (
                  <p className="text-sm text-red-600">{errors.startDate.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentPlan">Payment Plan *</Label>
              <Select
                onValueChange={(value: string) => setValue('paymentPlan', value as 'full' | 'installment')}
                defaultValue="full"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Payment (5% discount)</SelectItem>
                  <SelectItem value="installment">Monthly Installments</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Background Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Background & Goals</h3>
            
            <div className="space-y-2">
              <Label htmlFor="motivation">Why do you want to join this program? *</Label>
              <Textarea
                id="motivation"
                {...register('motivation')}
                placeholder="Tell us about your motivation and what you hope to achieve..."
                rows={4}
                className={errors.motivation ? 'border-red-500' : ''}
              />
              {errors.motivation && (
                <p className="text-sm text-red-600">{errors.motivation.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Previous Experience (Optional)</Label>
              <Textarea
                id="experience"
                {...register('experience')}
                placeholder="Describe any relevant work experience, education, or projects..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="goals">Career Goals *</Label>
              <Textarea
                id="goals"
                {...register('goals')}
                placeholder="What are your career goals after completing this program?"
                rows={3}
                className={errors.goals ? 'border-red-500' : ''}
              />
              {errors.goals && (
                <p className="text-sm text-red-600">{errors.goals.message}</p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {submitStatus === 'error' && (
            <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Application...
              </>
            ) : (
              'Submit Enrollment Application'
            )}
          </Button>

          {/* Disclaimer */}
          <div className="text-xs text-gray-500 text-center pt-4 border-t">
            <p>
              By submitting this form, you agree to our terms and conditions. 
              Your information will be kept confidential and used only for enrollment purposes.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 