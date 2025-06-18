// Performance monitoring and optimization utilities

// Core Web Vitals tracking
export function trackWebVitals() {
  if (typeof window === 'undefined') return;

  // Track LCP (Largest Contentful Paint)
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint') {
        console.log('LCP:', entry.startTime);
        // Send to analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'web_vitals', {
            name: 'LCP',
            value: Math.round(entry.startTime),
            event_category: 'Performance'
          });
        }
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.warn('Performance Observer not supported');
  }
}

// Lazy loading intersection observer
export function createLazyLoadObserver(callback: (entries: IntersectionObserverEntry[]) => void) {
  if (typeof window === 'undefined') return null;

  return new IntersectionObserver(callback, {
    rootMargin: '50px',
    threshold: 0.1
  });
}

// Image optimization helpers
export function getOptimizedImageProps(src: string, alt: string, priority = false) {
  return {
    src,
    alt,
    loading: priority ? 'eager' : 'lazy' as 'lazy' | 'eager',
    decoding: 'async' as 'async',
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style: { 
      maxWidth: '100%', 
      height: 'auto' 
    }
  };
}

// Critical resource preloading
export function preloadCriticalResources() {
  if (typeof document === 'undefined') return;

  // Preload critical fonts
  const fontPreloads = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
  ];

  fontPreloads.forEach(href => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = href;
    document.head.appendChild(link);
  });
}

// Bundle splitting helper
export function dynamicImport<T>(importFn: () => Promise<T>) {
  return importFn().catch(err => {
    console.error('Dynamic import failed:', err);
    throw err;
  });
}

// Performance timing utilities
export function measurePerformance(name: string, fn: () => void | Promise<void>) {
  if (typeof performance === 'undefined') return fn();

  const start = performance.now();
  const result = fn();
  
  if (result instanceof Promise) {
    return result.finally(() => {
      const end = performance.now();
      console.log(`${name} took ${end - start} milliseconds`);
    });
  } else {
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
  }
}

// Memory usage tracking
export function trackMemoryUsage() {
  if (typeof window === 'undefined' || !('memory' in performance)) return;

  const memory = (performance as any).memory;
  console.log('Memory usage:', {
    used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
    total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
    limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
  });
}

// Critical CSS extraction helper
export function extractCriticalCSS() {
  if (typeof document === 'undefined') return '';

  const criticalElements = document.querySelectorAll('[data-critical]');
  const criticalCSS: string[] = [];

  criticalElements.forEach(element => {
    const styles = window.getComputedStyle(element);
    // Extract only critical styles (simplified example)
    const critical = {
      display: styles.display,
      position: styles.position,
      width: styles.width,
      height: styles.height,
      margin: styles.margin,
      padding: styles.padding
    };
    
    const selector = element.tagName.toLowerCase() + 
      (element.id ? `#${element.id}` : '') + 
      (element.className ? `.${Array.from(element.classList).join('.')}` : '');
    
    const cssRule = `${selector} { ${Object.entries(critical)
      .map(([prop, value]) => `${prop}: ${value}`)
      .join('; ')} }`;
    
    criticalCSS.push(cssRule);
  });

  return criticalCSS.join('\n');
}

// Service Worker registration for caching
export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// Resource hints for better loading
export function addResourceHints() {
  if (typeof document === 'undefined') return;

  const hints = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://www.google-analytics.com' },
    { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    Object.assign(link, hint);
    document.head.appendChild(link);
  });
} 