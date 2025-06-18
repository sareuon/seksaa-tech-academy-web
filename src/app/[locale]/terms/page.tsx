import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Calendar, 
  Scale, 
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Mail,
  Phone,
  MapPin
} from 'lucide-react'
import { getTermsOfService } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Terms of Service | Seksaa Tech Academy',
  description: 'Read the terms and conditions for using Seksaa Tech Academy services, including enrollment, payment, and student conduct policies.',
  keywords: 'terms of service, terms and conditions, legal, enrollment, Seksaa Tech Academy',
  openGraph: {
    title: 'Terms of Service | Seksaa Tech Academy',
    description: 'Terms and conditions for using our educational services and platform.',
    type: 'website'
  }
}

export default function TermsOfServicePage() {
  const termsOfService = getTermsOfService()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Scale className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-600 mb-6">
              Please read these terms carefully before using our services. By using Seksaa Tech Academy, you agree to these terms.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last updated: {formatDate(termsOfService.lastUpdated)}
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Version {termsOfService.version}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900 mb-2">Important Legal Notice</h3>
                <p className="text-amber-800 text-sm">
                  These terms constitute a legally binding agreement between you and Seksaa Tech Academy. 
                  Please read them carefully and contact us if you have any questions before enrolling in our programs.
                </p>
              </div>
            </div>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6">
            {termsOfService.sections.map((section, index) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="text-xl">
                    {index + 1}. {section.title.en}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {section.content.en}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Additional Terms */}
          <Card>
            <CardHeader>
              <CardTitle>5. Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  All course materials, content, and intellectual property provided by Seksaa Tech Academy remain our exclusive property. 
                  Students are granted a limited, non-transferable license to access and use materials solely for educational purposes during their enrollment period.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Seksaa Tech Academy's liability is limited to the amount paid for the specific program. We are not liable for indirect, 
                  incidental, or consequential damages. While we strive to provide quality education, we cannot guarantee specific career outcomes or employment.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Refund Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    Our refund policy is designed to be fair to both students and the academy:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Full Refund (100%)
                    </h4>
                    <p className="text-sm text-gray-600">
                      Available within 7 days of enrollment if no course materials have been accessed.
                    </p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Partial Refund (50%)
                    </h4>
                    <p className="text-sm text-gray-600">
                      Available within 14 days of enrollment if less than 25% of the course has been completed.
                    </p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Refunds are processed within 5-10 business days. Administrative fees may apply for payment processing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Privacy and Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  Your privacy is important to us. Our collection, use, and protection of personal information is governed by our Privacy Policy. 
                  By using our services, you consent to the collection and use of information as described in our Privacy Policy.
                </p>
                <div className="mt-4">
                  <Button variant="outline" asChild>
                    <Link href="/privacy">
                      <FileText className="h-4 w-4 mr-2" />
                      Read Privacy Policy
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Modifications to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. 
                  Continued use of our services after changes constitutes acceptance of the modified terms. We will notify enrolled students of significant changes via email.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>10. Governing Law and Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  These terms are governed by the laws of Cambodia. Any disputes will be resolved through binding arbitration in Phnom Penh, Cambodia. 
                  Both parties agree to attempt mediation before pursuing arbitration.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Questions About These Terms?
              </CardTitle>
              <CardDescription>
                Contact us if you have any questions about these terms of service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-sm text-gray-600">legal@seksaatech.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-sm text-gray-600">+855 12 345 678</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Address</h4>
                    <p className="text-sm text-gray-600">
                      Phnom Penh, Cambodia
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t mt-6">
                <Button asChild>
                  <Link href="/contact">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Legal Team
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Links */}
          <Card>
            <CardHeader>
              <CardTitle>Related Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  href="/privacy" 
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-4 w-4 text-gray-600" />
                  <span>Privacy Policy</span>
                  <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
                </Link>
                <Link 
                  href={"/cookies" as any}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-4 w-4 text-gray-600" />
                  <span>Cookie Policy</span>
                  <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
                </Link>
                <Link 
                  href={"/code-of-conduct" as any}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Scale className="h-4 w-4 text-gray-600" />
                  <span>Code of Conduct</span>
                  <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Acceptance Notice */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-900 mb-2">Agreement Acknowledgment</h3>
                <p className="text-green-800 text-sm">
                  By enrolling in any Seksaa Tech Academy program or using our services, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, 
                  please do not use our services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 