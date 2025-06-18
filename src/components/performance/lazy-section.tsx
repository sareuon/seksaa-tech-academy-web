'use client'

import { useState, useEffect, useRef, ReactNode } from 'react'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export function LazySection({ 
  children, 
  fallback = <div className="min-h-[200px] bg-gray-50 animate-pulse rounded-lg" />,
  rootMargin = '100px',
  threshold = 0.1,
  className = ''
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          // Add a small delay to prevent layout shift
          setTimeout(() => setIsLoaded(true), 100)
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [rootMargin, threshold, isVisible])

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          {children}
        </div>
      ) : (
        fallback
      )}
    </div>
  )
} 