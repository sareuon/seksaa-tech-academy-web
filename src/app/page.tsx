import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProgramCard } from "@/components/ui/program-card"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { NewsletterSignup } from "@/components/forms/newsletter-signup"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import { getHomepageData, getLocalizedText } from "@/lib/data"
import ActivityGallery from "@/components/sections/activity-gallery"

export default function HomePage() {
  const { featuredPrograms, featuredTestimonials, statistics, siteInfo } = getHomepageData('en')
  
  return (
    <main>
      {/* Full Screen Hero Section - UW Style */}
      <section id="hero" className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-fixed"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(30, 41, 59, 0.4) 50%, rgba(249, 115, 22, 0.3) 100%), url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
            }}
          >
          </div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full">
          <div className="container mx-auto px-4" style={{ paddingTop: '84px' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              {/* Left Content */}
              <div className="text-white space-y-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                    Seksaa Tech Academy Reaches the Pinnacle of
                    <span className="block text-orange-400">Tech Education Excellence</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl leading-relaxed text-gray-100 max-w-2xl">
                    The leading tech academy in Cambodia is now recognized among the region's 
                    <strong className="text-orange-300"> top-tier institutions</strong>—driving innovation, 
                    discovery and opportunity for Southeast Asia and beyond.
                  </p>
                </div>
                
                <div className="pt-4">
                  <a 
                    href="#programs" 
                    className="inline-flex items-center gap-3 bg-navy-800 hover:bg-navy-900 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 shadow-2xl hover:shadow-orange-500/25"
                  >
                    <span>🚀</span>
                    DISCOVER PROGRAMS AT SEKSAA TECH
                  </a>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">{statistics.jobPlacementRate}%</div>
                    <div className="text-sm text-gray-300">Job Placement</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{statistics.totalGraduates}+</div>
                    <div className="text-sm text-gray-300">Graduates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400">5+</div>
                    <div className="text-sm text-gray-300">Years Excellence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm font-medium">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="relative bg-gradient-to-b from-navy-50 via-white to-orange-50/30 py-20">
        <div className="container mx-auto px-4">
          {/* Main Heading */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-bold text-navy-900 mb-6">
              Study at the<br />
              <span className="text-gradient">Seksaa Tech Academy</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Choose your path to success with our comprehensive tech education programs designed for the modern digital economy.
            </p>
          </div>

                    {/* Program Path Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Beginner Path */}
            <div className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-64 bg-gradient-to-br from-navy-500 to-navy-700 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-700/40 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white drop-shadow-lg">
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🚀</div>
                      <h3 className="text-2xl font-bold">Beginner</h3>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">Start Your Tech Journey</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Perfect for those new to technology. Our comprehensive beginner programs cover programming fundamentals, 
                    web development basics, and essential digital skills. No prior experience required.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Interested in flexible learning?</strong> Check out our part-time evening and weekend programs!
                  </p>
                  <a href="/programs" className="inline-flex items-center gap-2 bg-navy-700 text-white px-6 py-3 rounded-lg hover:bg-navy-800 transition-colors font-semibold">
                    Explore Beginner Programs
                  </a>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-navy-900 mb-3">Student Resources</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Coding Fundamentals</li>
                      <li>• Career Guidance</li>
                      <li>• Mentorship Program</li>
                      <li>• Industry Certifications</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Path */}
            <div className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-64 bg-gradient-to-br from-orange-500 to-orange-600 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-900/80 via-orange-600/40 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white drop-shadow-lg">
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
                      <h3 className="text-2xl font-bold">Advanced</h3>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">Professional Development</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Take your skills to the next level with advanced programs in AI, Data Science, DevOps, and specialized frameworks. 
                    Perfect for professionals looking to upskill or transition careers.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Want to specialize?</strong> Our advanced tracks include AI, blockchain, and cloud computing!
                  </p>
                  <a href="/programs" className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold">
                    Find Advanced Programs
                  </a>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-navy-900 mb-3">Student Resources</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Industry Projects</li>
                      <li>• Job Placement Support</li>
                      <li>• Professional Network</li>
                      <li>• Continuing Education</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Path */}
            <div className="group">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="relative h-64 bg-gradient-to-br from-navy-600 to-orange-500 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-600/40 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white drop-shadow-lg">
                      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🏢</div>
                      <h3 className="text-2xl font-bold">Corporate</h3>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-navy-900 mb-4">Corporate Training</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Customized training solutions for businesses and organizations. We work with companies to upskill their teams 
                    with cutting-edge technology training tailored to their specific industry needs.
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    <strong>Need team training?</strong> We offer on-site and remote corporate training programs!
                  </p>
                  <a href="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-navy-700 to-orange-500 text-white px-6 py-3 rounded-lg hover:from-navy-800 hover:to-orange-600 transition-all font-semibold">
                    Learn More
                  </a>
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <h4 className="font-semibold text-navy-900 mb-3">Corporate Resources</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Custom Curriculum</li>
                      <li>• Team Assessments</li>
                      <li>• Flexible Scheduling</li>
                      <li>• Progress Tracking</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Campus Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-navy-900 mb-6">
                  Visit Our Campus or<br />
                  Take a Virtual Tour
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  A campus visit can help you see all that Seksaa Tech Academy has to offer, including our modern labs, 
                  collaborative spaces, industry-standard equipment and many other amazing features.
                </p>
                <p className="text-muted-foreground mb-8">
                  You can also sign up for an <strong>in-person campus visit</strong> in beautiful Phnom Penh, Cambodia.
                </p>
                <a href="/contact" className="inline-flex items-center gap-2 bg-navy-700 text-white px-8 py-4 rounded-lg hover:bg-navy-800 transition-colors font-semibold text-lg">
                  📍 Begin Your Virtual Tour
                </a>
              </div>
              <div className="relative">
                <div className="aspect-video bg-gradient-to-br from-navy-100 to-orange-100 rounded-xl overflow-hidden relative group cursor-pointer hover:shadow-2xl transition-all duration-300">
                  {/* Background Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80')`
                    }}
                  ></div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-700/50 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      {/* Play Button */}
                      <div className="mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto group-hover:bg-white/30 transition-colors duration-300 border-2 border-white/30">
                          <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                        </div>
                      </div>
                      
                      {/* Text */}
                      <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">Campus Virtual Tour</h3>
                      <p className="text-white/90 text-sm mb-4 drop-shadow-md">Interactive 360° Experience</p>
                      
                      {/* Features */}
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                          <div className="font-semibold">Modern Labs</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                          <div className="font-semibold">Tech Equipment</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                          <div className="font-semibold">Study Spaces</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
                          <div className="font-semibold">Collaboration Areas</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    360° View
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 text-center">
            <div>
              <div className="text-3xl font-bold text-navy-900 mb-2">{statistics.jobPlacementRate}%</div>
              <div className="text-sm text-muted-foreground">Job Placement Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">{statistics.totalBootcamps}</div>
              <div className="text-sm text-muted-foreground">Successful Programs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-navy-900 mb-2">{statistics.totalGraduates}+</div>
              <div className="text-sm text-muted-foreground">Students Graduated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Preview */}
      <section id="programs" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4">
            <span className="tech-gradient">Featured Programs</span>
          </h2>
          <div className="section-divider"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose from our industry-leading programs designed by tech experts and employers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
        
        {featuredPrograms.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No featured programs available at the moment.</p>
          </div>
        )}
      </section>

      {/* Activity Gallery Section */}
      <ActivityGallery 
        title="Learning in Action" 
        description="See our students and instructors in action at Seksaa Tech Academy - real classroom experiences that prepare you for your tech career"
        showAll={true}
      />

      {/* Success Stats */}
      <section id="success-stories" className="container mx-auto px-4 py-20">
        <div className="glass-effect rounded-2xl p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 via-orange-500/5 to-purple-500/10"></div>
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="heading-lg mb-4">
                <span className="text-gradient">Proven Success</span>
              </h2>
              <div className="section-divider"></div>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our track record speaks for itself - transforming careers since 2019
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="stat-number mb-4">{statistics.jobPlacementRate}%</div>
                <div className="text-muted-foreground font-medium">Job Placement Rate</div>
                <div className="mt-2 text-sm text-muted-foreground/80">Every graduate finds employment</div>
              </div>
              <div className="text-center group">
                <div className="stat-number mb-4">{statistics.totalBootcamps}</div>
                <div className="text-muted-foreground font-medium">Successful Bootcamps</div>
                <div className="mt-2 text-sm text-muted-foreground/80">Completed with excellent outcomes</div>
              </div>
              <div className="text-center group">
                <div className="stat-number mb-4">{statistics.totalGraduates}+</div>
                <div className="text-muted-foreground font-medium">Students Graduated</div>
                <div className="mt-2 text-sm text-muted-foreground/80">Now working in tech companies</div>
              </div>
            </div>
            
            {/* Success Stories Carousel Preview */}
            <div className="mt-16">
              <h3 className="text-2xl font-bold text-center mb-8">What Our Graduates Say</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredTestimonials.slice(0, 2).map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
              
              {featuredTestimonials.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No testimonials available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container mx-auto px-4 py-20">
        <div className="relative">
          <div className="gradient-bg rounded-2xl p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 circuit-pattern opacity-5"></div>
            <div className="relative z-10">
              <h2 className="heading-lg mb-4">
                <span className="text-gradient">Ready to Transform Your Career?</span>
              </h2>
              <div className="section-divider"></div>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of successful graduates who have transformed their careers with our proven tech programs.
                <br />
                <span className="text-brand-600 font-semibold">Start your journey today!</span>
              </p>
              
              {/* Contact Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-3">📞</div>
                  <h3 className="font-semibold mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground">+855 12 345 678</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-3">📧</div>
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-sm text-muted-foreground">info@seksaatech.com</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <div className="text-3xl mb-3">📍</div>
                  <h3 className="font-semibold mb-2">Visit Us</h3>
                  <p className="text-sm text-muted-foreground">Phnom Penh, Cambodia</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#enroll" className="btn-primary-enhanced glow-on-hover interactive-hover">
                  🚀 Start Your Journey
                </a>
                <WhatsAppButton message="Hi! I'm interested in learning more about your tech programs and would like to speak with someone." className="btn-secondary-enhanced">
                  💬 Chat on WhatsApp
                </WhatsAppButton>
              </div>
              
              {/* Social Proof */}
              <div className="mt-12 pt-8 border-t border-white/20">
                <p className="text-sm text-muted-foreground mb-4">Follow us on social media for updates</p>
                <div className="flex justify-center gap-4">
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-lg">📱</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-lg">📘</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <span className="text-lg">📷</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enrollment Section */}
      <section id="enroll" className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="heading-lg mb-4">
            <span className="text-gradient">Enroll Now</span>
          </h2>
          <div className="section-divider"></div>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Take the first step towards your new career. Classes start every month.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Newsletter Signup */}
            <NewsletterSignup 
              title="Stay Updated"
              description="Get the latest updates on programs, tech trends, and career opportunities."
              showProgramInterests={true}
              showNameField={true}
            />
            
            {/* Quick Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle>Ready to Start?</CardTitle>
                <CardDescription>
                  Choose how you'd like to get started with your tech career transformation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <WhatsAppButton 
                  message="Hi! I'd like to enroll in one of your tech programs. Can you help me choose the right one?"
                  className="w-full"
                >
                  💬 Enroll via WhatsApp
                </WhatsAppButton>
                
                <a 
                  href="/contact" 
                  className="w-full inline-flex items-center justify-center px-4 py-2 border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white rounded-lg transition-colors"
                >
                  📧 Contact Form
                </a>
                
                <a 
                  href="tel:+85512345678" 
                  className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  📞 Call Now: +855 12 345 678
                </a>
                
                <div className="text-center pt-4 border-t">
                  <p className="text-sm text-muted-foreground mb-2">
                    Free consultation available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    No commitment required • Speak with our career advisors
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  )
} 