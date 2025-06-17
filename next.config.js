/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  experimental: {
    typedRoutes: true
  },
  // Disable server-side features for static export
  env: {
    STATIC_EXPORT: 'true'
  }
}

export default nextConfig 