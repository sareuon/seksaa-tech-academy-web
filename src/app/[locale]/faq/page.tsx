import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { FAQPageClient } from '@/components/faq/faq-page-client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, Phone, Mail, HelpCircle, Search, BookOpen } from 'lucide-react'
import Link from 'next/link'

// Import FAQ data
import faqData from '@/data/faq.json'
import { FAQ } from '@/types'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'faq' })
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
    },
  }
}

export default function FAQPage() {
  const t = useTranslations('faq')

  // Get featured FAQs
  const featuredFAQs = faqData.faqs.filter(faq => faq.featured).slice(0, 4)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-orange-50">
        <div className="absolute inset-0 circuit-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="h-10 w-10 text-white" />
            </div>
            <h1 className="heading-xl mb-6">
              <span className="text-gradient">{t('title')}</span>
            </h1>
            <div className="section-divider"></div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t('subtitle')}
              <br className="hidden md:block" />
              <span className="text-brand-600 font-semibold">{t('description')}</span>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('stats.searchable.title')}</h3>
                <p className="text-muted-foreground">
                  {t('stats.searchable.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('stats.categories.title')}</h3>
                <p className="text-muted-foreground">
                  {t('stats.categories.description')}
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t('stats.support.title')}</h3>
                <p className="text-muted-foreground">
                  {t('stats.support.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured FAQs Section */}
      {featuredFAQs.length > 0 && (
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">
              <span className="text-gradient">{t('featured.title')}</span>
            </h2>
            <div className="section-divider"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {featuredFAQs.map((faq) => (
              <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg leading-tight flex-1 pr-4">
                      {faq.question.en}
                    </CardTitle>
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {faq.answer.en.length > 150 
                      ? `${faq.answer.en.substring(0, 150)}...` 
                      : faq.answer.en
                    }
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild>
              <Link href="#all-faqs">
                {t('featured.viewAll')}
              </Link>
            </Button>
          </div>
        </section>
      )}

      {/* Main FAQ Section */}
      <section id="all-faqs" className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="heading-lg mb-4">
              <span className="text-gradient">{t('allFaqs.title')}</span>
            </h2>
            <div className="section-divider"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('allFaqs.subtitle')}
            </p>
          </div>

          {/* FAQ Client Component */}
          <FAQPageClient faqs={faqData.faqs as FAQ[]} />
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 circuit-pattern opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('help.title')}
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              {t('help.subtitle')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Phone className="h-5 w-5" />
                    {t('help.phone.title')}
                  </CardTitle>
                  <CardDescription className="text-brand-100">
                    {t('help.phone.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    asChild
                    variant="secondary" 
                    className="w-full bg-white text-brand-700 hover:bg-gray-100"
                  >
                    <a href="tel:+85512345678">
                      +855 12 345 678
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Mail className="h-5 w-5" />
                    {t('help.email.title')}
                  </CardTitle>
                  <CardDescription className="text-brand-100">
                    {t('help.email.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    asChild
                    variant="secondary" 
                    className="w-full bg-white text-brand-700 hover:bg-gray-100"
                  >
                    <a href="mailto:help@seksaatech.com">
                      help@seksaatech.com
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MessageCircle className="h-5 w-5" />
                    {t('help.contact.title')}
                  </CardTitle>
                  <CardDescription className="text-brand-100">
                    {t('help.contact.description')}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    asChild
                    variant="secondary" 
                    className="w-full bg-white text-brand-700 hover:bg-gray-100"
                  >
                    <Link href="/contact">
                      {t('help.contact.button')}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 