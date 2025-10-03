# 🚀 How to Publish Your Raiatea Bungalow Website

## Step 1: Create Your Own Repository

Since you're working in a Codespace, you'll need to create your own GitHub repository:

### Option A: Create Repository via GitHub Web Interface
1. Go to [GitHub.com](https://github.com)
2. Click the "+" icon → "New repository"
3. Name it: `raiatea-bungalow`
4. Set it as **Public**
5. Don't initialize with README (we already have files)
6. Click "Create repository"

### Option B: Create Repository via GitHub CLI
```bash
gh repo create raiatea-bungalow --public --description "Airbnb-style website for Raiatea Bungalow"
```

## Step 2: Connect Your Local Code to the New Repository

```bash
# Add your new repository as the remote origin
git remote add origin https://github.com/YOUR_USERNAME/raiatea-bungalow.git

# Push your code to GitHub
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section in the left sidebar
4. Under "Source", select "GitHub Actions"
5. The deployment will automatically start!

## Step 4: Access Your Live Website

Your website will be available at:
```
https://YOUR_USERNAME.github.io/raiatea-bungalow/
```

## 🔄 Automatic Deployment

Every time you push changes to the `main` branch, GitHub Actions will automatically:
1. Build your Vue.js application
2. Deploy it to GitHub Pages
3. Update your live website

## 📝 Manual Deployment (Alternative)

If you prefer manual control:

```bash
# Build and deploy manually
npm run deploy
```

## 🎯 What You Get

✅ **Fully Responsive Website**
✅ **Interactive Image Gallery** 
✅ **Property Location Map**
✅ **Professional Airbnb-Style Design**
✅ **Mobile-Optimized Experience**
✅ **Fast Loading Performance**
✅ **SEO-Friendly Structure**

## 🔧 Customization

To customize for different properties:
1. Update property details in `src/data/property.json`
2. Replace images in `public/img/`
3. Modify repository name in `vite.config.js` if needed

## 🆘 Need Help?

If you encounter any issues:
1. Check the Actions tab in your GitHub repository for build logs
2. Ensure all images are properly uploaded
3. Verify the repository name matches your configuration

---

**Ready to showcase your beautiful Raiatea bungalow to the world! 🏝️**