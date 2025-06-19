import { chromium, FullConfig } from '@playwright/test'

async function globalSetup(config: FullConfig) {
  const { baseURL } = config.projects[0].use
  
  // Launch browser for setup
  const browser = await chromium.launch()
  const page = await browser.newPage()
  
  try {
    // Wait for the server to be ready
    console.log(`Waiting for server at ${baseURL}...`)
    await page.goto(baseURL + '/en')
    await page.waitForLoadState('networkidle')
    console.log('Server is ready!')
    
    // Perform any global setup tasks here
    // For example, create test data, authenticate, etc.
    
  } catch (error) {
    console.error('Global setup failed:', error)
    throw error
  } finally {
    await browser.close()
  }
}

export default globalSetup 