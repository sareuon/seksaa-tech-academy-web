'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronDown } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-brand-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">ST</span>
            </div>
            <span className="font-bold text-xl text-gray-900">Seksaa Tech</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-brand-600 transition-colors">
              Home
            </Link>
            
            {/* Programs Dropdown */}
            <div className="relative group">
              <button 
                className="flex items-center gap-1 text-gray-700 hover:text-brand-600 transition-colors"
                onMouseEnter={() => setProgramsOpen(true)}
                onMouseLeave={() => setProgramsOpen(false)}
              >
                Programs
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {programsOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  onMouseEnter={() => setProgramsOpen(true)}
                  onMouseLeave={() => setProgramsOpen(false)}
                >
                  <Link href="/programs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-brand-600">
                    All Programs
                  </Link>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link href="/programs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-brand-600">
                    🤖 AI & Machine Learning
                  </Link>
                  <Link href="/programs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-brand-600">
                    📊 Data Engineering
                  </Link>
                  <Link href="/programs" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-brand-600">
                    💻 Web Development
                  </Link>
                </div>
              )}
            </div>

            <Link href="/schedule" className="text-gray-700 hover:text-brand-600 transition-colors">
              Schedule
            </Link>
            
            <Link href="/instructors" className="text-gray-700 hover:text-brand-600 transition-colors">
              Instructors
            </Link>
            
            <Link href="/success-stories" className="text-gray-700 hover:text-brand-600 transition-colors">
              Success Stories
            </Link>
            
            <Link href="/blog" className="text-gray-700 hover:text-brand-600 transition-colors">
              Blog
            </Link>
            
            <Link href="/contact" className="text-gray-700 hover:text-brand-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/enroll">
              <Button className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white">
                Enroll Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-brand-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              <div className="space-y-2">
                <Link 
                  href="/programs" 
                  className="text-gray-700 hover:text-brand-600 transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Programs
                </Link>
                <div className="pl-4 space-y-2">
                  <Link 
                    href="/programs" 
                    className="block text-gray-600 hover:text-brand-600 transition-colors text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    🤖 AI & Machine Learning
                  </Link>
                  <Link 
                    href="/programs" 
                    className="block text-gray-600 hover:text-brand-600 transition-colors text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    📊 Data Engineering
                  </Link>
                  <Link 
                    href="/programs" 
                    className="block text-gray-600 hover:text-brand-600 transition-colors text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    💻 Web Development
                  </Link>
                </div>
              </div>
              
              <Link 
                href="/schedule" 
                className="text-gray-700 hover:text-brand-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Schedule
              </Link>
              
              <Link 
                href="/instructors" 
                className="text-gray-700 hover:text-brand-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Instructors
              </Link>
              
              <Link 
                href="/success-stories" 
                className="text-gray-700 hover:text-brand-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Success Stories
              </Link>
              
              <Link 
                href="/blog" 
                className="text-gray-700 hover:text-brand-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-brand-600 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                <Link href="/enroll" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white">
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 