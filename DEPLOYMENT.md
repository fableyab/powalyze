# Deployment Guide - Powalyze

## Vercel Deployment (Recommended)

### Prerequisites
- Node.js 18+ installed
- Vercel account (free tier available)
- Supabase project configured

### Quick Deploy

#### Option 1: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# For production deployment
vercel --prod
```

#### Option 2: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel will auto-detect Vite configuration
5. Add environment variables (see below)
6. Click "Deploy"

### Environment Variables

Configure these in Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_OPENAI_API_KEY=your_openai_key (optional)
VITE_POWERBI_CLIENT_ID=your_client_id (optional)
VITE_POWERBI_TENANT_ID=your_tenant_id (optional)
NODE_ENV=production
```

### Build Configuration

The project is configured with:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Post-Deployment Checklist

1. ✅ Verify all environment variables are set
2. ✅ Test Supabase connection
3. ✅ Check all routes work (SPA routing)
4. ✅ Verify assets load correctly
5. ✅ Test authentication flow
6. ✅ Configure custom domain (optional)

### Troubleshooting

#### Build Fails
- Check Node.js version (requires 18+)
- Verify all dependencies in package.json
- Review build logs in Vercel dashboard

#### Routes Don't Work
- Ensure vercel.json has correct rewrites configuration
- Check that outputDirectory is set to "dist"

#### Environment Variables Not Working
- Prefix all client-side variables with `VITE_`
- Redeploy after adding/changing variables

### Alternative Deployment Options

#### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

#### GitHub Pages
```bash
npm run build
# Then push dist folder to gh-pages branch
```

#### Self-Hosted (Docker)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## Continuous Deployment

### GitHub Actions (Auto-deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Support

For issues, check:
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Supabase Documentation](https://supabase.com/docs)
