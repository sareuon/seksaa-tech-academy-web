import faqData from '@/data/faq.json'
import programsData from '@/data/programs.json'
import instructorsData from '@/data/instructors.json'
import blogPostsData from '@/data/blog-posts.json'
import testimonialsData from '@/data/testimonials.json'

describe('Data Validation Tests', () => {
  describe('FAQ Data', () => {
    it('should have valid FAQ structure', () => {
      expect(faqData).toHaveProperty('faqs')
      expect(Array.isArray(faqData.faqs)).toBe(true)
      expect(faqData.faqs.length).toBeGreaterThan(0)
    })

    it('should have required FAQ fields', () => {
      faqData.faqs.forEach((faq, index) => {
        expect(faq).toHaveProperty('id', expect.any(Number))
        expect(faq).toHaveProperty('question')
        expect(faq).toHaveProperty('answer')
        expect(faq).toHaveProperty('category')
        expect(faq).toHaveProperty('featured', expect.any(Boolean))
        expect(faq).toHaveProperty('order', expect.any(Number))
        expect(faq).toHaveProperty('tags', expect.any(Array))

        // Validate multilingual content
        expect(faq.question).toHaveProperty('en', expect.any(String))
        expect(faq.question).toHaveProperty('km', expect.any(String))
        expect(faq.answer).toHaveProperty('en', expect.any(String))
        expect(faq.answer).toHaveProperty('km', expect.any(String))

        // Validate content is not empty
        expect(faq.question.en.trim()).not.toBe('')
        expect(faq.question.km.trim()).not.toBe('')
        expect(faq.answer.en.trim()).not.toBe('')
        expect(faq.answer.km.trim()).not.toBe('')

        // Validate category is one of expected values
        const validCategories = ['general', 'programs', 'enrollment', 'payment', 'career', 'technical']
        expect(validCategories).toContain(faq.category)
      })
    })

    it('should have unique FAQ IDs', () => {
      const ids = faqData.faqs.map(faq => faq.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should have at least some featured FAQs', () => {
      const featuredFaqs = faqData.faqs.filter(faq => faq.featured)
      expect(featuredFaqs.length).toBeGreaterThan(0)
      expect(featuredFaqs.length).toBeLessThanOrEqual(6) // Reasonable limit
    })
  })

  describe('Programs Data', () => {
    it('should have valid programs structure', () => {
      expect(programsData).toHaveProperty('programs')
      expect(Array.isArray(programsData.programs)).toBe(true)
      expect(programsData.programs.length).toBeGreaterThan(0)
    })

    it('should have required program fields', () => {
      programsData.programs.forEach((program) => {
        expect(program).toHaveProperty('id', expect.any(String))
        expect(program).toHaveProperty('title')
        expect(program).toHaveProperty('shortDescription')
        expect(program).toHaveProperty('duration', expect.any(String))
        expect(program).toHaveProperty('level', expect.any(String))
        expect(program).toHaveProperty('format', expect.any(String))

        // Validate multilingual content
        expect(program.title).toHaveProperty('en', expect.any(String))
        expect(program.title).toHaveProperty('km', expect.any(String))
        expect(program.shortDescription).toHaveProperty('en', expect.any(String))
        expect(program.shortDescription).toHaveProperty('km', expect.any(String))
      })
    })

    it('should have unique program IDs', () => {
      const ids = programsData.programs.map(program => program.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe('Instructors Data', () => {
    it('should have valid instructors structure', () => {
      expect(instructorsData).toHaveProperty('instructors')
      expect(Array.isArray(instructorsData.instructors)).toBe(true)
      expect(instructorsData.instructors.length).toBeGreaterThan(0)
    })

    it('should have required instructor fields', () => {
      instructorsData.instructors.forEach((instructor) => {
        expect(instructor).toHaveProperty('id', expect.any(String))
        expect(instructor).toHaveProperty('name', expect.any(String))
        expect(instructor).toHaveProperty('title')
        expect(instructor).toHaveProperty('bio')
        expect(instructor).toHaveProperty('image', expect.any(String))
        expect(instructor).toHaveProperty('experience', expect.any(Number))
        expect(instructor).toHaveProperty('specialties', expect.any(Array))

        // Validate multilingual content
        expect(instructor.title).toHaveProperty('en', expect.any(String))
        expect(instructor.title).toHaveProperty('km', expect.any(String))
        expect(instructor.bio).toHaveProperty('en', expect.any(String))
        expect(instructor.bio).toHaveProperty('km', expect.any(String))

        // Validate experience is positive
        expect(instructor.experience).toBeGreaterThan(0)

        // Validate specialties array is not empty
        expect(instructor.specialties.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Blog Posts Data', () => {
    it('should have valid blog posts structure', () => {
      expect(blogPostsData).toHaveProperty('blogPosts')
      expect(Array.isArray(blogPostsData.blogPosts)).toBe(true)
    })

    it('should have required blog post fields when posts exist', () => {
      if (blogPostsData.blogPosts.length > 0) {
        blogPostsData.blogPosts.forEach((post: any) => {
          expect(post).toHaveProperty('id', expect.any(String))
          expect(post).toHaveProperty('title')
          expect(post).toHaveProperty('excerpt')
          expect(post).toHaveProperty('content')
          expect(post).toHaveProperty('author', expect.any(String))
          expect(post).toHaveProperty('publishedDate', expect.any(String))
          expect(post).toHaveProperty('category', expect.any(String))
          expect(post).toHaveProperty('tags', expect.any(Array))
          expect(post).toHaveProperty('featured', expect.any(Boolean))

          // Validate multilingual content
          expect(post.title).toHaveProperty('en', expect.any(String))
          expect(post.title).toHaveProperty('km', expect.any(String))
          expect(post.excerpt).toHaveProperty('en', expect.any(String))
          expect(post.excerpt).toHaveProperty('km', expect.any(String))

          // Validate date format (ISO string)
          expect(() => new Date(post.publishedDate)).not.toThrow()
          expect(new Date(post.publishedDate).toString()).not.toBe('Invalid Date')
        })
      }
    })
  })

  describe('Testimonials Data', () => {
    it('should have valid testimonials structure', () => {
      expect(testimonialsData).toHaveProperty('testimonials')
      expect(Array.isArray(testimonialsData.testimonials)).toBe(true)
      expect(testimonialsData.testimonials.length).toBeGreaterThan(0)
    })

    it('should have required testimonial fields', () => {
      testimonialsData.testimonials.forEach((testimonial: any) => {
        expect(testimonial).toHaveProperty('id', expect.any(String))
        expect(testimonial).toHaveProperty('rating', expect.any(Number))

        // Validate rating is between 1 and 5
        expect(testimonial.rating).toBeGreaterThanOrEqual(1)
        expect(testimonial.rating).toBeLessThanOrEqual(5)

        // Check for either student testimonials or instructor testimonials
        if ('studentName' in testimonial) {
          expect(testimonial).toHaveProperty('studentName', expect.any(String))
          expect(testimonial).toHaveProperty('testimonial')
          expect(testimonial.testimonial).toHaveProperty('en', expect.any(String))
          expect(testimonial.testimonial).toHaveProperty('km', expect.any(String))
        }
      })
    })
  })

  describe('Cross-Data Validation', () => {
    it('should have consistent multilingual structure across all data', () => {
      const datasets = [
        { name: 'FAQ', data: faqData.faqs },
        { name: 'Programs', data: programsData.programs },
        { name: 'Instructors', data: instructorsData.instructors },
        { name: 'Testimonials', data: testimonialsData.testimonials },
      ]

      datasets.forEach(({ name, data }) => {
        data.forEach((item: any) => {
          Object.keys(item).forEach(key => {
            if (typeof item[key] === 'object' && item[key] !== null && !Array.isArray(item[key])) {
              // Check if this looks like a multilingual object
              if ('en' in item[key] || 'km' in item[key]) {
                expect(item[key]).toHaveProperty('en', expect.any(String))
                expect(item[key]).toHaveProperty('km', expect.any(String))
              }
            }
          })
        })
      })
    })

    it('should have no empty required text fields', () => {
      const textFields = [
        ...faqData.faqs.map(faq => [faq.question.en, faq.question.km, faq.answer.en, faq.answer.km]),
        ...programsData.programs.map(program => [program.title.en, program.title.km, program.shortDescription.en, program.shortDescription.km]),
        ...instructorsData.instructors.map(instructor => [instructor.name, instructor.title.en, instructor.title.km]),
        ...testimonialsData.testimonials.filter((t: any) => 'studentName' in t).map((testimonial: any) => [testimonial.studentName, testimonial.testimonial.en, testimonial.testimonial.km]),
      ].flat()

      textFields.forEach(text => {
        expect(typeof text).toBe('string')
        expect(text.trim()).not.toBe('')
        expect(text.length).toBeGreaterThan(3) // Reasonable minimum length
      })
    })
  })
}) 