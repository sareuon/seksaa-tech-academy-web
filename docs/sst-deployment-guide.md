# SST v3 Deployment Guide for Seksaa Tech Academy

## Overview
This guide covers deploying the Seksaa Tech Academy website using SST v3 (Serverless Stack) to AWS with CloudFront CDN distribution.

## Prerequisites

### 1. AWS Account Setup
- AWS Account with appropriate permissions
- AWS CLI installed and configured
- IAM role for GitHub Actions (for CI/CD)

### 2. Local Development Setup
- Node.js 18+ installed
- npm or yarn package manager
- SST CLI (installed as dev dependency)

## Initial Setup

### 1. AWS Configuration
```bash
# Configure AWS CLI (if not already done)
aws configure

# Or use AWS SSO
aws sso login
```

### 2. SST Authentication
```bash
# First time setup - authenticate with AWS
npx sst auth
```

## Deployment Commands

### Local Development
```bash
# Start local development with SST
npm run sst:dev
# or
yarn sst:dev
```

### Staging Deployment
```bash
# Deploy to staging environment
npm run deploy:staging
# or
yarn deploy:staging
```

### Production Deployment
```bash
# Deploy to production environment
npm run deploy:production
# or
yarn deploy:production
```

### Remove Deployment
```bash
# Remove a specific stage
npm run sst:remove
# or
yarn sst:remove
```

## Configuration

### SST Configuration (`sst.config.ts`)
The SST configuration includes:
- Next.js static site generation
- CloudFront CDN with optimized caching
- Custom error pages (404)
- HTTP/2 support
- Global distribution (US, Canada, Europe, Asia)
- Environment variables for production builds

### Custom Domain (Optional)
To add a custom domain, uncomment and configure in `sst.config.ts`:
```typescript
domain: {
  name: "seksaa-tech-academy.com",
  redirects: ["www.seksaa-tech-academy.com"],
}
```

## GitHub Actions CI/CD

### Required Secrets
Set these in your GitHub repository settings:

1. **AWS_ROLE_ARN**: IAM role ARN for GitHub Actions
   ```
   arn:aws:iam::YOUR_ACCOUNT_ID:role/GitHubActionsRole
   ```

### Workflow Triggers
- **Production**: Pushes to `main` branch
- **Staging**: Pushes to `staging` branch
- **Preview**: Pull requests (comment only)

### IAM Role Setup
Create an IAM role with these policies:
- `PowerUserAccess` (or more restrictive custom policy)
- Trust relationship with GitHub Actions OIDC

Example trust policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::YOUR_ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:YOUR_USERNAME/seksaa-tech-academy-web:ref:refs/heads/main"
        }
      }
    }
  ]
}
```

## Environment Variables

### Build-time Variables
Set in `sst.config.ts`:
- `NODE_ENV=production`
- `NEXT_TELEMETRY_DISABLED=1`

### Runtime Variables (if needed)
Add to the SST configuration for dynamic content:
```typescript
environment: {
  FORMSPREE_ENDPOINT: "https://formspree.io/f/YOUR_FORM_ID",
  GOOGLE_ANALYTICS_ID: "G-XXXXXXXXXX",
}
```

## Performance Optimizations

### CloudFront Settings
- **Compression**: Enabled for all content
- **Cache Policy**: Managed-CachingOptimized
- **HTTP Version**: HTTP/2
- **Price Class**: PriceClass_100 (global distribution)

### Next.js Optimizations
- Static site generation (SSG)
- Image optimization with WebP/AVIF
- Bundle analysis available (`npm run analyze`)
- Core Web Vitals optimization

## Monitoring and Maintenance

### Deployment Monitoring
```bash
# Check deployment status
npx sst status

# View logs
npx sst logs

# Open AWS console for the app
npx sst console
```

### Cost Optimization
- Static hosting on S3 (minimal cost)
- CloudFront CDN (pay-per-use)
- No server costs (static site)
- Estimated cost: $1-5/month for typical traffic

## Troubleshooting

### Common Issues

1. **Authentication Errors**
   ```bash
   # Re-authenticate with AWS
   npx sst auth
   ```

2. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

3. **Deployment Stuck**
   ```bash
   # Check CloudFormation stack status in AWS Console
   # Or force remove and redeploy
   npx sst remove --stage staging
   ```

### Logs and Debugging
```bash
# View SST logs
npx sst logs --stage production

# Enable debug mode
DEBUG=sst:* npx sst deploy
```

## Security Considerations

1. **IAM Permissions**: Use least-privilege access
2. **Secrets Management**: Use GitHub Secrets for sensitive data
3. **HTTPS**: Automatically enabled via CloudFront
4. **CORS**: Configured for static assets
5. **CSP Headers**: Consider adding via CloudFront functions

## Next Steps

1. **Custom Domain**: Configure DNS and SSL certificate
2. **Monitoring**: Set up CloudWatch alarms
3. **Backup**: Consider S3 versioning for the bucket
4. **CDN**: Optimize cache behaviors for your content
5. **Analytics**: Integrate deployment metrics

## Support and Resources

- [SST Documentation](https://sst.dev/docs)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

**Note**: This deployment setup provides enterprise-level infrastructure with global CDN distribution, automatic SSL, and optimized performance for the Seksaa Tech Academy website. 