'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { NewsletterSignup } from '@/components/forms/newsletter-signup'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Youtube,
  ExternalLink,
  GraduationCap,
  Users,
  Award,
  Clock
} from 'lucide-react'
import { SITE_CONFIG } from '@/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()
  const locale = useLocale()
  const t = useTranslations()
  
  const localizedPath = (path: string) => `/${locale}${path}` as any

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-navy-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info & Newsletter */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">ST</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Seksaa Tech</h3>
                <p className="text-sm text-orange-400">Academy</p>
              </div>
            </div>
            
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t('footer.about')}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-navy-800 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">500+</div>
                <div className="text-xs text-gray-300">Graduates</div>
              </div>
              <div className="bg-navy-800 p-3 rounded-lg">
                <div className="text-2xl font-bold text-orange-400">95%</div>
                <div className="text-xs text-gray-300">Job Placement</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.quick_links')}</h4>
            <ul className="space-y-3">
              <li>
                <Link href={localizedPath('/programs')} className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <GraduationCap className="h-4 w-4" />
                  {t('nav.programs')}
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/instructors')} className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {t('nav.instructors')}
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/success-stories')} className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  {t('nav.success_stories')}
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/schedule')} className="text-gray-300 hover:text-orange-400 transition-colors flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {t('nav.schedule')}
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/gallery')} className="text-gray-300 hover:text-orange-400 transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link href={localizedPath('/blog')} className="text-gray-300 hover:text-orange-400 transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.contact_info')}</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Phnom Penh, Cambodia</p>
                  <p className="text-sm text-gray-400">Modern Tech Campus</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <a href="tel:+85512345678" className="text-gray-300 hover:text-orange-400 transition-colors">
                  +855 12 345 678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-orange-400 flex-shrink-0" />
                <a href="mailto:info@seksaatech.com" className="text-gray-300 hover:text-orange-400 transition-colors">
                  info@seksaatech.com
                </a>
              </li>
            </ul>

            {/* Office Hours */}
            <div className="mt-6 p-4 bg-navy-800 rounded-lg">
              <h5 className="font-semibold text-white mb-2">{t('contact.office_hours')}</h5>
              <div className="text-sm text-gray-300 space-y-1">
                <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                <p>Sat: 9:00 AM - 4:00 PM</p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t('footer.follow_us')}</h4>
            
            {/* Newsletter Signup */}
            <div className="mb-6">
              <NewsletterSignup 
                variant="inline"
                title={t('footer.newsletter')}
                description={t('footer.newsletter_text')}
                showProgramInterests={false}
                showNameField={false}
                className="text-white"
              />
            </div>

            {/* Social Media Links */}
            <div>
              <h5 className="font-semibold text-white mb-3">{t('footer.follow_us')}</h5>
              <div className="flex gap-3">
                <a 
                  href="https://facebook.com/seksaatech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-navy-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://instagram.com/seksaatech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-navy-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://linkedin.com/company/seksaatech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-navy-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="https://youtube.com/@seksaatech" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-navy-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
                  aria-label="Subscribe to our YouTube channel"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-6">
              <Link href={localizedPath('/contact')}>
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold">
                  {t('common.get_started')}
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-navy-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-300 text-sm">
                {t('footer.copyright')}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Empowering Cambodia's tech future since 2019
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href={localizedPath('/privacy')} className="text-gray-300 hover:text-orange-400 transition-colors">
                {t('footer.privacy_policy')}
              </Link>
              <Link href={localizedPath('/terms')} className="text-gray-300 hover:text-orange-400 transition-colors">
                {t('footer.terms_of_service')}
              </Link>
              <Link href={localizedPath('/cookies')} className="text-gray-300 hover:text-orange-400 transition-colors">
                {t('footer.cookies_policy')}
              </Link>
              <Link href={localizedPath('/code-of-conduct')} className="text-gray-300 hover:text-orange-400 transition-colors">
                Code of Conduct
              </Link>
              <Link href={localizedPath('/security')} className="text-gray-300 hover:text-orange-400 transition-colors">
                Security
              </Link>
            </div>

            {/* Certifications/Badges */}
            <div className="flex items-center gap-3">
              <div className="text-center">
                <div className="text-xs text-gray-400">Accredited by</div>
                <div className="text-sm font-semibold text-orange-400">Ministry of Education</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 