#!/bin/bash

# Raiatea Bungalow - GitHub Pages Deployment Script
# This script builds the Vue.js application and deploys it to the gh-pages branch

set -e  # Exit immediately if a command exits with a non-zero status

echo "🏠 Deploying Raiatea Bungalow to GitHub Pages..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Not in a git repository${NC}"
    exit 1
fi

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
fi

# Clean previous build
echo -e "${BLUE}🧹 Cleaning previous build...${NC}"
rm -rf dist/

# Build the project
echo -e "${BLUE}📦 Building production version...${NC}"
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"

# Configure git for deployment
echo -e "${BLUE}⚙️  Configuring git...${NC}"
git config user.name "Deployment Script" 2>/dev/null || true
git config user.email "deploy@raiatea-bungalow.com" 2>/dev/null || true

# Save current branch and stash any changes
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${BLUE}💾 Current branch: $CURRENT_BRANCH${NC}"

# Stash any uncommitted changes
STASH_CREATED=false
if ! git diff --quiet || ! git diff --cached --quiet; then
    echo -e "${YELLOW}💼 Stashing uncommitted changes...${NC}"
    git stash push -m "Deploy script stash $(date)"
    STASH_CREATED=true
fi

# Create a temporary directory for the build files
TEMP_DIR=$(mktemp -d)
echo -e "${BLUE}📁 Using temporary directory: $TEMP_DIR${NC}"

# Copy dist contents to temporary directory
echo -e "${BLUE}📋 Copying built files to temp directory...${NC}"
cp -r dist/* "$TEMP_DIR/"

# Create gh-pages branch and deploy
echo -e "${BLUE}🚀 Deploying to gh-pages branch...${NC}"

# Delete local gh-pages branch if it exists
git branch -D gh-pages 2>/dev/null || true

# Check if gh-pages branch exists remotely
if git ls-remote --exit-code --heads origin gh-pages >/dev/null 2>&1; then
    echo -e "${YELLOW}📡 gh-pages branch exists remotely, fetching...${NC}"
    git fetch origin gh-pages
    git checkout -B gh-pages origin/gh-pages
else
    echo -e "${YELLOW}🆕 Creating new gh-pages branch...${NC}"
    git checkout --orphan gh-pages
fi

# Remove all files except .git
echo -e "${BLUE}🗑️  Cleaning gh-pages branch...${NC}"
git rm -rf . 2>/dev/null || true

# Copy built files from temp directory
echo -e "${BLUE}📋 Copying built files from temp directory...${NC}"
cp -r "$TEMP_DIR"/* .

# Add .nojekyll file to bypass Jekyll processing
touch .nojekyll

# Create 404.html for SPA routing
cat > 404.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>Raiatea Bungalow</title>
    <script>
        // SPA redirect for GitHub Pages
        var pathSegmentsToKeep = 0;
        var l = window.location;
        l.replace(
            l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
            l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
            l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
            (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
            l.hash
        );
    </script>
</head>
<body>
    <div style="font-family: system-ui, sans-serif; text-align: center; padding: 50px;">
        <h1>Raiatea Bungalow</h1>
        <p>Redirecting to the correct page...</p>
    </div>
</body>
</html>
EOF

# Add and commit files
git add -A

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}ℹ️  No changes detected, skipping deployment${NC}"
else
    COMMIT_MESSAGE="Deploy Raiatea Bungalow to GitHub Pages - $(date '+%Y-%m-%d %H:%M:%S')"
    echo -e "${BLUE}💾 Committing: $COMMIT_MESSAGE${NC}"
    git commit -m "$COMMIT_MESSAGE"
    
    # Push to gh-pages branch
    echo -e "${BLUE}🚀 Pushing to gh-pages branch...${NC}"
    git push origin gh-pages
    
    echo -e "${GREEN}✅ Successfully deployed to GitHub Pages!${NC}"
fi

# Return to original branch
echo -e "${BLUE}🔄 Returning to $CURRENT_BRANCH branch...${NC}"
git checkout $CURRENT_BRANCH

# Restore stashed changes if any
if [ "$STASH_CREATED" = true ]; then
    echo -e "${YELLOW}💼 Restoring stashed changes...${NC}"
    git stash pop
fi

# Clean up temporary directory
rm -rf "$TEMP_DIR"

# Display success information
echo -e "${GREEN}"
echo "🎉 Deployment completed successfully!"
echo ""
echo "Your Raiatea Bungalow website is now available at:"
echo "🌐 https://chalky66.github.io/raiatea-bungalow/"
echo ""
echo "Note: It may take a few minutes for GitHub Pages to update."
echo "You can check the deployment status at:"
echo "📊 https://github.com/chalky66/raiatea-bungalow/actions"
echo -e "${NC}"