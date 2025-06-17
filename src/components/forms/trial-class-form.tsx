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
import { Loader2, CheckCircle, AlertCircle, Calendar, Clock, Users } from 'lucide-react'

// Trial class form validation schema
const trialClassSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(8, 'Please enter a valid phone number'),
  programId: z.string().min(1, 'Please select a program'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  preferredTime: z.string().min(1, 'Please select a preferred time'),
  experience: z.enum(['beginner', 'some', 'intermediate', 'advanced']),
  goals: z.string().min(10, 'Please describe your goals (minimum 10 characters)'),
  questions: z.string().optional(),
  source: z.enum(['website', 'social', 'referral', 'advertisement']).default('website')
})

type TrialClassFormData = z.infer<typeof trialClassSchema>

interface TrialClassFormProps {
  programId?: string
  formspreeEndpoint?: string
  className?: string
}

export function TrialClassForm({
  programId,
  formspreeEndpoint = getFormspreeEndpoint('trialClass'),
  className = ""
}: TrialClassFormProps) {
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
  } = useForm<TrialClassFormData>({
    resolver: zodResolver(trialClassSchema),
    defaultValues: {
      programId: programId || '',
      experience: 'beginner',
      source: 'website'
    }
  })

  const onSubmit = async (data: TrialClassFormData) => {
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
          _subject: `Trial Class Booking: ${data.firstName} ${data.lastName} - ${selectedProgramData?.title.en}`,
          _replyto: data.email,
          _format: 'plain',
          _template: 'trial-class'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        throw new Error('Failed to book trial class')
      }
    } catch (error) {
      console.error('Trial class booking error:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to book trial class. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-green-700">Trial Class Booked Successfully!</h3>
              <p className="text-gray-600 mt-2">
                Thank you for booking a trial class with us. Our team will contact you within 24 hours to confirm your session details.
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
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-500" />
          {selectedProgram ? `Book Trial Class - ${selectedProgram.title.en}` : 'Book Your Free Trial Class'}
        </CardTitle>
        <CardDescription>
          Experience our teaching style and get a taste of what you'll learn. No commitment required!
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

          {/* Class Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Class Preferences</h3>
            
            <div className="space-y-2">
              <Label htmlFor="programId">Program *</Label>
              <Select
                onValueChange={(value: string) => setValue('programId', value)}
                defaultValue={programId}
              >
                <SelectTrigger className={errors.programId ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select a program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.title.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.programId && (
                <p className="text-sm text-red-600">{errors.programId.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredDate">Preferred Date *</Label>
                <Input
                  id="preferredDate"
                  type="date"
                  {...register('preferredDate')}
                  min={new Date().toISOString().split('T')[0]}
                  className={errors.preferredDate ? 'border-red-500' : ''}
                />
                {errors.preferredDate && (
                  <p className="text-sm text-red-600">{errors.preferredDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="preferredTime">Preferred Time *</Label>
                <Select
                  onValueChange={(value: string) => setValue('preferredTime', value)}
                >
                  <SelectTrigger className={errors.preferredTime ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (1:00 PM - 5:00 PM)</SelectItem>
                    <SelectItem value="evening">Evening (6:00 PM - 9:00 PM)</SelectItem>
                    <SelectItem value="weekend">Weekend (Saturday/Sunday)</SelectItem>
                  </SelectContent>
                </Select>
                {errors.preferredTime && (
                  <p className="text-sm text-red-600">{errors.preferredTime.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Goals */}
          <div className="space-y-2">
            <Label htmlFor="goals">What do you hope to achieve? *</Label>
            <Textarea
              id="goals"
              {...register('goals')}
              placeholder="Tell us about your career goals and what you want to learn..."
              rows={3}
              className={errors.goals ? 'border-red-500' : ''}
            />
            {errors.goals && (
              <p className="text-sm text-red-600">{errors.goals.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Booking Trial Class...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Book Free Trial Class
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 