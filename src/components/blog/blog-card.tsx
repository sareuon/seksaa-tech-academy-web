'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, User, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useLocale } from 'next-intl'

interface BlogPost {
  id: string
  title: { en: string; km: string }
  slug: string
  excerpt: { en: string; km: string }
  featuredImage: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  category: string
  tags: string[]
  publishedAt: string
  readingTime: number
  featured: boolean
}

interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'compact'
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const locale = useLocale() as 'en' | 'km'
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale === 'km' ? 'km-KH' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      technology: 'bg-blue-100 text-blue-800',
      career: 'bg-green-100 text-green-800',
      education: 'bg-purple-100 text-purple-800',
      tutorial: 'bg-orange-100 text-orange-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (variant === 'featured') {
    return (
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-slate-50 to-white">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt={post.title[locale]}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4">
            <Badge className={`${getCategoryColor(post.category)} border-0`}>
              {post.category}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <Link href={`/blog/${post.slug}` as any}>
              <h3 className="text-2xl font-bold mb-2 line-clamp-2 hover:text-orange-300 transition-colors">
                {post.title[locale]}
              </h3>
            </Link>
            <p className="text-gray-200 line-clamp-2 mb-3">
              {post.excerpt[locale]}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (variant === 'compact') {
    return (
      <Card className="group hover:shadow-md transition-all duration-300">
        <div className="flex gap-4 p-4">
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={post.featuredImage}
              alt={post.title[locale]}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {post.category}
              </Badge>
              <span className="text-xs text-gray-500">
                {formatDate(post.publishedAt)}
              </span>
            </div>
            <Link href={`/blog/${post.slug}` as any}>
              <h4 className="font-semibold line-clamp-2 hover:text-brand-600 transition-colors mb-1">
                {post.title[locale]}
              </h4>
            </Link>
            <p className="text-sm text-gray-600 line-clamp-2">
              {post.excerpt[locale]}
            </p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.featuredImage}
          alt={post.title[locale]}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <Badge className={`${getCategoryColor(post.category)} border-0`}>
            {post.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <Link href={`/blog/${post.slug}` as any}>
          <h3 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-brand-600 transition-colors">
            {post.title[locale]}
          </h3>
        </Link>
        
        <p className="text-gray-600 line-clamp-3 mb-4">
          {post.excerpt[locale]}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="px-6 py-4 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 overflow-hidden rounded-full">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(post.publishedAt)}</span>
              <Clock className="h-3 w-3 ml-2" />
              <span>{post.readingTime} min</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
} 