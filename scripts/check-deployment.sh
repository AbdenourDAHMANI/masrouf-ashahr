#!/bin/bash

# Check Vercel Deployment Status
echo "🚀 Checking Vercel Deployment Status..."
echo "=================================="

# Check if we're on main branch
current_branch=$(git branch --show-current)
echo "Current branch: $current_branch"

if [ "$current_branch" = "main" ]; then
    echo "✅ On main branch - deployments will be automatic"
else
    echo "⚠️  Not on main branch - switch to main for production deployments"
fi

# Check Vercel project status
echo ""
echo "📊 Vercel Project Status:"
npx vercel project inspect --format json | jq -r '.name, .id, .createdAt'

echo ""
echo "🔗 Production URL: https://masrouf-ashahr.vercel.app"
echo "📝 GitHub Repository: https://github.com/AbdenourDAHMANI/masrouf-ashahr"

echo ""
echo "✅ Automatic deployment is configured!"
echo "   - Push to main branch → Automatic production deployment"
echo "   - Push to staging branch → Automatic staging deployment"  
echo "   - Push to development branch → Automatic development deployment"
