import type { Metadata } from "next"
import { SITE_CONFIG } from "@/constants"

export const metadata: Metadata = {
  title: "Code of Conduct",
  description: "Our community guidelines and code of conduct for all participants."
}

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Code of Conduct</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              Our commitment to providing a welcoming, inclusive, and harassment-free environment for everyone at {SITE_CONFIG.name}.
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Pledge</h2>
              <p>
                We pledge to make participation in our community a harassment-free experience for everyone, 
                regardless of age, body size, visible or invisible disability, ethnicity, sex characteristics, 
                gender identity and expression, level of experience, education, socio-economic status, 
                nationality, personal appearance, race, religion, or sexual identity and orientation.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Our Standards</h2>
              <p>Examples of behavior that contributes to a positive environment include:</p>
              <ul className="list-disc pl-6 mt-4">
                <li>Demonstrating empathy and kindness toward other people</li>
                <li>Being respectful of differing opinions, viewpoints, and experiences</li>
                <li>Giving and gracefully accepting constructive feedback</li>
                <li>Accepting responsibility and apologizing to those affected by our mistakes</li>
                <li>Focusing on what is best not just for us as individuals, but for the overall community</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Unacceptable Behavior</h2>
              <p>Examples of unacceptable behavior include:</p>
              <ul className="list-disc pl-6 mt-4">
                <li>Harassment, discrimination, or bullying in any form</li>
                <li>Trolling, insulting or derogatory comments, and personal attacks</li>
                <li>Public or private harassment</li>
                <li>Publishing others' private information without explicit permission</li>
                <li>Other conduct which could reasonably be considered inappropriate in a professional setting</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Reporting</h2>
              <p>
                If you experience or witness unacceptable behavior, please report it by contacting us at{" "}
                <a href={`mailto:conduct@${SITE_CONFIG.url.replace('https://', '')}`} className="text-primary hover:underline">
                  conduct@{SITE_CONFIG.url.replace('https://', '')}
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Enforcement</h2>
              <p>
                Violations of this Code of Conduct may result in temporary or permanent restrictions on participation 
                in our programs and community spaces.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                For questions about this Code of Conduct, please contact us at{" "}
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