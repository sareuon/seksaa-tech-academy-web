# Seksaa Tech Academy - Cursor Development Rules

## Project Overview
This is a **static tech school website** for Seksaa Tech Academy, built with Next.js, TypeScript, and shadcn/ui, deployed to AWS S3 as a static site.

## Core Technology Stack
- **Framework**: Next.js 14+ with TypeScript
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS (required by shadcn/ui)
- **Icons**: Lucide React (integrated with shadcn/ui)
- **Animations**: Framer Motion for page transitions and interactions
- **Forms**: React Hook Form with Zod validation
- **Deployment**: AWS S3 Static Website Hosting
- **Build**: Static Site Generation (SSG) - `next export`

## 🚀 Development Guidelines

### File Structure & Organization
```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (pages)/           # Route groups for main pages
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components (auto-generated)
│   ├── sections/         # Page sections (Hero, Programs, etc.)
│   ├── forms/            # Form components
│   └── layout/           # Layout components (Header, Footer)
├── lib/                  # Utility functions and configurations
│   ├── utils.ts          # shadcn/ui utility functions
│   ├── validations.ts    # Zod schemas for forms
│   └── constants.ts      # App constants and data
├── types/                # TypeScript type definitions
├── data/                 # Static data and content
└── public/               # Static assets
```

### Component Development Rules

#### 1. shadcn/ui Component Usage
- **ALWAYS** use shadcn/ui components as base components
- Install components via: `npx shadcn-ui@latest add [component-name]`
- Customize components by modifying the generated files in `components/ui/`
- Use Radix UI primitives for complex interactions

#### 2. Component Structure
```typescript
// Use this pattern for all components
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ComponentProps {
  className?: string
  // other props
}

export function ComponentName({ className, ...props }: ComponentProps) {
  return (
    <Card className={cn("default-classes", className)}>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        {/* component content */}
      </CardContent>
    </Card>
  )
}
```

#### 3. TypeScript Standards
- **ALWAYS** use TypeScript for all files
- Define interfaces for all props and data structures
- Use `type` for unions, `interface` for object shapes
- Enable strict mode in tsconfig.json
- Use proper type annotations for functions

#### 4. Styling Guidelines
- **PRIMARY**: Use shadcn/ui components
- **SECONDARY**: Use Tailwind CSS utility classes
- **AVOID**: Custom CSS files (use Tailwind instead)
- Use the shadcn/ui design tokens and CSS variables
- Implement dark mode using the shadcn/ui theming system

### 🎨 Design System

#### Color Palette (shadcn/ui default)
- **Primary**: Blue scale for main brand elements
- **Secondary**: Slate scale for text and backgrounds
- **Accent**: Custom brand colors defined in CSS variables
- **Semantic**: Success (green), Warning (yellow), Destructive (red)

#### Typography
- **Headings**: Use shadcn/ui typography utilities
- **Body**: System font stack with proper fallbacks
- **Code**: Monospace font for technical content

#### Spacing & Layout
- **Container**: Use shadcn/ui container components
- **Grid**: CSS Grid and Flexbox via Tailwind
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### 📱 Static Site Requirements

#### 1. Next.js Configuration
```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
```

#### 2. Data Management
- **NO** database connections or server-side APIs
- Use static JSON files in `/data` directory
- Implement data fetching at build time only
- Use `generateStaticParams` for dynamic routes

#### 3. Forms & Interactions
- **Contact Forms**: Use Formspree, Netlify Forms, or EmailJS
- **Search**: Implement client-side search with Fuse.js
- **State Management**: React Context or Zustand for client state
- **NO** server actions or API routes

### 🏗️ Component Library

#### Core Components to Build
1. **Layout Components**
   - Header with navigation
   - Footer with links and contact info
   - PageWrapper for consistent spacing

2. **Content Components**
   - HeroSection with CTA buttons
   - ProgramCard for course listings
   - TestimonialCard for student stories
   - InstructorCard for teacher profiles
   - BlogCard for resource articles

3. **Interactive Components**
   - ContactForm with validation
   - NewsletterSignup
   - SearchBar for content
   - FilterTabs for programs

4. **UI Elements**
   - Custom buttons extending shadcn/ui Button
   - Loading spinners and skeletons
   - Image galleries and carousels
   - Animated counters for statistics

### 🌐 Content Strategy

#### 1. Multilingual Support
- Use next-intl or react-i18next
- Store translations in JSON files
- Support English and Khmer languages
- Implement language switcher in header

#### 2. SEO Optimization
- Use Next.js built-in SEO features
- Implement proper meta tags and Open Graph
- Generate XML sitemap at build time
- Use structured data for rich snippets

#### 3. Content Management
- Store all content in structured JSON/Markdown files
- Use TypeScript interfaces for content types
- Implement content validation with Zod schemas

### 🚀 Performance Guidelines

#### 1. Image Optimization
- Use Next.js Image component with `unoptimized: true`
- Implement proper alt texts for accessibility
- Use WebP format where possible
- Lazy load images below the fold

#### 2. Code Splitting
- Use dynamic imports for heavy components
- Implement route-based code splitting
- Lazy load non-critical UI components

#### 3. Bundle Optimization
- Analyze bundle size regularly
- Tree-shake unused dependencies
- Use production builds for deployment

### 📋 Development Workflow

#### 1. Component Development Order
1. Start with shadcn/ui base components
2. Create layout components (Header, Footer)
3. Build page sections (Hero, Programs, etc.)
4. Implement forms and interactions
5. Add animations and polish

#### 2. Testing Strategy
- Use React Testing Library for unit tests
- Implement accessibility testing
- Test responsive design across devices
- Validate forms and user interactions

#### 3. Code Quality
- Use ESLint with TypeScript rules
- Implement Prettier for code formatting
- Use Husky for pre-commit hooks
- Follow conventional commit messages

### 🌟 Seksaa Tech Academy Specific

#### 1. Brand Guidelines
- **Colors**: Professional tech-focused palette
- **Typography**: Modern, readable fonts
- **Voice**: Encouraging, professional, accessible
- **Imagery**: Students, technology, success stories

#### 2. Content Requirements
- **Programs**: Robotics, AI, Data Engineering, DevOps, UX/UI
- **Languages**: English primary, Khmer secondary
- **Target Audience**: Working professionals seeking part-time tech education
- **Key Messages**: Career transformation, practical skills, job placement success

#### 3. Key Features to Prioritize
- Program showcase with clear career outcomes
- Student success stories with quantifiable results
- Instructor profiles with industry credentials
- Flexible scheduling for working professionals
- Clear enrollment process with multiple contact options

## 🔧 Common Commands

```bash
# Install shadcn/ui components
npx shadcn-ui@latest add button card input form

# Run development server
npm run dev

# Build static site
npm run build
npm run export

# Deploy to S3 (after AWS CLI setup)
aws s3 sync ./out s3://your-bucket-name --delete

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🚫 What NOT to Do

- **NO** server-side APIs or backend logic
- **NO** database connections or ORMs
- **NO** authentication systems (static site)
- **NO** server actions or middleware
- **NO** real-time features requiring WebSockets
- **NO** custom CSS files (use Tailwind + shadcn/ui)
- **NO** jQuery or other legacy libraries

## ✅ Best Practices

- **DO** use TypeScript for all files
- **DO** follow shadcn/ui component patterns
- **DO** implement proper error boundaries
- **DO** optimize for mobile-first design
- **DO** use semantic HTML for accessibility
- **DO** implement proper loading states
- **DO** test across different browsers
- **DO** validate all forms with Zod schemas
- **DO** use proper TypeScript types throughout
- **DO** implement proper SEO meta tags

---

**Remember**: This is a static site showcasing Seksaa Tech Academy's programs and success stories. Focus on performance, accessibility, and compelling content presentation. 