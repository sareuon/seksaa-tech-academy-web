import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  FileText, 
  Calendar, 
  Mail, 
  Download,
  ExternalLink,
  Info,
  Lock,
  Eye,
  Trash2,
  Edit,
  Share2
} from 'lucide-react'
import { getPrivacyPolicy, getGDPRCompliance } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Privacy Policy | Seksaa Tech Academy',
  description: 'Learn how Seksaa Tech Academy collects, uses, and protects your personal information. GDPR compliant privacy policy.',
  keywords: 'privacy policy, data protection, GDPR, personal information, Seksaa Tech Academy',
  openGraph: {
    title: 'Privacy Policy | Seksaa Tech Academy',
    description: 'Learn how we protect your personal information and comply with GDPR regulations.',
    type: 'website'
  }
}

export default function PrivacyPolicyPage() {
  const privacyPolicy = getPrivacyPolicy()
  const gdprCompliance = getGDPRCompliance()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getRightIcon = (right: string) => {
    const icons = {
      right_to_access: Eye,
      right_to_rectification: Edit,
      right_to_erasure: Trash2,
      right_to_restrict_processing: Lock,
      right_to_data_portability: Download,
      right_to_object: Shield,
      right_to_withdraw_consent: Share2
    }
    return icons[right as keyof typeof icons] || Info
  }

  const getRightName = (right: string) => {
    const names = {
      right_to_access: 'Right to Access',
      right_to_rectification: 'Right to Rectification',
      right_to_erasure: 'Right to Erasure (Right to be Forgotten)',
      right_to_restrict_processing: 'Right to Restrict Processing',
      right_to_data_portability: 'Right to Data Portability',
      right_to_object: 'Right to Object',
      right_to_withdraw_consent: 'Right to Withdraw Consent'
    }
    return names[right as keyof typeof names] || right
  }

  const getRightDescription = (right: string) => {
    const descriptions = {
      right_to_access: 'You have the right to request access to your personal data and receive information about how we process it.',
      right_to_rectification: 'You have the right to request correction of inaccurate or incomplete personal data.',
      right_to_erasure: 'You have the right to request deletion of your personal data under certain circumstances.',
      right_to_restrict_processing: 'You have the right to request restriction of processing of your personal data.',
      right_to_data_portability: 'You have the right to receive your personal data in a structured, machine-readable format.',
      right_to_object: 'You have the right to object to processing of your personal data for certain purposes.',
      right_to_withdraw_consent: 'You have the right to withdraw your consent at any time where processing is based on consent.'
    }
    return descriptions[right as keyof typeof descriptions] || 'Your data protection right'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-600 mb-6">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Last updated: {formatDate(privacyPolicy.lastUpdated)}
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Version {privacyPolicy.version}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Quick Actions
              </CardTitle>
              <CardDescription>
                Common privacy-related actions you can take
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Download className="h-5 w-5" />
                  <span className="font-medium">Download Your Data</span>
                  <span className="text-xs text-gray-600 text-center">
                    Get a copy of all your personal data
                  </span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Edit className="h-5 w-5" />
                  <span className="font-medium">Update Information</span>
                  <span className="text-xs text-gray-600 text-center">
                    Correct or update your personal data
                  </span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
                  <Trash2 className="h-5 w-5" />
                  <span className="font-medium">Delete Account</span>
                  <span className="text-xs text-gray-600 text-center">
                    Request deletion of your account
                  </span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Policy Sections */}
          <div className="space-y-6">
            {privacyPolicy.sections.map((section, index) => (
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

          {/* GDPR Rights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Your Rights Under GDPR
              </CardTitle>
              <CardDescription>
                As a data subject, you have the following rights regarding your personal data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {gdprCompliance.dataSubjectRights.map((right) => {
                  const IconComponent = getRightIcon(right)
                  return (
                    <div key={right} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            {getRightName(right)}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {getRightDescription(right)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Data Processing Basis */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Basis for Processing</CardTitle>
              <CardDescription>
                We process your personal data based on the following legal grounds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gdprCompliance.dataProcessingBasis.map((basis, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Badge variant="secondary" className="mt-1">
                      {basis.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                    <p className="text-sm text-gray-700">{basis.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Data Retention Periods</CardTitle>
              <CardDescription>
                How long we keep different types of personal data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(gdprCompliance.dataRetention).map(([dataType, period]) => (
                  <div key={dataType} className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium capitalize">
                      {dataType.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <Badge variant="outline">{period}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Us About Privacy
              </CardTitle>
              <CardDescription>
                Have questions about your privacy or want to exercise your rights?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Data Protection Officer</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Email: dpo@seksaatech.com</p>
                      <p>Phone: +855 12 345 679</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">General Privacy Inquiries</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Email: privacy@seksaatech.com</p>
                      <p>Response time: Within 30 days</p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button asChild>
                    <Link href="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Links */}
          <Card>
            <CardHeader>
              <CardTitle>Related Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  href="/terms" 
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-4 w-4 text-gray-600" />
                  <span>Terms of Service</span>
                  <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
                </Link>
                <Link 
                  href={"/cookies" as any}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Shield className="h-4 w-4 text-gray-600" />
                  <span>Cookie Policy</span>
                  <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
                </Link>
                <Link 
                  href={"/security" as any}
                  className="flex items-center gap-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Lock className="h-4 w-4 text-gray-600" />
                  <span>Security Measures</span>
                  <ExternalLink className="h-3 w-3 text-gray-400 ml-auto" />
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-900 mb-2">GDPR Compliance</h3>
                <p className="text-blue-800 text-sm">
                  This privacy policy complies with the General Data Protection Regulation (GDPR) and other applicable data protection laws. 
                  We are committed to protecting your privacy and ensuring transparent data processing practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 