'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <div className="relative h-12 w-12">
            <Image
              src="/images/logo.svg"
              alt="Seksaa Tech Academy Logo"
              width={48}
              height={48}
              className="h-12 w-12"
            />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold text-brand-700">Seksaa Tech Academy</h1>
            <p className="text-xs text-muted-foreground">Transform Your Career</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/#programs" className="nav-link text-sm font-medium">
            Programs
          </Link>
          <Link href="/#instructors" className="nav-link text-sm font-medium">
            Instructors
          </Link>
          <Link href="/#success-stories" className="nav-link text-sm font-medium">
            Success Stories
          </Link>
          <Link href="/#schedule" className="nav-link text-sm font-medium">
            Schedule
          </Link>
          <Link href="/#blog" className="nav-link text-sm font-medium">
            Blog
          </Link>
          <Link href="/#contact" className="nav-link text-sm font-medium">
            Contact
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          <Link href="/#contact" className="btn-secondary-enhanced hidden sm:inline-flex">
            Get Info
          </Link>
          <Link href="/#enroll" className="btn-primary-enhanced glow-on-hover">
            Enroll Now
          </Link>
        </div>
      </div>
    </header>
  )
} 