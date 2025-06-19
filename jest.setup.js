import '@testing-library/jest-dom'

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => '/en',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: (namespace) => (key) => {
    if (namespace && key) {
      return `${namespace}.${key}`
    }
    return key || 'test-translation'
  },
  useLocale: () => 'en',
  useMessages: () => ({}),
}))

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />
  },
}))

// Mock Intersection Observer
global.IntersectionObserver = jest.fn(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = jest.fn(() => ({
  disconnect: jest.fn(),
  observe: jest.fn(),
  unobserve: jest.fn(),
}))

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn()

// Mock console methods to reduce noise in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render is no longer supported')
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

// Global test utilities
global.testUtils = {
  // Mock form submission
  mockFormSubmit: jest.fn(),
  
  // Mock analytics
  mockAnalytics: {
    track: jest.fn(),
    page: jest.fn(),
    identify: jest.fn(),
  },
  
  // Mock localStorage
  mockLocalStorage: (() => {
    let store = {}
    return {
      getItem: (key) => store[key] || null,
      setItem: (key, value) => {
        store[key] = value.toString()
      },
      removeItem: (key) => {
        delete store[key]
      },
      clear: () => {
        store = {}
      },
    }
  })(),
}

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: global.testUtils.mockLocalStorage,
})

// Mock sessionStorage
Object.defineProperty(window, 'sessionStorage', {
  value: global.testUtils.mockLocalStorage,
}) 