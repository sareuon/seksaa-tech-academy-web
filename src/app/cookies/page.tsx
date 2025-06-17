import type { Metadata } from "next"
import { SITE_CONFIG } from "@/constants"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Information about how we use cookies on our website."
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Cookie Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              This Cookie Policy explains how {SITE_CONFIG.name} uses cookies and similar technologies.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">What are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
              <p>We use cookies for the following purposes:</p>
              <ul className="list-disc pl-6 mt-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and settings</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
              <p>
                You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience 
                and parts of our website may no longer be fully accessible.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have any questions about our Cookie Policy, please contact us at{" "}
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