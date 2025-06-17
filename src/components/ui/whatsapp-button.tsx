'use client'

import { Button } from '@/components/ui/button'
import { getWhatsAppUrl } from '@/lib/config'
import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  message?: string
  variant?: 'default' | 'outline' | 'ghost' | 'floating'
  size?: 'sm' | 'default' | 'lg'
  className?: string
  children?: React.ReactNode
}

export function WhatsAppButton({
  message = "Hello! I'm interested in your tech programs.",
  variant = 'default',
  size = 'default',
  className = '',
  children
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const url = getWhatsAppUrl(message)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  if (variant === 'floating') {
    return (
      <button
        onClick={handleWhatsAppClick}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group ${className}`}
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat with us on WhatsApp
        </div>
      </button>
    )
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      variant={variant}
      size={size}
      className={`bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 ${className}`}
    >
      <MessageCircle className="mr-2 h-4 w-4" />
      {children || 'WhatsApp'}
    </Button>
  )
}

// Specialized WhatsApp buttons for different use cases
export function WhatsAppEnrollmentButton({ programTitle }: { programTitle?: string }) {
  const message = programTitle 
    ? `Hi! I'm interested in enrolling in the ${programTitle} program. Can you provide more information?`
    : "Hi! I'm interested in enrolling in one of your tech programs. Can you provide more information?"

  return (
    <WhatsAppButton message={message} className="w-full">
      Enroll via WhatsApp
    </WhatsAppButton>
  )
}

export function WhatsAppConsultationButton() {
  const message = "Hi! I'd like to schedule a free career consultation to discuss which tech program would be best for me."

  return (
    <WhatsAppButton message={message} variant="outline">
      Free Consultation
    </WhatsAppButton>
  )
}

export function WhatsAppTrialClassButton({ programTitle }: { programTitle?: string }) {
  const message = programTitle
    ? `Hi! I'd like to book a free trial class for the ${programTitle} program.`
    : "Hi! I'd like to book a free trial class. Can you help me choose the right program?"

  return (
    <WhatsAppButton message={message} className="w-full">
      Book Trial Class
    </WhatsAppButton>
  )
} 