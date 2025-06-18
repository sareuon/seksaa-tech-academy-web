import type { Metadata } from "next"
import { SITE_CONFIG } from "@/constants"

export const metadata: Metadata = {
  title: "Security",
  description: "Information about our security measures and data protection."
}

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Security</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              At {SITE_CONFIG.name}, we take the security of your personal information seriously.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
              <p>
                We implement industry-standard security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 mt-4">
                <li>SSL/TLS encryption for all data transmissions</li>
                <li>Secure servers with regular security updates</li>
                <li>Access controls and authentication measures</li>
                <li>Regular security audits and assessments</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
              <p>
                Your personal data is stored securely on encrypted servers. We limit access to your information to authorized personnel only 
                and regularly monitor our systems for security threats.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Payment Security</h2>
              <p>
                All payment transactions are processed through secure payment gateways that comply with PCI DSS standards. 
                We do not store your payment card information on our servers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Reporting Security Issues</h2>
              <p>
                If you discover a security vulnerability, please report it to us immediately at{" "}
                <a href={`mailto:security@${SITE_CONFIG.url.replace('https://', '')}`} className="text-primary hover:underline">
                  security@{SITE_CONFIG.url.replace('https://', '')}
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                For security-related questions or concerns, please contact us at{" "}
                <a href={`mailto:${SITE_CONFIG.creator.toLowerCase().replace(/\s+/g, '')}@gmail.com`} className="text-primary hover:underline">
                  {SITE_CONFIG.creator.toLowerCase().replace(/\s+/g, '')}@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
} 