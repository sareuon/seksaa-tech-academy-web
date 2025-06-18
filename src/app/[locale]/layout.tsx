import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import "../globals.css"
import { cn } from "@/lib/utils"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import { SITE_CONFIG } from "@/constants"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
})

const locales = ['en', 'km'];
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const isKhmer = locale === 'km';
  
  return {
    title: {
      default: `${SITE_CONFIG.name} | Premier Tech Education in Cambodia`,
      template: `%s | ${SITE_CONFIG.name}`
    },
    description: SITE_CONFIG.description,
    keywords: [
      ...SITE_CONFIG.keywords,
      'Cambodia tech education',
      'IT training Phnom Penh', 
      'programming bootcamp Cambodia',
      'STEM education',
      'web development course',
      'data science training',
      'AI machine learning course',
      isKhmer ? 'បណ្តុះបណ្តាលបច្ចេកវិទ្យា' : 'tech training',
      isKhmer ? 'វគ្គសិក្សាកុំព្យូទ័រ' : 'computer courses'
    ],
    authors: [{ name: SITE_CONFIG.creator }],
    creator: SITE_CONFIG.creator,
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/images/logo.svg',
    },
    openGraph: {
      type: "website",
      locale: isKhmer ? 'km_KH' : 'en_US',
      url: SITE_CONFIG.url,
      title: `${SITE_CONFIG.name} | Premier Tech Education in Cambodia`,
      description: SITE_CONFIG.description,
      siteName: SITE_CONFIG.name,
      images: [{
        url: '/images/logo.svg',
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_CONFIG.name} | Premier Tech Education in Cambodia`,
      description: SITE_CONFIG.description,
      creator: "@seksaatech",
      images: ['/images/logo.svg'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/${locale}`,
      languages: {
        'en': `${SITE_CONFIG.url}/en`,
        'km': `${SITE_CONFIG.url}/km`,
      }
    },
    other: {
      'google-site-verification': 'your-google-verification-code', // Replace with actual verification code
    }
  }
}

// Organization Structured Data
function generateStructuredData(locale: string) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": SITE_CONFIG.name,
    "alternateName": locale === 'km' ? "សិក្សាបច្ចេកវិទ្យា" : "Seksaa Tech Academy",
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/images/logo.svg`,
    "image": `${SITE_CONFIG.url}/images/logo.svg`,
    "telephone": "+855-XX-XXX-XXX",
    "email": "info@seksaatech.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Phnom Penh",
      "addressRegion": "Phnom Penh", 
      "addressCountry": "KH"
    },
    "sameAs": [
      "https://facebook.com/seksaatech",
      "https://instagram.com/seksaatech",
      "https://linkedin.com/company/seksaatech"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Tech Education Programs",
      "itemListElement": [
        {
          "@type": "Course",
          "name": "Web Development Bootcamp",
          "description": "Full-stack web development training",
          "provider": { "@type": "EducationalOrganization", "name": SITE_CONFIG.name }
        },
        {
          "@type": "Course", 
          "name": "Data Engineering Program",
          "description": "Data processing and analytics training",
          "provider": { "@type": "EducationalOrganization", "name": SITE_CONFIG.name }
        },
        {
          "@type": "Course",
          "name": "AI & Machine Learning Course", 
          "description": "Artificial intelligence and ML training",
          "provider": { "@type": "EducationalOrganization", "name": SITE_CONFIG.name }
        }
      ]
    }
  };

  return JSON.stringify(organizationData);
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Google Analytics 4 */}
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}
        
        {/* Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateStructuredData(locale) }}
        />
        
        {/* Additional SEO Tags */}
        <meta name="theme-color" content="#1e293b" />
        <meta name="msapplication-TileColor" content="#1e293b" />
        <link rel="canonical" href={`${SITE_CONFIG.url}/${locale}`} />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
        <NextIntlClientProvider messages={messages}>
          <div className="relative flex min-h-screen flex-col">
            <Navigation />
            <div className="flex-1">{children}</div>
            <Footer />
            <WhatsAppButton variant="floating" />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
} 