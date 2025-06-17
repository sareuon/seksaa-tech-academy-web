import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ContactForm } from "@/components/forms/contact-form"
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar } from "lucide-react"

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-orange-50">
        <div className="absolute inset-0 circuit-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <h1 className="heading-xl mb-6">
              <span className="text-gradient">Get in Touch</span>
            </h1>
            <div className="section-divider"></div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to transform your career? We are here to help you choose the right program and answer all your questions.
              <br className="hidden md:block" />
              <span className="text-brand-600 font-semibold">Contact us today to start your tech journey.</span>
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-4">
                  Speak directly with our admissions team
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-brand-600">+855 12 345 678</p>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 9 AM - 6 PM</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-4">
                  Send us your questions anytime
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-brand-600">info@seksaatech.com</p>
                  <p className="text-sm text-muted-foreground">Response within 2 hours</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Us</h3>
                <p className="text-muted-foreground mb-4">
                  Come see our campus and facilities
                </p>
                <div className="space-y-1">
                  <p className="font-medium text-brand-600">Phnom Penh, Cambodia</p>
                  <p className="text-sm text-muted-foreground">By appointment</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Additional Information */}
          <div className="space-y-8">
            {/* Office Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-500" />
                  Office Hours
                </CardTitle>
                <CardDescription>
                  When you can reach us
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">Closed</span>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    <strong>Note:</strong> We also offer evening consultations by appointment for working professionals.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-brand-500" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Common requests and quick links
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <a 
                    href="/programs" 
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-brand-600">View All Programs</div>
                      <div className="text-sm text-muted-foreground">Browse our course offerings</div>
                    </div>
                    <span className="text-2xl">📚</span>
                  </a>
                  
                  <a 
                    href="/enroll" 
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-brand-600">Start Enrollment</div>
                      <div className="text-sm text-muted-foreground">Apply for a program</div>
                    </div>
                    <span className="text-2xl">🚀</span>
                  </a>
                  
                  <a 
                    href="/instructors" 
                    className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group"
                  >
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-brand-600">Meet Our Instructors</div>
                      <div className="text-sm text-muted-foreground">Learn about our expert team</div>
                    </div>
                    <span className="text-2xl">👨‍🏫</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Consultation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brand-500" />
                  Schedule a Consultation
                </CardTitle>
                <CardDescription>
                  Book a one-on-one session with our admissions team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Get personalized advice about which program is right for you, discuss career goals, and learn about our job placement support.
                  </p>
                  
                  <div className="bg-brand-50 rounded-lg p-4">
                    <h4 className="font-semibold text-brand-900 mb-2">What to expect:</h4>
                    <ul className="space-y-1 text-sm text-brand-700">
                      <li>• 30-minute personalized consultation</li>
                      <li>• Program recommendations based on your goals</li>
                      <li>• Career path planning and salary expectations</li>
                      <li>• Flexible scheduling options</li>
                    </ul>
                  </div>
                  
                  <div className="text-center">
                    <a 
                      href="mailto:admissions@seksaatech.com?subject=Consultation Request"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      Book Consultation
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">
              <span className="text-gradient">Frequently Asked Questions</span>
            </h2>
            <div className="section-divider"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Quick answers to common questions about our programs and enrollment process
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">How long are the programs?</h3>
                <p className="text-muted-foreground">
                  Our programs range from 12-20 weeks depending on the specialization. All programs are part-time with evening and weekend classes to accommodate working professionals.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What are the prerequisites?</h3>
                <p className="text-muted-foreground">
                  Basic computer literacy and high school education. Some programs may require specific background knowledge, which we will assess during the consultation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Do you offer job placement assistance?</h3>
                <p className="text-muted-foreground">
                  Yes! We have a 100% job placement rate. Our career services include resume building, interview preparation, and direct connections with hiring partners.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What payment options are available?</h3>
                <p className="text-muted-foreground">
                  We offer full payment with early bird discounts and flexible monthly installment plans. Financial aid and scholarships may be available for qualified students.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Can I work while studying?</h3>
                <p className="text-muted-foreground">
                  Absolutely! Our programs are designed for working professionals with classes scheduled in the evenings and weekends to fit your work schedule.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What happens after graduation?</h3>
                <p className="text-muted-foreground">
                  You will receive a certificate of completion and lifetime access to our alumni network, job board, and continued career support services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 circuit-pattern opacity-10"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-brand-100 mb-8 max-w-2xl mx-auto">
              Our admissions team is here to help you make the best decision for your career transformation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+85512345678"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 hover:bg-gray-100 rounded-lg transition-colors font-medium"
              >
                <Phone className="h-4 w-4" />
                Call Now: +855 12 345 678
              </a>
              <a 
                href="mailto:info@seksaatech.com"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white text-white hover:bg-white hover:text-brand-700 rounded-lg transition-colors font-medium"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 