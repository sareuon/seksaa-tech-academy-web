import { getTranslations } from 'next-intl/server'
import { BlogList } from '@/components/blog/blog-list'
import blogData from '@/data/blog-posts.json'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' })
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: t('meta.keywords'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
    },
  }
}

export default async function BlogPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'blog' })
  
  // Get blog posts and sort by published date (newest first)
  const posts = blogData.blogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                {t('hero.topics.tech')}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                {t('hero.topics.career')}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                {t('hero.topics.education')}
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                {t('hero.topics.tutorials')}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <BlogList posts={posts} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-brand-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{t('newsletter.title')}</h2>
            <p className="text-lg mb-8 text-blue-100">{t('newsletter.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button className="px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors">
                {t('newsletter.subscribe')}
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">{t('newsletter.privacy')}</p>
          </div>
        </div>
      </section>
    </div>
  )
} 