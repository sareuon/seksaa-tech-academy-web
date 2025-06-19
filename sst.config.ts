// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "seksaa-tech-academy-web",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    // Create the Next.js static site
    const web = new sst.aws.Nextjs("SeksaaTechAcademy", {
      // Enable static export for the site
      build: {
        command: "npm run build",
      },
      // Custom domain configuration (optional - can be added later)
      // domain: {
      //   name: "seksaa-tech-academy.com",
      //   redirects: ["www.seksaa-tech-academy.com"],
      // },
      
      // Environment variables for the build
      environment: {
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1",
      },
      
      // CloudFront distribution settings
      transform: {
        distribution: {
          // Enable compression
          defaultCacheBehavior: {
            compress: true,
            // Cache static assets for longer
            cachePolicyId: "4135ea2d-6df8-44a3-9df3-4b5a84be39ad", // Managed-CachingOptimized
          },
          // Custom error pages
          customErrorResponses: [
            {
              errorCode: 404,
              responseCode: 404,
              responsePagePath: "/404.html",
            },
          ],
          // Enable HTTP/2
          httpVersion: "http2",
          // Price class for global distribution
          priceClass: "PriceClass_100", // US, Canada, Europe, Asia
        },
      },
    });

    // Return the URL for easy access
    return {
      url: web.url,
      domain: web.domain,
    };
  },
});
