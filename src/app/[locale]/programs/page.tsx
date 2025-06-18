'use client'

import { useState, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ProgramCard } from "@/components/ui/program-card"
import { getAllPrograms, getProgramCategories } from "@/lib/data"
import { Program } from "@/types"
import { Search, Filter, BookOpen, Clock, Users, Star } from 'lucide-react'

export default function ProgramsPage() {
  const allPrograms = getAllPrograms()
  const categories = getProgramCategories()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLevel, setSelectedLevel] = useState<string>('all')
  const [selectedFormat, setSelectedFormat] = useState<string>('all')

  // Filter programs based on search and filters
  const filteredPrograms = useMemo(() => {
    return allPrograms.filter(program => {
      const matchesSearch = program.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           program.shortDescription.en.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || program.category === selectedCategory
      const matchesLevel = selectedLevel === 'all' || program.level === selectedLevel
      const matchesFormat = selectedFormat === 'all' || program.format === selectedFormat
      
      return matchesSearch && matchesCategory && matchesLevel && matchesFormat
    })
  }, [allPrograms, searchQuery, selectedCategory, selectedLevel, selectedFormat])

  const resetFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedLevel('all')
    setSelectedFormat('all')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-blue-50 to-orange-50 py-20">
        <div className="absolute inset-0 circuit-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h1 className="heading-xl mb-6">
              <span className="text-gradient">Our Programs</span>
            </h1>
            <div className="section-divider"></div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Choose from our comprehensive range of tech programs designed to transform your career. 
              All programs feature hands-on projects, industry mentorship, and guaranteed job placement support.
            </p>
            <div className="flex items-center justify-center gap-8 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-500" />
                <span>{allPrograms.length} Programs Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-brand-500" />
                <span>200+ Graduates</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-brand-500" />
                <span>100% Job Placement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-8">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search programs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filters:</span>
              </div>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                                 {categories.map((category: any) => (
                   <option key={category.id} value={category.id}>
                     {category.name.en}
                   </option>
                 ))}
              </select>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              {/* Format Filter */}
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              >
                <option value="all">All Formats</option>
                <option value="online">Online</option>
                <option value="in-person">In-Person</option>
                <option value="hybrid">Hybrid</option>
              </select>

              {/* Reset Filters */}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={resetFilters}
                className="text-xs"
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedCategory !== 'all' || selectedLevel !== 'all' || selectedFormat !== 'all') && (
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {searchQuery && (
                <Badge variant="secondary" className="text-xs">
                  Search: "{searchQuery}"
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                                 <Badge variant="secondary" className="text-xs">
                   Category: {categories.find((c: any) => c.id === selectedCategory)?.name.en}
                 </Badge>
              )}
              {selectedLevel !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Level: {selectedLevel}
                </Badge>
              )}
              {selectedFormat !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Format: {selectedFormat}
                </Badge>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-muted-foreground mb-6">
            Showing {filteredPrograms.length} of {allPrograms.length} programs
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="container mx-auto px-4 pb-20">
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No programs found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search criteria or filters to find the perfect program for you.
            </p>
            <Button onClick={resetFilters} variant="outline">
              Clear all filters
            </Button>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 pb-20">
        <div className="gradient-bg rounded-2xl p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 circuit-pattern opacity-5"></div>
          <div className="relative z-10">
            <h2 className="heading-lg mb-4">
              <span className="text-gradient">Can't Find What You're Looking For?</span>
            </h2>
            <div className="section-divider"></div>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our education consultants are here to help you choose the perfect program for your career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-primary-enhanced glow-on-hover">
                <Users className="w-4 h-4 mr-2" />
                Talk to a Consultant
              </Button>
              <Button variant="outline" className="btn-secondary-enhanced">
                <BookOpen className="w-4 h-4 mr-2" />
                Download Program Guide
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 