import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en')
  })

  test('should load homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/Seksaa Tech Academy/)
    await expect(page.locator('h1')).toContainText('Seksaa Tech Academy')
  })

  test('should display main navigation', async ({ page }) => {
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
    
    // Check for main navigation links
    await expect(page.locator('a[href="/en/"]')).toContainText('Home')
    await expect(page.locator('a[href="/en/programs"]')).toContainText('Programs')
    await expect(page.locator('a[href="/en/contact"]')).toContainText('Contact')
    await expect(page.locator('a[href="/en/faq"]')).toContainText('FAQ')
  })

  test('should display hero section', async ({ page }) => {
    const heroSection = page.locator('section').first()
    await expect(heroSection).toBeVisible()
    
    // Check for hero content
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=Start Your Tech Journey')).toBeVisible()
  })

  test('should display programs section', async ({ page }) => {
    const programsSection = page.locator('text=Our Programs').first()
    await expect(programsSection).toBeVisible()
    
    // Check for program cards
    await expect(page.locator('text=AI & Machine Learning')).toBeVisible()
    await expect(page.locator('text=Data Engineering')).toBeVisible()
    await expect(page.locator('text=Web Development')).toBeVisible()
  })

  test('should display testimonials section', async ({ page }) => {
    const testimonialsSection = page.locator('text=Success Stories').first()
    await expect(testimonialsSection).toBeVisible()
    
    // Check for testimonial content
    const testimonials = page.locator('[data-testid="testimonial-card"]')
    await expect(testimonials.first()).toBeVisible()
  })

  test('should display footer', async ({ page }) => {
    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
    
    // Check for footer content
    await expect(footer.locator('text=Seksaa Tech Academy')).toBeVisible()
    await expect(footer.locator('text=© 2024')).toBeVisible()
  })

  test('should have working CTA buttons', async ({ page }) => {
    // Check enroll button
    const enrollButton = page.locator('a[href="/en/enroll"]').first()
    await expect(enrollButton).toBeVisible()
    await expect(enrollButton).toContainText('Enroll Now')
    
    // Check if it's clickable
    await enrollButton.click()
    await expect(page).toHaveURL(/\/en\/enroll/)
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check if mobile menu button is visible
    const mobileMenuButton = page.locator('button[aria-label="Toggle menu"]')
    await expect(mobileMenuButton).toBeVisible()
    
    // Test mobile menu functionality
    await mobileMenuButton.click()
    await expect(page.locator('text=Home')).toBeVisible()
  })

  test('should have proper SEO elements', async ({ page }) => {
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /.+/)
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]')
    await expect(ogTitle).toHaveAttribute('content', /.+/)
    
    const ogDescription = page.locator('meta[property="og:description"]')
    await expect(ogDescription).toHaveAttribute('content', /.+/)
  })

  test('should load images properly', async ({ page }) => {
    // Wait for images to load
    await page.waitForLoadState('networkidle')
    
    // Check for hero image
    const heroImage = page.locator('img').first()
    await expect(heroImage).toBeVisible()
    
    // Check that images have proper alt text
    const images = page.locator('img')
    const count = await images.count()
    
    for (let i = 0; i < count; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      expect(alt).toBeTruthy()
      expect(alt?.length).toBeGreaterThan(0)
    }
  })

  test('should have working language switcher', async ({ page }) => {
    // Find language switcher
    const languageSwitcher = page.locator('[data-testid="language-switcher"]').first()
    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click()
      
      // Check for Khmer option
      const khmerOption = page.locator('text=ខ្មែរ')
      if (await khmerOption.isVisible()) {
        await khmerOption.click()
        await expect(page).toHaveURL(/\/km\//)
      }
    }
  })

  test('should have no console errors', async ({ page }) => {
    const consoleErrors: string[] = []
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })
    
    await page.reload()
    await page.waitForLoadState('networkidle')
    
    // Filter out known acceptable errors (like analytics, third-party scripts)
    const criticalErrors = consoleErrors.filter(error => 
      !error.includes('Google Analytics') &&
      !error.includes('gtag') &&
      !error.includes('Third-party')
    )
    
    expect(criticalErrors).toHaveLength(0)
  })

  test('should have good performance', async ({ page }) => {
    // Navigate and wait for load
    const startTime = Date.now()
    await page.goto('/en')
    await page.waitForLoadState('networkidle')
    const loadTime = Date.now() - startTime
    
    // Check load time is reasonable (less than 5 seconds)
    expect(loadTime).toBeLessThan(5000)
    
    // Check for largest contentful paint
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      })
    })
    
    // LCP should be less than 2.5 seconds
    expect(lcp).toBeLessThan(2500)
  })
}) 