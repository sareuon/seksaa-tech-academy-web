'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { 
  Cookie, 
  Settings, 
  X, 
  Shield, 
  BarChart3, 
  Target,
  Info,
  Check,
  ExternalLink
} from 'lucide-react'
import { 
  getCookiePolicy, 
  hasCookieConsent, 
  saveCookieConsent,
  getCookieConsent 
} from '@/lib/data'
import type { CookieConsent, CookieCategory } from '@/types'

interface CookieConsentBannerProps {
  language?: 'en' | 'km'
}

export default function CookieConsentBanner({ language = 'en' }: CookieConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<CookieConsent['categories']>({
    essential: true,
    analytics: false,
    marketing: false
  })
  const [loading, setLoading] = useState(false)

  const cookiePolicy = getCookiePolicy()

  useEffect(() => {
    // Check if user has already given consent
    const hasConsent = hasCookieConsent()
    if (!hasConsent) {
      setIsVisible(true)
    } else {
      // Load existing consent preferences
      const existingConsent = getCookieConsent()
      if (existingConsent) {
        setConsent(existingConsent.categories)
      }
    }
  }, [])

  const handleAcceptAll = async () => {
    setLoading(true)
    const consentData: CookieConsent = {
      sessionId: generateSessionId(),
      consentDate: new Date().toISOString(),
      consentVersion: cookiePolicy.version,
      categories: {
        essential: true,
        analytics: true,
        marketing: true
      },
      ipAddress: await getClientIP(),
      userAgent: navigator.userAgent
    }

    saveCookieConsent(consentData)
    setIsVisible(false)
    setLoading(false)
    
    // Trigger analytics and marketing scripts
    loadAnalyticsScripts()
    loadMarketingScripts()
  }

  const handleAcceptSelected = async () => {
    setLoading(true)
    const consentData: CookieConsent = {
      sessionId: generateSessionId(),
      consentDate: new Date().toISOString(),
      consentVersion: cookiePolicy.version,
      categories: consent,
      ipAddress: await getClientIP(),
      userAgent: navigator.userAgent
    }

    saveCookieConsent(consentData)
    setIsVisible(false)
    setLoading(false)

    // Load scripts based on consent
    if (consent.analytics) loadAnalyticsScripts()
    if (consent.marketing) loadMarketingScripts()
  }

  const handleRejectAll = async () => {
    setLoading(true)
    const consentData: CookieConsent = {
      sessionId: generateSessionId(),
      consentDate: new Date().toISOString(),
      consentVersion: cookiePolicy.version,
      categories: {
        essential: true,
        analytics: false,
        marketing: false
      },
      ipAddress: await getClientIP(),
      userAgent: navigator.userAgent
    }

    saveCookieConsent(consentData)
    setIsVisible(false)
    setLoading(false)
  }

  const generateSessionId = (): string => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  const getClientIP = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
    } catch {
      return 'unknown'
    }
  }

  const loadAnalyticsScripts = () => {
    // Load Google Analytics or other analytics scripts
    if (typeof window !== 'undefined' && !window.gtag) {
      const script = document.createElement('script')
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
      script.async = true
      document.head.appendChild(script)

      script.onload = () => {
        window.dataLayer = window.dataLayer || []
        function gtag(...args: any[]) {
          window.dataLayer.push(args)
        }
        window.gtag = gtag
        gtag('js', new Date())
        gtag('config', 'GA_MEASUREMENT_ID')
      }
    }
  }

  const loadMarketingScripts = () => {
    // Load Facebook Pixel or other marketing scripts
    if (typeof window !== 'undefined' && !window.fbq) {
      const script = document.createElement('script')
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', 'FB_PIXEL_ID');
        fbq('track', 'PageView');
      `
      document.head.appendChild(script)
    }
  }

  const getCategoryIcon = (categoryId: string) => {
    const icons = {
      essential: Shield,
      analytics: BarChart3,
      marketing: Target
    }
    return icons[categoryId as keyof typeof icons] || Cookie
  }

  const getCategoryColor = (categoryId: string) => {
    const colors = {
      essential: 'text-green-600 bg-green-100',
      analytics: 'text-blue-600 bg-blue-100',
      marketing: 'text-purple-600 bg-purple-100'
    }
    return colors[categoryId as keyof typeof colors] || 'text-gray-600 bg-gray-100'
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Cookie className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl">
                  {language === 'en' ? 'Cookie Preferences' : 'ការកំណត់ខូគី'}
                </CardTitle>
                <CardDescription>
                  {language === 'en' 
                    ? 'We use cookies to enhance your experience and analyze our traffic.'
                    : 'យើងប្រើខូគីដើម្បីបង្កើនបទពិសោធន៍របស់អ្នក និងវិភាគចរាចរណ៍របស់យើង។'
                  }
                </CardDescription>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {!showDetails ? (
            // Simple consent view
            <div className="space-y-4">
              <p className="text-gray-700">
                {language === 'en'
                  ? 'We use cookies to provide you with the best possible experience on our website. Some cookies are essential for the site to function, while others help us understand how you use our site and improve our services.'
                  : 'យើងប្រើខូគីដើម្បីផ្តល់ឱ្យអ្នកនូវបទពិសោធន៍ដ៏ល្អបំផុតនៅលើគេហទំព័ររបស់យើង។ ខូគីមួយចំនួនចាំបាច់សម្រាប់គេហទំព័រដើម្បីដំណើរការ ខណៈដែលខ្លះទៀតជួយយើងយល់ពីរបៀបដែលអ្នកប្រើប្រាស់គេហទំព័ររបស់យើង និងកែលម្អសេវាកម្មរបស់យើង។'
                }
              </p>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAcceptAll}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  {language === 'en' ? 'Accept All' : 'ទទួលយកទាំងអស់'}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  disabled={loading}
                >
                  {language === 'en' ? 'Reject All' : 'បដិសេធទាំងអស់'}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowDetails(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Customize' : 'កំណត់តាមបំណង'}
                </Button>
              </div>

              <div className="text-xs text-gray-600">
                {language === 'en' ? (
                  <>
                    By clicking "Accept All", you agree to our{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>
                    .
                  </>
                ) : (
                  <>
                    ដោយចុច "ទទួលយកទាំងអស់" អ្នកយល់ព្រមនឹង{' '}
                    <a href="/privacy" className="text-blue-600 hover:underline">
                      គោលការណ៍ភាពឯកជន
                    </a>{' '}
                    និង{' '}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      លក្ខខណ្ឌសេវាកម្ម
                    </a>
                    ។
                  </>
                )}
              </div>
            </div>
          ) : (
            // Detailed consent view
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {language === 'en' ? 'Cookie Categories' : 'ប្រភេទខូគី'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(false)}
                >
                  {language === 'en' ? 'Back' : 'ត្រលប់'}
                </Button>
              </div>

              <div className="space-y-4">
                {cookiePolicy.categories.map((category: CookieCategory) => {
                  const IconComponent = getCategoryIcon(category.id)
                  const isRequired = category.required
                  const isEnabled = consent[category.id as keyof typeof consent]

                  return (
                    <div key={category.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getCategoryColor(category.id)}`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="font-medium flex items-center gap-2">
                              {category.name[language]}
                              {isRequired && (
                                <Badge variant="secondary" className="text-xs">
                                  {language === 'en' ? 'Required' : 'ចាំបាច់'}
                                </Badge>
                              )}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {category.description[language]}
                            </p>
                          </div>
                        </div>
                        <Switch
                          checked={isEnabled}
                          disabled={isRequired}
                          onCheckedChange={(checked: boolean) => {
                            if (!isRequired) {
                              setConsent(prev => ({
                                ...prev,
                                [category.id]: checked
                              }))
                            }
                          }}
                        />
                      </div>

                      {category.cookies.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <details className="group">
                            <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
                              <Info className="h-3 w-3" />
                              {language === 'en' ? 'View cookies' : 'មើលខូគី'} ({category.cookies.length})
                            </summary>
                            <div className="mt-2 space-y-2">
                              {category.cookies.map((cookie, index) => (
                                <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                                  <div className="font-medium">{cookie.name}</div>
                                  <div className="text-gray-600">{cookie.purpose}</div>
                                  <div className="text-gray-500">
                                    {language === 'en' ? 'Duration' : 'រយៈពេល'}: {cookie.duration}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </details>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t">
                <Button
                  onClick={handleAcceptSelected}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  ) : (
                    <Check className="h-4 w-4 mr-2" />
                  )}
                  {language === 'en' ? 'Save Preferences' : 'រក្សាទុកការកំណត់'}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleAcceptAll}
                  disabled={loading}
                >
                  {language === 'en' ? 'Accept All' : 'ទទួលយកទាំងអស់'}
                </Button>

                <Button
                  variant="outline"
                  onClick={handleRejectAll}
                  disabled={loading}
                >
                  {language === 'en' ? 'Reject All' : 'បដិសេធទាំងអស់'}
                </Button>
              </div>

              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  {language === 'en'
                    ? 'You can change your preferences at any time by clicking the cookie settings link in our footer.'
                    : 'អ្នកអាចផ្លាស់ប្តូរការកំណត់របស់អ្នកគ្រប់ពេលដោយចុចលើតំណភ្ជាប់ការកំណត់ខូគីនៅក្នុងបាតកថារបស់យើង។'
                  }
                </p>
                <p>
                  {language === 'en' ? (
                    <>
                      Learn more about our data practices in our{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                        Privacy Policy
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </>
                  ) : (
                    <>
                      ស្វែងយល់បន្ថែមអំពីការអនុវត្តទិន្នន័យរបស់យើងនៅក្នុង{' '}
                      <a href="/privacy" className="text-blue-600 hover:underline inline-flex items-center gap-1">
                        គោលការណ៍ភាពឯកជន
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </>
                  )}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Extend window object for analytics
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
    fbq: (...args: any[]) => void
  }
} 