import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProjectPortfolio } from "@/types"
import { ExternalLink, Github, User, Code, Sparkles } from "lucide-react"
import Link from "next/link"

interface ProjectPortfolioCardProps {
  project: ProjectPortfolio
  programTitle?: string
  compact?: boolean
}

export function ProjectPortfolioCard({ 
  project, 
  programTitle, 
  compact = false 
}: ProjectPortfolioCardProps) {
  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${compact ? 'h-auto' : 'h-full'} group overflow-hidden`}>
      {/* Project Image Placeholder */}
      <div className="relative h-48 bg-gradient-to-br from-brand-100 to-orange-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-4 right-4">
          {project.featured && (
            <Badge className="bg-orange-500 text-white">
              <Sparkles className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-white/90 text-gray-700">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-white/90 text-gray-700">
                +{project.technologies.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
            {project.title}
          </CardTitle>
        </div>
        
        {/* Student Info */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
                     <span>{project.category}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Program Badge */}
        {programTitle && (
          <Badge variant="outline" className="text-brand-600 border-brand-200">
            {programTitle}
          </Badge>
        )}

        {/* Description */}
        <p className={`text-muted-foreground leading-relaxed ${compact ? 'text-sm line-clamp-2' : 'text-sm line-clamp-3'}`}>
          {project.description}
        </p>

        {/* Technologies */}
        {!compact && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Code className="h-4 w-4" />
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-1">
              {project.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-brand-600 hover:bg-brand-700 text-white">
                <ExternalLink className="h-3 w-3 mr-1" />
                Live Demo
              </Button>
            </a>
          )}
          
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm">
                <Github className="h-3 w-3 mr-1" />
                Code
              </Button>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 