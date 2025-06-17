import { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, GraduationCap, Code, Presentation, Laptop, Trophy, BookOpen, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Gallery - Seksaa Tech Academy",
  description: "See our students and instructors in action. Explore our modern learning environments and success stories.",
}

interface GalleryImage {
  src: string
  alt: string
  title: string
  description: string
  category: string
  tags: string[]
  icon: React.ComponentType<{ className?: string }>
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Khmer students coding in modern classroom",
    title: "Hands-on Programming",
    description: "Cambodian students working on real coding projects using modern development tools and programming languages. Our interactive approach ensures every student gets practical experience.",
    category: "Programming",
    tags: ["Coding", "Web Development", "JavaScript", "React"],
    icon: Code
  },
  {
    src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Khmer instructor mentoring students",
    title: "One-on-One Mentoring",
    description: "Experienced Cambodian instructors providing personalized guidance and support in our STEM-focused environment. Individual attention ensures no student is left behind.",
    category: "Mentoring",
    tags: ["Teaching", "STEM", "Mentorship", "Support"],
    icon: Users
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Interactive classroom with Asian students",
    title: "Interactive Learning",
    description: "Modern classroom equipped with dual displays and collaborative learning tools. Cambodian students actively participate in discussions and presentations.",
    category: "Classroom",
    tags: ["Presentation", "Collaboration", "Learning", "Technology"],
    icon: Presentation
  }
]

const portfolioShowcase = [
  {
    title: "E-commerce Platform",
    description: "Full-stack web application with React and Node.js",
    student: "Sok Dara",
    program: "Full Stack Development",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    image: "/images/portfolio/ecommerce-project.jpg"
  },
  {
    title: "Mobile Banking App",
    description: "React Native application with secure authentication",
    student: "Chea Sophea",
    program: "Mobile Development",
    technologies: ["React Native", "Firebase", "TypeScript"],
    image: "/images/portfolio/banking-app.jpg"
  },
  {
    title: "Data Analytics Dashboard",
    description: "Python-based dashboard for business intelligence",
    student: "Lim Pisach",
    program: "Data Science",
    technologies: ["Python", "Pandas", "Plotly", "SQL"],
    image: "/images/portfolio/analytics-dashboard.jpg"
  }
]

const categories = ["All", "Programming", "Mentoring", "Classroom", "Projects"]

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Gallery
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience the vibrant learning environment at Seksaa Tech Academy. 
              See our students in action, explore our modern facilities, and discover 
              the incredible projects our graduates create.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">500+</div>
                <div className="text-sm text-muted-foreground">Active Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">20+</div>
                <div className="text-sm text-muted-foreground">Expert Instructors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">96%</div>
                <div className="text-sm text-muted-foreground">Job Placement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">1000+</div>
                <div className="text-sm text-muted-foreground">Graduates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Classroom Activities Gallery */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Classroom Activities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real moments from our interactive learning environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {galleryImages.map((image, index) => {
              const IconComponent = image.icon
              return (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <Badge className="bg-white/90 text-gray-900 hover:bg-white shadow-lg">
                        <IconComponent className="h-3 w-3 mr-1" />
                        {image.category}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {image.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {image.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {image.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Student Portfolio Showcase */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Student Portfolio Showcase</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the incredible projects our students build during their journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioShowcase.map((project, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-background">
                <div className="relative h-48 w-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Laptop className="h-12 w-12 text-primary mx-auto mb-2" />
                      <div className="text-sm font-medium">{project.title}</div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <Badge variant="outline" className="text-xs">
                      {project.program}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {project.description}
                  </p>
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">Student: {project.student}</div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Success Story?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join our vibrant learning community and build projects that will kickstart your tech career
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-primary">
              <Zap className="h-5 w-5 mr-2" />
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              <BookOpen className="h-5 w-5 mr-2" />
              Explore Programs
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
} 