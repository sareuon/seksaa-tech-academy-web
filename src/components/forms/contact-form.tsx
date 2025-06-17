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
import { getFormspreeEndpoint, getContactEmail } from '@/lib/config'
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react'

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  interestedProgram: z.string().optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'whatsapp']).default('email'),
  source: z.enum(['website', 'social', 'referral', 'advertisement']).default('website')
})

type ContactFormData = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  title?: string
  description?: string
  showProgramSelection?: boolean
  defaultProgram?: string
  formspreeEndpoint?: string
  className?: string
}

export function ContactForm({
  title = "Get in Touch",
  description = "Have questions about our programs? We'd love to hear from you!",
  showProgramSelection = true,
  defaultProgram,
  formspreeEndpoint = getFormspreeEndpoint('contact'),
  className = ""
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const programs = getAllPrograms()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      interestedProgram: defaultProgram || 'none',
      preferredContactMethod: 'email',
      source: 'website'
    }
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Submit to Formspree
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          _subject: `New Contact Form Submission: ${data.subject}`,
          _replyto: data.email,
          _format: 'plain'
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        throw new Error('Failed to submit form')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      setErrorMessage('Failed to send message. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitStatus === 'success') {
    return (
      <Card className={className}>
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
            <div>
              <h3 className="text-lg font-semibold text-green-700">Message Sent Successfully!</h3>
              <p className="text-gray-600 mt-2">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
            </div>
            <Button 
              onClick={() => setSubmitStatus('idle')} 
              variant="outline"
              className="mt-4"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Enter your full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

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
          </div>

          {/* Phone and Contact Method Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+855 12 345 678"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                             <Select
                 onValueChange={(value: string) => setValue('preferredContactMethod', value as 'email' | 'phone' | 'whatsapp')}
                 defaultValue="email"
               >
                <SelectTrigger>
                  <SelectValue placeholder="Select contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Program Selection */}
          {showProgramSelection && (
            <div className="space-y-2">
              <Label htmlFor="interestedProgram">Interested Program</Label>
                             <Select
                 onValueChange={(value: string) => setValue('interestedProgram', value)}
                 defaultValue={defaultProgram || 'none'}
               >
                <SelectTrigger>
                  <SelectValue placeholder="Select a program (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No specific program</SelectItem>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id}>
                      {program.title.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">Subject *</Label>
            <Input
              id="subject"
              {...register('subject')}
              placeholder="What would you like to discuss?"
              className={errors.subject ? 'border-red-500' : ''}
            />
            {errors.subject && (
              <p className="text-sm text-red-600">{errors.subject.message}</p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              {...register('message')}
              placeholder="Tell us more about your inquiry..."
              rows={5}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && (
              <p className="text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          {/* How did you hear about us */}
          <div className="space-y-2">
            <Label htmlFor="source">How did you hear about us?</Label>
                         <Select
               onValueChange={(value: string) => setValue('source', value as 'website' | 'social' | 'referral' | 'advertisement')}
               defaultValue="website"
             >
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="social">Social Media</SelectItem>
                <SelectItem value="referral">Friend/Colleague Referral</SelectItem>
                <SelectItem value="advertisement">Advertisement</SelectItem>
              </SelectContent>
            </Select>
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
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              'Send Message'
            )}
          </Button>

          {/* Contact Info */}
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>Or contact us directly:</p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href={`mailto:${getContactEmail('general')}`} className="hover:text-blue-600">
                {getContactEmail('general')}
              </a>
              <span>•</span>
              <a href="tel:+85512345678" className="hover:text-blue-600">
                +855 12 345 678
              </a>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 