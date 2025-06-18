'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  getAllInstructors, 
  getFeaturedInstructors,
  getInstructorsByExpertise,
  getAllPrograms,
  type Instructor 
} from '@/lib/data'
import { 
  Search, 
  Star, 
  Users, 
  GraduationCap, 
  Award, 
  MapPin, 
  Calendar,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Filter,
  BookOpen
} from 'lucide-react'

export default function InstructorsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedExpertise, setSelectedExpertise] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const allInstructors = getAllInstructors()
  const allPrograms = getAllPrograms()

  // Get unique expertise areas
  const expertiseAreas = useMemo(() => {
    const areas = new Set<string>()
    allInstructors.forEach(instructor => {
      instructor.expertise.forEach(skill => areas.add(skill))
    })
    return Array.from(areas).sort()
  }, [allInstructors])

  const filteredInstructors = useMemo(() => {
    let filtered = allInstructors

    if (searchTerm) {
      filtered = filtered.filter(instructor => 
        instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        instructor.expertise.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedExpertise !== 'all') {
      filtered = filtered.filter(instructor => 
        instructor.expertise.some(skill => skill.toLowerCase().includes(selectedExpertise.toLowerCase()))
      )
    }

    if (showFeaturedOnly) {
      filtered = filtered.filter(instructor => instructor.featured)
    }

    // Sort instructors
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'students':
        filtered.sort((a, b) => b.totalStudents - a.totalStudents)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
        })
        break
    }

    return filtered
  }, [searchTerm, selectedExpertise, sortBy, showFeaturedOnly, allInstructors])

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'github': return <Github className="h-4 w-4" />
      case 'linkedin': return <Linkedin className="h-4 w-4" />
      case 'twitter': return <Twitter className="h-4 w-4" />
      case 'website': return <Globe className="h-4 w-4" />
      default: return <ExternalLink className="h-4 w-4" />
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Expert Instructors
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry leaders and experienced professionals who bring real-world expertise 
              to the classroom. Our instructors are passionate educators committed to your success.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{allInstructors.length}</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {allInstructors.reduce((sum, instructor) => sum + instructor.totalStudents, 0).toLocaleString()}
              </div>
              <div className="text-gray-600">Students Taught</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {(allInstructors.reduce((sum, instructor) => sum + instructor.rating, 0) / allInstructors.length).toFixed(1)}
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">{expertiseAreas.length}</div>
              <div className="text-gray-600">Expertise Areas</div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Instructors
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, title, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="expertise" className="block text-sm font-medium text-gray-700 mb-2">
                  Expertise
                </label>
                <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Expertise</SelectItem>
                    {expertiseAreas.map(area => (
                      <SelectItem key={area} value={area.toLowerCase()}>
                        {area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="students">Most Students</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button
                  variant={showFeaturedOnly ? "default" : "outline"}
                  onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                  className="w-full"
                >
                  <Star className="h-4 w-4 mr-2" />
                  Featured Only
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {filteredInstructors.length} instructor{filteredInstructors.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredInstructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInstructors.map(instructor => (
              <Card key={instructor.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {instructor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {instructor.featured && (
                        <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight">{instructor.name}</CardTitle>
                      <CardDescription className="text-sm">{instructor.title}</CardDescription>
                      <div className="flex items-center gap-1 mt-2">
                        {renderStars(instructor.rating)}
                        <span className="text-sm text-gray-600 ml-1">
                          {instructor.rating} ({instructor.totalStudents} students)
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">{instructor.bio}</p>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1">
                    {instructor.expertise.slice(0, 4).map(skill => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {instructor.expertise.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{instructor.expertise.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>{instructor.totalStudents} students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-500" />
                      <span>{instructor.coursesTeaching.length} course{instructor.coursesTeaching.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-gray-500" />
                      <span>{instructor.education[0]?.degree.split(' ')[0] || 'Expert'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span>Since {new Date(instructor.joinedDate).getFullYear()}</span>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-2">
                    {instructor.linkedin && (
                      <a 
                        href={instructor.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {instructor.github && (
                      <a 
                        href={instructor.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                    {instructor.twitter && (
                      <a 
                        href={instructor.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {instructor.website && (
                      <a 
                        href={instructor.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                      >
                        <Globe className="h-4 w-4" />
                      </a>
                    )}
                    <a 
                      href={`mailto:${instructor.email}`}
                      className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Action Button */}
                  <Link href={`/instructors/${instructor.id}`}>
                    <Button className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Users className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No instructors found</h3>
            <p className="text-gray-600">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Learn from the Best?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have transformed their careers with our expert instructors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/programs">
              <Button size="lg" variant="secondary">
                Browse Programs
              </Button>
            </Link>
            <Link href="/schedule">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                View Schedule
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 