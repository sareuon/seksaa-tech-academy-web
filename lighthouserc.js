module.exports = {
  ci: {
    collect: {
      url: [
        'http://localhost:3000/en',
        'http://localhost:3000/en/programs',
        'http://localhost:3000/en/contact',
        'http://localhost:3000/en/faq',
        'http://localhost:3000/en/blog',
        'http://localhost:3000/km',
      ],
      startServerCommand: 'yarn start',
      startServerReadyPattern: 'ready on',
      startServerReadyTimeout: 30000,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'categories:pwa': ['warn', { minScore: 0.6 }],
        
        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        
        // Accessibility
        'color-contrast': 'error',
        'image-alt': 'error',
        'heading-order': 'error',
        'link-name': 'error',
        
        // SEO
        'meta-description': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'hreflang': 'warn',
        
        // Best Practices
        'uses-https': 'error',
        'no-vulnerable-libraries': 'error',
        'csp-xss': 'warn',
        
        // Performance
        'unused-javascript': ['warn', { maxNumericValue: 100000 }],
        'unused-css-rules': ['warn', { maxNumericValue: 50000 }],
        'render-blocking-resources': 'warn',
        'uses-optimized-images': 'warn',
        'uses-webp-images': 'warn',
        'uses-text-compression': 'error',
        'server-response-time': ['error', { maxNumericValue: 500 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    server: {
      port: 9001,
      storage: './lighthouse-reports',
    },
  },
} 