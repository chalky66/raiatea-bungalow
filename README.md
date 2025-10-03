# Raiatea Bungalow - Airbnb Style Website

A beautiful, responsive single-property website showcasing a private bungalow in Raiatea, French Polynesia. Built with Vue 3, Vite, Tailwind CSS, and modern web technologies for a production-ready Airbnb-style experience.

## 🏖️ Live Demo

Experience Villa Tiare, a stunning lagoonfront stay in Bora Bora with modern amenities and traditional Polynesian charm.

## ✨ Features

- **Responsive Design**: Mobile-first approach with beautiful layouts across all devices
- **Interactive Gallery**: Touch-friendly Swiper carousel with navigation and pagination
- **Property Details**: Organized facts display (guests, bedrooms, beds, baths)
- **Amenities Grid**: Clean chip-style amenity display
- **Interactive Map**: Leaflet integration with OpenStreetMap (no API keys required)
- **Booking Interface**: Sticky availability card with pricing calculator
- **Modern UI**: Tailwind CSS with rounded cards, soft shadows, and smooth transitions

## 🚀 Quick Start

### Running in GitHub Codespaces (Recommended)

1. **Create a new Codespace** from this repository
2. **Wait for automatic setup** - dependencies will install automatically
3. **Start the development server**:
   ```bash
   npm run dev -- --host
   ```
4. **Open the preview** - Codespaces will show a popup to open the running application

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd airbnb-property-website

# Install dependencies
npm install

# Start development server
npm run dev -- --host

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Gallery**: Swiper.js
- **Maps**: Leaflet with OpenStreetMap
- **Dev Environment**: Node.js 20 in devcontainer

## 📁 Project Structure

```
├── .devcontainer/
│   └── devcontainer.json          # GitHub Codespaces configuration
├── public/
│   └── img/                       # Property images (replace with real photos)
├── src/
│   ├── components/
│   │   ├── GalleryCarousel.vue    # Hero image carousel
│   │   ├── PropertyFacts.vue      # Property stats (guests, beds, etc.)
│   │   ├── MapLeaflet.vue         # Interactive location map
│   │   └── AvailabilityCard.vue   # Booking form and pricing
│   ├── data/
│   │   └── property.json          # All property data and content
│   ├── App.vue                    # Main application layout
│   ├── main.js                    # Vue app entry point
│   └── styles.css                 # Global CSS and Tailwind imports
├── index.html                     # HTML template
├── package.json                   # Dependencies and scripts
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
└── postcss.config.js              # PostCSS configuration
```

## 🎨 Customization

### Replace Property Content

Edit `src/data/property.json` to customize:

```json
{
  "title": "Your Property Name",
  "location": "City, Country",
  "address": "Full Address",
  "coords": { "lat": 0.000, "lng": 0.000 },
  "heroImages": ["/img/hero1.jpg", "..."],
  "amenities": ["Wi-Fi", "Pool", "..."],
  "maxGuests": 4,
  "bedrooms": 2,
  "beds": 3,
  "baths": 2,
  "nightlyFrom": 150,
  "description": "Your property description...",
  "aboutDetails": "Additional details..."
}
```

### Replace Images

1. **Add your photos** to `public/img/`
2. **Update filenames** in `property.json`
3. **Recommended sizes**:
   - Hero images: 1200x800px
   - Gallery images: 800x600px
4. **Use descriptive alt text** for accessibility

### Styling Customization

- **Colors**: Edit `tailwind.config.js` to change the color scheme
- **Typography**: Modify font families in the Tailwind config
- **Layout**: Adjust spacing and sizing in Vue components
- **Custom CSS**: Add styles to `src/styles.css`

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: 
  - `sm`: 640px+ (tablets)
  - `md`: 768px+ (small desktops)
  - `lg`: 1024px+ (large desktops)
- **Touch Friendly**: Swipe gestures, tap targets, and mobile navigation

## 🔧 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run format     # Format code with Prettier
```

## 🚀 Deployment Options

### Vercel (Recommended)

1. **Connect your GitHub repository** to Vercel
2. **Import the project** - Vercel will auto-detect Vite
3. **Deploy** - Automatic deployments on every push

### Netlify

1. **Drag and drop** the `dist` folder after running `npm run build`
2. **Or connect your Git repository** for automatic deployments

### GitHub Pages

```bash
# Build the project
npm run build

# Deploy to GitHub Pages using gh-pages
npm install -g gh-pages
gh-pages -d dist
```

## 🧪 Testing

The application includes:
- **Responsive testing** across different screen sizes
- **Accessibility features** with proper ARIA labels
- **Form validation** for the booking interface
- **Error handling** for map and image loading

## 📋 Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **Mobile browsers**: iOS Safari, Chrome Mobile
- **Minimum requirements**: ES6 support, CSS Grid

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Vue.js team** for the excellent framework
- **Tailwind CSS** for the utility-first CSS framework
- **Swiper.js** for the smooth carousel experience
- **Leaflet** for the lightweight map solution
- **OpenStreetMap** for the free map tiles

---

**Built with ❤️ for modern web experiences**