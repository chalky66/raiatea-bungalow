#!/bin/bash

# Deploy script for GitHub Pages
echo "🏠 Deploying Raiatea Bungalow to GitHub Pages..."

# Build the project
echo "📦 Building production version..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Create gh-pages branch and deploy
echo "🚀 Deploying to gh-pages branch..."

# Save current branch
CURRENT_BRANCH=$(git branch --show-current)

# Checkout gh-pages or create it
git checkout gh-pages 2>/dev/null || git checkout --orphan gh-pages

# Remove all files except .git
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +

# Copy dist contents to root
cp -r dist/* .
rm -rf dist

# Add and commit
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to origin
if git remote get-url origin >/dev/null 2>&1; then
    git push origin gh-pages
    echo "✅ Deployed to GitHub Pages!"
    echo "🌐 Your site will be available at: https://$(git config --get remote.origin.url | sed 's/.*github\.com[:/]\([^/]*\)\/\([^.]*\).*/\1.github.io\/\2/')/"
else
    echo "⚠️  No remote origin configured. Please set up your GitHub repository first."
    echo "💡 Run: git remote add origin https://github.com/username/repository-name.git"
fi

# Return to original branch
git checkout $CURRENT_BRANCH

echo "🎉 Deployment complete!"