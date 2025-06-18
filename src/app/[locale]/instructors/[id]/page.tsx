import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  getInstructorById, 
  getAllInstructors,
  getAllPrograms,
  getScheduleClassesByInstructor,
  type Instructor 
} from '@/lib/data'
import { 
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
  BookOpen,
  Clock,
  Languages,
  Building,
  ArrowLeft,
  Play,
  CheckCircle
} from 'lucide-react'

export async function generateStaticParams() {
  const instructors = getAllInstructors()
  return instructors.map((instructor) => ({
    id: instructor.id,
  }))
}

interface InstructorProfilePageProps {
  params: {
    id: string
  }
}

export default function InstructorProfilePage({ params }: InstructorProfilePageProps) {
  const instructor = getInstructorById(params.id)
  
  if (!instructor) {
    notFound()
  }

  const allPrograms = getAllPrograms()
  const instructorClasses = getScheduleClassesByInstructor(instructor.id)
  const instructorPrograms = allPrograms.filter(program => 
    instructor.coursesTeaching.includes(program.id)
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
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
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/instructors">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Instructors
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4">
                      {instructor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{instructor.name}</h1>
                    <p className="text-lg text-gray-600 mb-4">{instructor.title}</p>
                    
                    {/* Rating */}
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {renderStars(instructor.rating)}
                      </div>
                      <span className="text-lg font-semibold">{instructor.rating}</span>
                      <span className="text-gray-600">({instructor.totalStudents} students)</span>
                    </div>

                    {instructor.featured && (
                      <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-200">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        Featured Instructor
                      </Badge>
                    )}

                    {/* Contact & Social */}
                    <div className="flex justify-center gap-2 mb-6">
                      {instructor.linkedin && (
                        <a 
                          href={instructor.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                      )}
                      {instructor.github && (
                        <a 
                          href={instructor.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {instructor.twitter && (
                        <a 
                          href={instructor.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-blue-400 transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      )}
                      {instructor.website && (
                        <a 
                          href={instructor.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-green-600 transition-colors"
                        >
                          <Globe className="h-5 w-5" />
                        </a>
                      )}
                      <a 
                        href={`mailto:${instructor.email}`}
                        className="p-2 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{instructor.totalStudents}</div>
                        <div className="text-gray-600">Students Taught</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{instructor.coursesTeaching.length}</div>
                        <div className="text-gray-600">Courses</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{instructor.experience.length}</div>
                        <div className="text-gray-600">Companies</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{new Date().getFullYear() - new Date(instructor.joinedDate).getFullYear()}</div>
                        <div className="text-gray-600">Years Here</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Video Introduction */}
              {instructor.videoIntroUrl && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5" />
                      Video Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <Button variant="outline" size="lg">
                        <Play className="h-5 w-5 mr-2" />
                        Watch Introduction
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="courses">Courses</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About {instructor.name.split(' ')[0]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-6">{instructor.longBio}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <BookOpen className="h-4 w-4" />
                            Expertise
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {instructor.expertise.map(skill => (
                              <Badge key={skill} variant="secondary">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Languages className="h-4 w-4" />
                            Languages
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {instructor.languages.map(language => (
                              <Badge key={language} variant="outline">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Key Achievements
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {instructor.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Certifications */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5" />
                        Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {instructor.certifications.map((cert, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Experience Tab */}
                <TabsContent value="experience" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="h-5 w-5" />
                        Professional Experience
                      </CardTitle>
                      <CardDescription>
                        {instructor.teachingExperience}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {instructor.experience.map((exp, index) => (
                          <div key={index} className="border-l-2 border-blue-200 pl-6 pb-6 last:pb-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">{exp.position}</h4>
                                <p className="text-blue-600 font-medium">{exp.company}</p>
                              </div>
                              <Badge variant="outline">{exp.duration}</Badge>
                            </div>
                            <p className="text-gray-700 text-sm">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Education Tab */}
                <TabsContent value="education" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        Education Background
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {instructor.education.map((edu, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                              <p className="text-gray-600">{edu.institution}</p>
                            </div>
                            <Badge variant="outline">{edu.year}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Courses Tab */}
                <TabsContent value="courses" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Courses Teaching
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 gap-4">
                        {instructorPrograms.map(program => (
                          <div key={program.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="font-semibold text-gray-900">{program.title.en}</h4>
                                <p className="text-gray-600 text-sm">{program.shortDescription.en}</p>
                              </div>
                              <Badge>{program.level}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {program.duration.totalHours}h
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {program.format}
                                </span>
                              </div>
                              <Link href={`/programs/${program.id}`}>
                                <Button size="sm" variant="outline">
                                  View Program
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Schedule Tab */}
                <TabsContent value="schedule" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Upcoming Classes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {instructorClasses.length > 0 ? (
                        <div className="space-y-4">
                          {instructorClasses.map(cls => (
                            <div key={cls.id} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-semibold text-gray-900">{cls.programTitle}</h4>
                                  <p className="text-gray-600 text-sm">
                                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][cls.dayOfWeek]}s, {cls.startTime} - {cls.endTime}
                                  </p>
                                </div>
                                <Badge variant={cls.format === 'online' ? 'default' : cls.format === 'hybrid' ? 'secondary' : 'outline'}>
                                  {cls.format}
                                </Badge>
                              </div>
                              {cls.location && (
                                <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {cls.location}
                                </p>
                              )}
                              <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">
                                  {cls.currentStudents}/{cls.maxStudents} students enrolled
                                </div>
                                <Link href="/schedule">
                                  <Button size="sm">
                                    Book Class
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No upcoming classes scheduled</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Learn with {instructor.name.split(' ')[0]}?</h2>
          <p className="text-lg mb-6 opacity-90">
            Join {instructor.totalStudents.toLocaleString()}+ students who have learned from this expert instructor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" variant="secondary">
                View Schedule
              </Button>
            </Link>
            <Link href="/programs">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                Browse Programs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 