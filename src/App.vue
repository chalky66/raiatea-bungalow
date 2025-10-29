<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <!-- Back to Landing Button -->
            <a 
              :href="getBasePath() + 'landing.html'"
              class="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
              :title="$t('navigation.backToLanding')"
            >
              <span class="text-xl">←</span>
              <span class="hidden sm:inline">{{ $t('navigation.backToLanding') }}</span>
            </a>
            <div>
              <h1 class="text-2xl font-bold text-gray-900">{{ currentProperty.title }}</h1>
              <p class="text-gray-600">📍 {{ currentProperty.location }}</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <!-- Switch Property Button -->
            <a 
              v-if="otherPropertyLink"
              :href="otherPropertyLink.url"
              class="hidden md:flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
            >
              <span>{{ otherPropertyLink.label }}</span>
              <span>→</span>
            </a>
            <LanguageSwitcher />
          </div>
        </div>
        <!-- Mobile: Switch Property Button -->
        <div v-if="otherPropertyLink" class="md:hidden mt-3">
          <a 
            :href="otherPropertyLink.url"
            class="flex items-center justify-center gap-2 w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <span>{{ otherPropertyLink.label }}</span>
            <span>→</span>
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Main Content -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Hero Gallery -->
          <section>
            <GalleryCarousel :images="resolvedHeroImages" />
          </section>

          <!-- Property Facts -->
          <section>
            <PropertyFacts
              :maxGuests="property.maxGuests"
              :bedrooms="property.bedrooms"
              :beds="property.beds"
              :baths="property.baths"
            />
          </section>

          <!-- About Section -->
          <section class="bg-white rounded-2xl p-6 card-shadow">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('property.aboutThisPlace') }}</h2>
            <div class="space-y-4 text-gray-700 leading-relaxed">
              <p>{{ currentProperty.description }}</p>
              <p>{{ currentProperty.aboutDetails }}</p>
            </div>
          </section>

          <!-- Amenities -->
          <section class="bg-white rounded-2xl p-6 card-shadow">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">{{ $t('property.amenities') }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="amenity in currentProperty.amenities"
                :key="amenity"
                class="flex items-center space-x-3 py-2"
              >
                <span class="text-green-500">✓</span>
                <span class="text-gray-700">{{ amenity }}</span>
              </div>
            </div>
          </section>

          <!-- Location Map -->
          <section>
            <MapLeaflet
              :coords="property.coords"
              :address="currentProperty.address"
              :title="currentProperty.title"
            />
          </section>
        </div>

        <!-- Right Column - Booking Card -->
        <div class="lg:col-span-1">
          <AvailabilityCard
            :nightlyFrom="property.nightlyFrom"
            :maxGuests="property.maxGuests"
            :propertyName="currentProperty.propertyName"
          />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import GalleryCarousel from './components/GalleryCarousel.vue'
import PropertyFacts from './components/PropertyFacts.vue'
import MapLeaflet from './components/MapLeaflet.vue'
import AvailabilityCard from './components/AvailabilityCard.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import propertyData from './data/property.json'
import propertyI18n from './data/property-i18n.json'

export default {
  name: 'App',
  props: {
    propertyType: {
      type: String,
      default: 'pool'
    }
  },
  components: {
    GalleryCarousel,
    PropertyFacts,
    MapLeaflet,
    AvailabilityCard,
    LanguageSwitcher
  },
  data() {
    return {
      property: propertyData,
      propertyI18n: propertyI18n
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
    currentProperty() {
      const locale = this.$i18n.locale
      return {
        ...this.property,
        ...this.propertyI18n[locale]
      }
    },
    resolvedHeroImages() {
      return this.property.heroImages.map(img => this.resolveImageUrl(img))
    },
    resolvedGallery() {
      return this.property.gallery.map(item => ({
        ...item,
        src: this.resolveImageUrl(item.src)
      }))
    },
    otherPropertyLink() {
      const basePath = this.getBasePath()
      if (this.propertyType === 'pool') {
        return {
          url: basePath + 'bungalow.html',
          label: this.$t('navigation.viewStandardBungalow')
        }
      } else if (this.propertyType === 'standard') {
        return {
          url: basePath + 'bungalow-with-pool.html',
          label: this.$t('navigation.viewPoolBungalow')
        }
      }
      return null
    }
  },
  methods: {
    getBasePath() {
      return import.meta.env.MODE === 'production' ? '/raiatea-bungalow/' : '/'
    },
    resolveImageUrl(url) {
      // Handle already resolved URLs
      if (url.startsWith('http') || url.startsWith('//')) {
        return url
      }
      // For relative URLs, use import.meta.env.BASE_URL
      const baseUrl = import.meta.env.BASE_URL || '/'
      const cleanUrl = url.startsWith('/') ? url.slice(1) : url
      return `${baseUrl}${cleanUrl}`
    }
  },
  mounted() {
    // Update document title with property title
    document.title = `${this.property.title} - ${this.property.location}`
  }
}
</script>

<style>
/* Global app styles */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>