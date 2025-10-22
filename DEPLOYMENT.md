# 🚀 Deployment Guide - Masrouf Ashahr

## Environment Overview

### 🌱 **Development Environment**
- **Branch:** `development`
- **Purpose:** Active development and testing
- **URL:** `https://masrouf-ashahr-dev.vercel.app`
- **Database:** Development Supabase instance
- **Features:** Hot reload, debug mode, experimental features

### 🧪 **Staging Environment**
- **Branch:** `staging`
- **Purpose:** Pre-production testing and QA
- **URL:** `https://masrouf-ashahr-staging.vercel.app`
- **Database:** Production Supabase instance (test data)
- **Features:** Production-like environment, final testing

### 🚀 **Production Environment**
- **Branch:** `main`
- **Purpose:** Live application for users
- **URL:** `https://masrouf-ashahr.vercel.app`
- **Database:** Production Supabase instance
- **Features:** Optimized, stable, monitored

## Branch Strategy

```
main (production)
├── staging (pre-production)
└── development (active development)
```

## Deployment Workflow

### 1. Development → Staging
```bash
# Switch to development branch
git checkout development

# Make your changes
git add .
git commit -m "feat: new feature"
git push origin development

# Merge to staging
git checkout staging
git merge development
git push origin staging
```

### 2. Staging → Production
```bash
# After testing in staging
git checkout main
git merge staging
git push origin main
```

## Vercel Environment Configuration

### Development Environment
- **Branch:** `development`
- **Domain:** `masrouf-ashahr-dev.vercel.app`
- **Environment Variables:**
  - `NEXT_PUBLIC_APP_ENV=development`
  - `NODE_ENV=development`

### Staging Environment
- **Branch:** `staging`
- **Domain:** `masrouf-ashahr-staging.vercel.app`
- **Environment Variables:**
  - `NEXT_PUBLIC_APP_ENV=staging`
  - `NODE_ENV=production`

### Production Environment
- **Branch:** `main`
- **Domain:** `masrouf-ashahr.vercel.app`
- **Environment Variables:**
  - `NEXT_PUBLIC_APP_ENV=production`
  - `NODE_ENV=production`

## Environment Variables Setup

### Required Variables for All Environments:
```
NEXT_PUBLIC_SUPABASE_URL=https://brmfcprurncpywpyayns.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ADMIN_DASH_TOKEN=116479d269cbfe2fa568721f545ba5402dbf8
NEXT_PUBLIC_ADMIN_DASH_TOKEN=116479d269cbfe2fa568721f545ba5402dbf8
WHATSAPP_NUMBER=+213123456789
```

## Deployment Commands

### Deploy to Development
```bash
git checkout development
git push origin development
# Vercel automatically deploys from development branch
```

### Deploy to Staging
```bash
git checkout staging
git push origin staging
# Vercel automatically deploys from staging branch
```

### Deploy to Production
```bash
git checkout main
git push origin main
# Vercel automatically deploys from main branch
```

## Monitoring and Maintenance

### Development
- ✅ Hot reload enabled
- ✅ Debug logs enabled
- ✅ Experimental features allowed
- ⚠️ Not for production use

### Staging
- ✅ Production-like environment
- ✅ Full testing before production
- ✅ Performance monitoring
- ⚠️ Test data only

### Production
- ✅ Optimized builds
- ✅ Error monitoring
- ✅ Performance tracking
- ✅ User analytics
- ✅ Backup strategies

## Rollback Strategy

### Quick Rollback
```bash
# Rollback to previous commit
git revert HEAD
git push origin [branch-name]
```

### Emergency Rollback
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Deployments"
4. Find the last working deployment
5. Click "Promote to Production"

## Best Practices

### Development
- 🔄 Frequent commits
- 🧪 Test new features
- 📝 Document changes
- 🔍 Code reviews

### Staging
- ✅ Full feature testing
- 🐛 Bug fixing
- 📊 Performance testing
- 👥 User acceptance testing

### Production
- 🚀 Stable releases only
- 📈 Monitor performance
- 🔒 Security updates
- 📱 User feedback

## Troubleshooting

### Common Issues
1. **Build Failures:** Check environment variables
2. **Database Errors:** Verify Supabase connection
3. **Deployment Issues:** Check Vercel logs
4. **Performance Issues:** Monitor Vercel analytics

### Support
- 📧 Check Vercel dashboard
- 📚 Read Vercel documentation
- 🐛 Check GitHub issues
- 💬 Contact development team
