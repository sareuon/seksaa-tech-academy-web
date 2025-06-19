'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { getAllPrograms } from '@/lib/data'
import { getFormspreeEndpoint } from '@/lib/config'
import { Loader2, CheckCircle, AlertCircle, Mail, Gift } from 'lucide-react'

// Newsletter signup validation schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  firstName: z.string().min(2, 'First name must be at least 2 characters').optional(),
  interestedPrograms: z.array(z.string()).optional(),
  marketingConsent: z.boolean().default(true),
  source: z.enum(['website', 'social', 'referral', 'advertisement']).default('website')
})

type NewsletterFormData = z.infer<typeof newsletterSchema>

interface NewsletterSignupProps {
  title?: string
  description?: string
  showProgramInterests?: boolean
  showNameField?: boolean
  variant?: 'default' | 'compact' | 'inline'
  formspreeEndpoint?: string
  className?: string
}

export function NewsletterSignup({
  title = "Stay Updated",
  description = "Get the latest updates on our programs, tech trends, and career opportunities.",
  showProgramInterests = true,
  showNameField = true,
  variant = 'default',
  formspreeEndpoint = getFormspreeEndpoint('newsletter'),
  className = ""
}: NewsletterSignupProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const programs = getAllPrograms()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      interestedPrograms: [],
      marketingConsent: true,
      source: 'website'
    }
  })

  const watchedPrograms = watch('interestedPrograms') || []

  const onSubmit = async (data: NewsletterFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          interestedPrograms: data.interestedPrograms?.join(', ') || 'None specified',
          _subject: `Newsletter Signup: ${data.email}`,
          _replyto: data.email,
          _format: 'plain',
          _template: 'newsletter'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        throw new Error('Failed to subscribe')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to subscribe. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProgramToggle = (programId: string, checked: boolean) => {
    const currentPrograms = watchedPrograms
    if (checked) {
      setValue('interestedPrograms', [...currentPrograms, programId])
    } else {
      setValue('interestedPrograms', currentPrograms.filter(id => id !== programId))
    }
  }

  // Prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-gray-200 rounded"></div>
            <div className="w-20 h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (submitStatus === 'success') {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-700">Successfully Subscribed!</h3>
              <p className="text-gray-600 mt-2">
                Thank you for subscribing to our newsletter. You'll receive updates about our programs and tech industry insights.
              </p>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-blue-700">
                  <Gift className="h-4 w-4" />
                  <span className="text-sm font-medium">Welcome bonus: Free career consultation!</span>
                </div>
              </div>
            </div>
            <Button 
              onClick={() => setSubmitStatus('idle')} 
              variant="outline"
              className="mt-4"
            >
              Subscribe Another Email
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Compact variant for inline use
  if (variant === 'compact') {
    return (
      <div className={`space-y-4 ${className}`}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex gap-2">
            <Input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className={`flex-1 ${errors.email ? 'border-red-500' : ''}`}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-brand-600 hover:bg-brand-700"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Subscribe'
              )}
            </Button>
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}
        </form>
      </div>
    )
  }

  // Inline variant for footer or sidebar
  if (variant === 'inline') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="flex items-center gap-2 text-brand-600 mb-2">
          <Mail className="h-5 w-5" />
          <span className="font-semibold">{title}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Input
              {...register('email')}
              type="email"
              placeholder="your@email.com"
              className={`flex-1 ${errors.email ? 'border-red-500' : ''}`}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              size="sm"
              className="bg-brand-600 hover:bg-brand-700"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Join'
              )}
            </Button>
          </div>
          {errors.email && (
            <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
          )}
        </form>
      </div>
    )
  }

  // Default card variant
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-brand-500" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email and Name */}
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

            {showNameField && (
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  placeholder="Your first name"
                />
              </div>
            )}
          </div>

          {/* Program Interests */}
          {showProgramInterests && (
            <div className="space-y-3">
              <Label>Programs of Interest (Optional)</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {programs.slice(0, 6).map((program) => (
                  <div key={program.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`program-${program.id}`}
                      checked={watchedPrograms.includes(program.id)}
                      onCheckedChange={(checked) => 
                        handleProgramToggle(program.id, checked as boolean)
                      }
                    />
                    <Label 
                      htmlFor={`program-${program.id}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {program.title.en}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Marketing Consent */}
          <div className="flex items-start space-x-2">
            <Checkbox
              id="marketingConsent"
              {...register('marketingConsent')}
              defaultChecked={true}
            />
            <Label htmlFor="marketingConsent" className="text-sm leading-relaxed">
              I agree to receive marketing communications about programs, events, and career opportunities. 
              You can unsubscribe at any time.
            </Label>
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
            className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Subscribe to Newsletter
              </>
            )}
          </Button>

          {/* Benefits */}
          <div className="text-center text-sm text-muted-foreground pt-4 border-t">
            <p className="font-medium mb-2">What you'll get:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
              <span>• Weekly tech insights</span>
              <span>• Program updates</span>
              <span>• Career opportunities</span>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 