import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllTestimonials, getAllPrograms, getAllSuccessStories, getCareerOutcomes, getFeaturedProjects } from "@/lib/data"
import { SuccessStoryCard } from "@/components/success-stories/success-story-card"
import { ProjectPortfolioCard } from "@/components/success-stories/project-portfolio-card"
import { CareerOutcomesStats } from "@/components/success-stories/career-outcomes-stats"
import { MapPin, Calendar, Award, BookOpen, Users, Star, ExternalLink, Mail, Linkedin, Github, Building, GraduationCap, Briefcase, TrendingUp, DollarSign, Clock, Target, Code, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SuccessStoriesPage() {
  const testimonials = getAllTestimonials()
  const programs = getAllPrograms()
  const successStories = getAllSuccessStories()
  const careerOutcomes = getCareerOutcomes()
  const featuredProjects = getFeaturedProjects()

  // Group testimonials by program
  const testimonialsByProgram = testimonials.reduce((acc, testimonial) => {
    const programId = testimonial.programId
    if (!acc[programId]) {
      acc[programId] = []
    }
    acc[programId].push(testimonial)
    return acc
  }, {} as Record<string, typeof testimonials>)

  const featuredStories = successStories.filter(s => s.featured).slice(0, 3)
  const featuredTestimonials = testimonials.filter(t => t.featured).slice(0, 3)

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-orange-50">
        <div className="absolute inset-0 circuit-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-xl mb-6">
              <span className="text-gradient">Student Success Stories</span>
            </h1>
            <div className="section-divider"></div>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Real stories from real graduates who transformed their careers with Seksaa Tech Academy.
              <br className="hidden md:block" />
              <span className="text-brand-600 font-semibold">From career changers to industry leaders - see what's possible.</span>
            </p>
            
            {/* Success Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Job Placement Rate</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <div className="text-sm text-muted-foreground">Graduates Placed</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Salary Increase</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-orange-600 mb-2">3 Months</div>
                <div className="text-sm text-muted-foreground">Avg. Time to Job</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            <span className="text-gradient">Featured Success Stories</span>
          </h2>
          <div className="section-divider"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Inspiring journeys of career transformation and professional growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredStories.map((story) => {
            const program = programs.find(p => p.id === story.programId)
            
            return (
              <SuccessStoryCard
                key={story.id}
                story={story}
                programTitle={program?.title.en}
                compact={false}
              />
            )
          })}
        </div>

        {/* View All Stories CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white">
            View All Success Stories
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Success by Program */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">
              <span className="text-gradient">Success Across All Programs</span>
            </h2>
            <div className="section-divider"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every program delivers exceptional results and career outcomes
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-12">
              <TabsTrigger value="all">All Programs</TabsTrigger>
              <TabsTrigger value="ai-ml">AI & ML</TabsTrigger>
              <TabsTrigger value="data-engineering">Data Eng.</TabsTrigger>
              <TabsTrigger value="web-development">Web Dev</TabsTrigger>
            </TabsList>

            {/* All Programs Tab */}
            <TabsContent value="all" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.slice(0, 6).map((testimonial) => {
                  const program = programs.find(p => p.id === testimonial.programId)
                  
                  return (
                    <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {testimonial.studentName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{testimonial.studentName}</h4>
                            {testimonial.currentPosition && (
                              <p className="text-sm text-brand-600">{testimonial.currentPosition.en}</p>
                            )}
                            {program && (
                              <Badge variant="outline" className="text-xs mt-1">
                                {program.title.en}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <blockquote className="text-muted-foreground italic text-sm mb-3 line-clamp-3">
                          "{testimonial.testimonial.en}"
                        </blockquote>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < testimonial.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(testimonial.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            {/* Individual Program Tabs */}
            {programs.map((program) => (
              <TabsContent key={program.id} value={program.id} className="mt-8">
                <div className="mb-8">
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        program.id === 'ai-ml' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
                        program.id === 'data-engineering' ? 'bg-gradient-to-br from-blue-500 to-cyan-500' :
                        'bg-gradient-to-br from-green-500 to-teal-500'
                      }`}>
                        <span className="text-white text-lg">
                          {program.id === 'ai-ml' ? '🤖' : 
                           program.id === 'data-engineering' ? '📊' : '💻'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{program.title.en}</h3>
                        <p className="text-muted-foreground">{program.shortDescription.en}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">100%</div>
                        <div className="text-sm text-muted-foreground">Job Placement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{testimonialsByProgram[program.id]?.length || 0}</div>
                        <div className="text-sm text-muted-foreground">Graduates</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">4.9</div>
                        <div className="text-sm text-muted-foreground">Avg Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">90%</div>
                        <div className="text-sm text-muted-foreground">Salary Increase</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {(testimonialsByProgram[program.id] || []).map((testimonial) => (
                    <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">
                              {testimonial.studentName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{testimonial.studentName}</h4>
                            {testimonial.currentPosition && (
                              <p className="text-sm text-brand-600">{testimonial.currentPosition.en}</p>
                            )}
                            {testimonial.currentCompany && (
                              <p className="text-xs text-muted-foreground">{testimonial.currentCompany}</p>
                            )}
                          </div>
                        </div>
                        
                        <blockquote className="text-muted-foreground italic text-sm mb-4">
                          "{testimonial.testimonial.en}"
                        </blockquote>
                        
                        {testimonial.beforeAfter && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <div className="text-xs space-y-1">
                              <div>
                                <span className="text-red-600 font-medium">Before:</span>
                                <span className="text-muted-foreground ml-1">{testimonial.beforeAfter.before.en}</span>
                              </div>
                              <div>
                                <span className="text-green-600 font-medium">After:</span>
                                <span className="text-muted-foreground ml-1">{testimonial.beforeAfter.after.en}</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < testimonial.rating ? 'fill-orange-400 text-orange-400' : 'text-gray-300'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(testimonial.graduationDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Career Outcomes */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            <span className="text-gradient">Career Outcomes That Matter</span>
          </h2>
          <div className="section-divider"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real data from our graduates showing tangible career advancement
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">$45,000</h3>
              <p className="text-muted-foreground text-sm mb-2">Average Starting Salary</p>
              <div className="text-xs text-green-600 font-medium">+85% from previous role</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">2.8 Months</h3>
              <p className="text-muted-foreground text-sm mb-2">Average Time to Job</p>
              <div className="text-xs text-blue-600 font-medium">From graduation</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">95%</h3>
              <p className="text-muted-foreground text-sm mb-2">Career Satisfaction</p>
              <div className="text-xs text-purple-600 font-medium">Love their new role</div>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">78%</h3>
              <p className="text-muted-foreground text-sm mb-2">Get Promoted</p>
              <div className="text-xs text-orange-600 font-medium">Within first year</div>
            </CardContent>
          </Card>
        </div>

        {/* Top Hiring Companies */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Where Our Graduates Work
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              'TechCorp', 'DataFlow Inc', 'AI Solutions', 'WebTech Co', 'CloudSys', 'InnovateLab',
              'SmartData', 'CodeCraft', 'NextGen Tech', 'Digital Plus', 'TechStart', 'FutureSoft'
            ].map((company, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-gray-600 font-bold text-xs">{company.slice(0, 2)}</span>
                </div>
                <div className="text-sm text-muted-foreground">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Outcomes Statistics */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">
              <span className="text-gradient">Career Outcomes & Statistics</span>
            </h2>
            <div className="section-divider"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real data showing the impact of our programs on student careers
            </p>
          </div>

          <CareerOutcomesStats outcomes={careerOutcomes} />
        </div>
      </section>

      {/* Student Project Portfolio */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            <span className="text-gradient">Student Project Portfolio</span>
          </h2>
          <div className="section-divider"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Innovative projects built by our students during their learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project) => {
            const program = programs.find(p => p.title.en === project.program)
            
            return (
              <ProjectPortfolioCard
                key={project.id}
                project={project}
                programTitle={program?.title.en}
                compact={false}
              />
            )
          })}
        </div>

        {/* View All Projects CTA */}
        <div className="text-center">
          <Button size="lg" variant="outline" className="border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white">
            <Code className="mr-2 h-4 w-4" />
            View All Projects
          </Button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-brand-600 to-brand-700 py-20">
        <div className="container mx-auto px-4 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-brand-100 mb-8">
              Join hundreds of graduates who transformed their careers with Seksaa Tech Academy.
              <br className="hidden md:block" />
              Your success story could be next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/programs">
                <Button size="lg" variant="secondary" className="bg-white text-brand-700 hover:bg-gray-100">
                  Explore Programs
                </Button>
              </Link>
              <Link href="/enroll">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-brand-700">
                  Start Your Journey
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 