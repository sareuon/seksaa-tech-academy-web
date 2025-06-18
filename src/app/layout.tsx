import type { Metadata } from "next"
import { SITE_CONFIG } from "@/constants"

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | Premier Tech Education in Cambodia`,
    template: `%s | ${SITE_CONFIG.name}`
  },
  description: SITE_CONFIG.description,
}

// Since we're using locale-based routing, this layout only wraps 
// the locale detection and redirection logic
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children;
} 