import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigation } from '@/components/layout/navigation'

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => 'en',
}))

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href, ...props }: any) => {
    return <a href={href} {...props}>{children}</a>
  }
})

// Mock LanguageSwitcher component
jest.mock('@/components/layout/language-switcher', () => ({
  LanguageSwitcher: () => <div data-testid="language-switcher">Language Switcher</div>
}))

describe('Navigation Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders logo and brand name', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Seksaa Tech')).toBeInTheDocument()
    expect(screen.getByText('ST')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByText('home')).toBeInTheDocument()
    expect(screen.getByText('programs')).toBeInTheDocument()
    expect(screen.getByText('schedule')).toBeInTheDocument()
    expect(screen.getByText('instructors')).toBeInTheDocument()
    expect(screen.getByText('success_stories')).toBeInTheDocument()
    expect(screen.getByText('blog')).toBeInTheDocument()
    expect(screen.getByText('faq')).toBeInTheDocument()
    expect(screen.getByText('contact')).toBeInTheDocument()
  })

  it('renders enroll button', () => {
    render(<Navigation />)
    
    expect(screen.getByText('enroll')).toBeInTheDocument()
  })

  it('renders language switcher', () => {
    render(<Navigation />)
    
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
  })

  it('shows mobile menu button on mobile', () => {
    render(<Navigation />)
    
    const mobileMenuButton = screen.getByRole('button')
    expect(mobileMenuButton).toBeInTheDocument()
  })

  it('toggles mobile menu when button is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation />)
    
    const mobileMenuButton = screen.getByRole('button')
    
    // Initially mobile menu should not be visible
    expect(screen.queryByText('home')).toBeInTheDocument() // Desktop nav
    
    // Click to open mobile menu
    await user.click(mobileMenuButton)
    
    // Mobile menu should now be visible with duplicate nav items
    const homeLinks = screen.getAllByText('home')
    expect(homeLinks.length).toBeGreaterThan(1) // Desktop + Mobile
  })

  it('shows programs dropdown on hover', async () => {
    const user = userEvent.setup()
    render(<Navigation />)
    
    const programsLink = screen.getByText('programs')
    
    // Hover over programs link
    await user.hover(programsLink)
    
    // Should show dropdown with program links
    expect(screen.getByText('🤖 AI & Machine Learning')).toBeInTheDocument()
    expect(screen.getByText('📊 Data Engineering')).toBeInTheDocument()
    expect(screen.getByText('💻 Web Development')).toBeInTheDocument()
  })

  it('has correct href attributes for navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByRole('link', { name: /seksaa tech/i })).toHaveAttribute('href', '/en/')
    expect(screen.getByRole('link', { name: 'home' })).toHaveAttribute('href', '/en/')
    expect(screen.getByRole('link', { name: 'contact' })).toHaveAttribute('href', '/en/contact')
    expect(screen.getByRole('link', { name: 'faq' })).toHaveAttribute('href', '/en/faq')
  })

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup()
    render(<Navigation />)
    
    const mobileMenuButton = screen.getByRole('button')
    
    // Open mobile menu
    await user.click(mobileMenuButton)
    
    // Click on a mobile navigation link
    const mobileHomeLinks = screen.getAllByText('home')
    const mobileHomeLink = mobileHomeLinks[mobileHomeLinks.length - 1] // Get the mobile version
    await user.click(mobileHomeLink)
    
    // Mobile menu should close (this would be tested by checking if the mobile menu is no longer visible)
    // In a real implementation, you'd check the component state or CSS classes
  })

  it('renders with correct CSS classes for styling', () => {
    render(<Navigation />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('bg-white/95')
    expect(nav).toHaveClass('backdrop-blur-sm')
    expect(nav).toHaveClass('border-b')
    expect(nav).toHaveClass('border-gray-200')
    expect(nav).toHaveClass('sticky')
    expect(nav).toHaveClass('top-0')
    expect(nav).toHaveClass('z-50')
  })

  it('shows correct program links in dropdown', () => {
    render(<Navigation />)
    
    const programDropdownLinks = [
      { text: '🤖 AI & Machine Learning', href: '/en/programs/ai-machine-learning' },
      { text: '📊 Data Engineering', href: '/en/programs/data-engineering' },
      { text: '💻 Web Development', href: '/en/programs/web-development' },
    ]
    
    programDropdownLinks.forEach(({ text, href }) => {
      const link = screen.getByText(text)
      expect(link.closest('a')).toHaveAttribute('href', href)
    })
  })
}) 