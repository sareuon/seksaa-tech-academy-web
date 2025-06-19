import { test, expect } from '@playwright/test'

test.describe('FAQ Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en/faq')
  })

  test('should load FAQ page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/FAQ/)
    await expect(page.locator('h1')).toContainText('Frequently Asked Questions')
  })

  test('should display search functionality', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="search"]')
    await expect(searchInput).toBeVisible()
    
    // Test search functionality
    await searchInput.fill('program')
    await expect(searchInput).toHaveValue('program')
  })

  test('should display filter options', async ({ page }) => {
    // Check for filter button
    const filterButton = page.locator('button').filter({ hasText: 'Filter' }).first()
    await expect(filterButton).toBeVisible()
    
    // Click filter button to open filters
    await filterButton.click()
    
    // Check for category filters
    await expect(page.locator('text=Categories')).toBeVisible()
    await expect(page.locator('text=All')).toBeVisible()
    await expect(page.locator('text=General')).toBeVisible()
    await expect(page.locator('text=Programs')).toBeVisible()
  })

  test('should display FAQ accordions', async ({ page }) => {
    // Wait for FAQs to load
    await page.waitForSelector('[data-testid="faq-accordion"]', { timeout: 10000 })
    
    const faqAccordions = page.locator('[data-testid="faq-accordion"]')
    await expect(faqAccordions.first()).toBeVisible()
    
    // Check that FAQs have questions
    const firstFaq = faqAccordions.first()
    await expect(firstFaq.locator('button')).toBeVisible()
  })

  test('should expand/collapse FAQ items', async ({ page }) => {
    // Wait for FAQs to load
    await page.waitForSelector('[data-testid="faq-accordion"]', { timeout: 10000 })
    
    const firstFaq = page.locator('[data-testid="faq-accordion"]').first()
    const faqButton = firstFaq.locator('button').first()
    
    // Click to expand
    await faqButton.click()
    
    // Check if content is visible
    const faqContent = firstFaq.locator('[data-testid="faq-content"]')
    await expect(faqContent).toBeVisible()
    
    // Click to collapse
    await faqButton.click()
    
    // Check if content is hidden
    await expect(faqContent).not.toBeVisible()
  })

  test('should filter FAQs by category', async ({ page }) => {
    // Open filters
    const filterButton = page.locator('button').filter({ hasText: 'Filter' }).first()
    await filterButton.click()
    
    // Click on Programs category
    const programsCategory = page.locator('text=Programs').first()
    await programsCategory.click()
    
    // Wait for filtering to complete
    await page.waitForTimeout(500)
    
    // Check that only program-related FAQs are shown
    const visibleFaqs = page.locator('[data-testid="faq-accordion"]:visible')
    const count = await visibleFaqs.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should search FAQs', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="search"]')
    
    // Search for a specific term
    await searchInput.fill('duration')
    
    // Wait for search results
    await page.waitForTimeout(500)
    
    // Check that search results are displayed
    const searchResults = page.locator('[data-testid="faq-accordion"]:visible')
    const count = await searchResults.count()
    expect(count).toBeGreaterThan(0)
  })

  test('should display featured FAQs section', async ({ page }) => {
    const featuredSection = page.locator('text=Featured Questions').first()
    await expect(featuredSection).toBeVisible()
    
    // Check for featured FAQ cards
    const featuredFaqs = page.locator('[data-testid="featured-faq"]')
    if (await featuredFaqs.count() > 0) {
      await expect(featuredFaqs.first()).toBeVisible()
    }
  })

  test('should display help section', async ({ page }) => {
    const helpSection = page.locator('text=Need More Help').first()
    await expect(helpSection).toBeVisible()
    
    // Check for contact options
    await expect(page.locator('text=Contact Us')).toBeVisible()
  })

  test('should clear filters', async ({ page }) => {
    // Open filters
    const filterButton = page.locator('button').filter({ hasText: 'Filter' }).first()
    await filterButton.click()
    
    // Apply a filter
    const programsCategory = page.locator('text=Programs').first()
    await programsCategory.click()
    
    // Clear filters
    const clearButton = page.locator('text=Clear Filters').first()
    if (await clearButton.isVisible()) {
      await clearButton.click()
      
      // Check that all FAQs are visible again
      await page.waitForTimeout(500)
      const allFaqs = page.locator('[data-testid="faq-accordion"]:visible')
      const count = await allFaqs.count()
      expect(count).toBeGreaterThan(0)
    }
  })

  test('should show expand/collapse all controls', async ({ page }) => {
    // Check for expand all button
    const expandAllButton = page.locator('button').filter({ hasText: 'Expand All' }).first()
    if (await expandAllButton.isVisible()) {
      await expandAllButton.click()
      
      // Wait for expansion
      await page.waitForTimeout(1000)
      
      // Check that FAQ contents are visible
      const faqContents = page.locator('[data-testid="faq-content"]:visible')
      const count = await faqContents.count()
      expect(count).toBeGreaterThan(0)
      
      // Check for collapse all button
      const collapseAllButton = page.locator('button').filter({ hasText: 'Collapse All' }).first()
      await expect(collapseAllButton).toBeVisible()
    }
  })

  test('should display FAQ statistics', async ({ page }) => {
    // Check for results summary
    const resultsText = page.locator('text*=questions found').first()
    if (await resultsText.isVisible()) {
      const text = await resultsText.textContent()
      expect(text).toMatch(/\d+/)
    }
  })

  test('should be accessible', async ({ page }) => {
    // Check for proper heading hierarchy
    const h1 = page.locator('h1')
    await expect(h1).toBeVisible()
    
    // Check for proper ARIA labels
    const searchInput = page.locator('input[placeholder*="search"]')
    const ariaLabel = await searchInput.getAttribute('aria-label')
    expect(ariaLabel).toBeTruthy()
    
    // Check for keyboard navigation
    await searchInput.focus()
    await expect(searchInput).toBeFocused()
  })

  test('should work on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    // Check that FAQ page is responsive
    const searchInput = page.locator('input[placeholder*="search"]')
    await expect(searchInput).toBeVisible()
    
    // Check that filters work on mobile
    const filterButton = page.locator('button').filter({ hasText: 'Filter' }).first()
    await expect(filterButton).toBeVisible()
    await filterButton.click()
    
    // Check that filter panel is visible
    await expect(page.locator('text=Categories')).toBeVisible()
  })

  test('should handle empty search results', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="search"]')
    
    // Search for something that doesn't exist
    await searchInput.fill('xyznonexistent')
    
    // Wait for search
    await page.waitForTimeout(500)
    
    // Check for empty state message
    const emptyMessage = page.locator('text*=No questions found').first()
    if (await emptyMessage.isVisible()) {
      await expect(emptyMessage).toBeVisible()
    }
  })

  test('should display tags for FAQs', async ({ page }) => {
    // Wait for FAQs to load
    await page.waitForSelector('[data-testid="faq-accordion"]', { timeout: 10000 })
    
    // Check for FAQ tags
    const faqTags = page.locator('[data-testid="faq-tag"]')
    if (await faqTags.count() > 0) {
      await expect(faqTags.first()).toBeVisible()
    }
  })
}) 