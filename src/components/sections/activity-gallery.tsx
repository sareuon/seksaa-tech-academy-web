import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, GraduationCap, Code, Presentation } from "lucide-react"

interface GalleryImage {
  src: string
  alt: string
  title: string
  description: string
  category: string
  icon: React.ComponentType<{ className?: string }>
}

const galleryImages: GalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Khmer students coding in modern classroom",
    title: "Hands-on Programming",
    description: "Cambodian students working on real coding projects using modern development tools and programming languages",
    category: "Programming",
    icon: Code
  },
  {
    src: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Khmer instructor mentoring students", 
    title: "One-on-One Mentoring",
    description: "Experienced Cambodian instructors providing personalized guidance and support in our STEM-focused environment",
    category: "Mentoring",
    icon: Users
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Interactive classroom with Asian students",
    title: "Interactive Learning", 
    description: "Modern classroom with dual displays facilitating collaborative learning and presentations among Cambodian students",
    category: "Classroom",
    icon: Presentation
  }
]

interface ActivityGalleryProps {
  title?: string
  description?: string
  showAll?: boolean
}

export default function ActivityGallery({ 
  title = "Learning in Action", 
  description = "See our students and instructors in action at Seksaa Tech Academy",
  showAll = true 
}: ActivityGalleryProps) {
  const displayImages = showAll ? galleryImages : galleryImages.slice(0, 2)

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayImages.map((image, index) => {
            const IconComponent = image.icon
            return (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-gray-900 hover:bg-white">
                      <IconComponent className="h-3 w-3 mr-1" />
                      {image.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {image.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-12 border-t">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-sm text-muted-foreground">Active Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">20+</div>
            <div className="text-sm text-muted-foreground">Expert Instructors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">96%</div>
            <div className="text-sm text-muted-foreground">Job Placement Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1000+</div>
            <div className="text-sm text-muted-foreground">Graduates</div>
          </div>
        </div>
      </div>
    </section>
  )
} 