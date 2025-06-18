'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const locale = useLocale()
  const t = useTranslations('nav')
  
  const localizedPath = (path: string) => `/${locale}${path}` as any

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href={localizedPath('/')} className="flex items-center space-x-3">
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
          <Link href={localizedPath('/programs')} className="nav-link text-sm font-medium">
            {t('programs')}
          </Link>
          <Link href={localizedPath('/instructors')} className="nav-link text-sm font-medium">
            {t('instructors')}
          </Link>
          <Link href={localizedPath('/success-stories')} className="nav-link text-sm font-medium">
            {t('success_stories')}
          </Link>
          <Link href={localizedPath('/schedule')} className="nav-link text-sm font-medium">
            {t('schedule')}
          </Link>
          <Link href={localizedPath('/blog')} className="nav-link text-sm font-medium">
            {t('blog')}
          </Link>
          <Link href={localizedPath('/contact')} className="nav-link text-sm font-medium">
            {t('contact')}
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-3">
          <Link href={localizedPath('/contact')} className="btn-secondary-enhanced hidden sm:inline-flex">
            Get Info
          </Link>
          <Link href={localizedPath('/enroll')} className="btn-primary-enhanced glow-on-hover">
            {t('enroll')}
          </Link>
        </div>
      </div>
    </header>
  )
} 