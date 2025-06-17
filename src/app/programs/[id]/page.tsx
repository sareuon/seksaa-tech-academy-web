import { notFound } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { getProgramById, getInstructorsByIds } from "@/lib/data"
import { Clock, Users, BookOpen, Star, Calendar, MapPin, DollarSign, CheckCircle, PlayCircle, Download, MessageCircle } from 'lucide-react'

interface ProgramPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  // For now, return the known program IDs
  return [
    { id: 'ai-machine-learning' },
    { id: 'data-engineering' },
    { id: 'web-development' }
  ]
}

export default function ProgramPage({ params }: ProgramPageProps) {
  const program = getProgramById(params.id)
  
  if (!program) {
    notFound()
  }

  const instructors = getInstructorsByIds(program.instructorIds)

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ai': return '🧠'
      case 'data': return '📈'
      case 'web': return '🌐'
      case 'mobile': return '📱'
      case 'devops': return '☁️'
      case 'design': return '🎨'
      default: return '📚'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-blue-50 to-orange-50 py-20">
        <div className="absolute inset-0 circuit-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Program Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                  {getCategoryIcon(program.category)}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getLevelColor(program.level)}>
                      {program.level}
                    </Badge>
                    <Badge variant="outline">
                      {program.format}
                    </Badge>
                    {program.featured && (
                      <Badge className="bg-orange-100 text-orange-700">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <h1 className="heading-lg">
                    <span className="text-gradient">{program.title.en}</span>
                  </h1>
                </div>
              </div>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {program.fullDescription.en}
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Clock className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="text-2xl font-bold text-brand-600">{program.duration.weeks}</div>
                  <div className="text-sm text-muted-foreground">Weeks</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <BookOpen className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="text-2xl font-bold text-brand-600">{program.duration.hoursPerWeek}</div>
                  <div className="text-sm text-muted-foreground">Hours/Week</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="text-2xl font-bold text-brand-600">{instructors.length}</div>
                  <div className="text-sm text-muted-foreground">Instructors</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Star className="w-6 h-6 text-brand-600" />
                  </div>
                  <div className="text-2xl font-bold text-brand-600">100%</div>
                  <div className="text-sm text-muted-foreground">Job Placement</div>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 shadow-2xl border-2 border-brand-100">
                <CardHeader className="text-center pb-4">
                  <div className="text-3xl font-bold text-brand-600 mb-2">
                    {formatCurrency(program.pricing.fullPrice, program.pricing.currency)}
                  </div>
                  <div className="text-sm text-muted-foreground">Full Program Fee</div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Lifetime access to materials</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>1-on-1 mentorship sessions</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Job placement assistance</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-4 border-t">
                    <Button className="w-full btn-primary-enhanced glow-on-hover">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Enroll Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Talk to Advisor
                    </Button>
                    <Button variant="ghost" className="w-full text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Syllabus
                    </Button>
                  </div>
                  
                  <div className="text-center pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Next cohort starts:</div>
                    <div className="font-semibold text-brand-600">January 15, 2025</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
            <TabsTrigger value="outcomes">Outcomes</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Prerequisites */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-500" />
                    Prerequisites
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {program.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-brand-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{prereq.en}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Learning Outcomes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-brand-500" />
                    What You'll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {program.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{outcome.en}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Skills You'll Gain */}
            <Card>
              <CardHeader>
                <CardTitle>Skills You'll Gain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {program.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Curriculum Tab */}
          <TabsContent value="curriculum" className="space-y-6">
            {program.modules.map((module, index) => (
              <Card key={module.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-brand-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        {module.title.en}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {module.description.en}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">
                      {module.duration} hours
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Learning Objectives:</h4>
                    <ul className="space-y-2">
                      {module.objectives.map((objective, objIndex) => (
                        <li key={objIndex} className="flex items-start gap-2">
                          <PlayCircle className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{objective.en}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Instructors Tab */}
          <TabsContent value="instructors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {instructors.map((instructor) => (
                <Card key={instructor.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {instructor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{instructor.name}</h3>
                        <p className="text-brand-600 text-sm mb-2">{instructor.title}</p>
                        <p className="text-muted-foreground text-sm mb-3">{instructor.bio}</p>
                        <div className="flex flex-wrap gap-1">
                          {instructor.expertise.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Outcomes Tab */}
          <TabsContent value="outcomes" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-brand-600 mb-2">100%</div>
                  <div className="text-muted-foreground">Job Placement Rate</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-brand-600 mb-2">$65K</div>
                  <div className="text-muted-foreground">Average Starting Salary</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-brand-600 mb-2">3</div>
                  <div className="text-muted-foreground">Months to Employment</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Career Paths</CardTitle>
                <CardDescription>
                  Graduates from this program typically pursue these roles:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Machine Learning Engineer',
                    'Data Scientist',
                    'AI Research Scientist',
                    'Deep Learning Engineer',
                    'Computer Vision Engineer',
                    'NLP Engineer'
                  ].map((role, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{role}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-4">
            {[
              {
                question: "What is the class schedule?",
                answer: "Classes are held in the evenings (6-9 PM) on weekdays and weekends (9 AM - 5 PM) to accommodate working professionals."
              },
              {
                question: "Do I need prior programming experience?",
                answer: "Basic programming knowledge is recommended but not required. We provide foundational materials to help you get started."
              },
              {
                question: "What kind of job support do you provide?",
                answer: "We offer resume review, interview preparation, portfolio development, and direct connections with our hiring partners."
              },
              {
                question: "Can I pay in installments?",
                answer: "Yes, we offer flexible payment plans including monthly installments and income-share agreements."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  )
} 