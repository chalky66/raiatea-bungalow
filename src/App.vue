<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ property.title }}</h1>
            <p class="text-gray-600">📍 {{ property.location }}</p>
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <button class="text-gray-600 hover:text-gray-900 btn-transition">
              Share
            </button>
            <button class="text-gray-600 hover:text-gray-900 btn-transition">
              ❤️ Save
            </button>
          </div>
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
            <GalleryCarousel :images="property.heroImages" />
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
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">About this place</h2>
            <div class="space-y-4 text-gray-700 leading-relaxed">
              <p>{{ property.description }}</p>
              <p>{{ property.aboutDetails }}</p>
            </div>
          </section>

          <!-- Amenities -->
          <section class="bg-white rounded-2xl p-6 card-shadow">
            <h2 class="text-2xl font-semibold text-gray-900 mb-4">What this place offers</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="amenity in property.amenities"
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
              :address="property.address"
              :title="property.title"
            />
          </section>
        </div>

        <!-- Right Column - Booking Card -->
        <div class="lg:col-span-1">
          <AvailabilityCard
            :nightlyFrom="property.nightlyFrom"
            :maxGuests="property.maxGuests"
          />
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="font-semibold text-gray-900 mb-4">Support</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-gray-900 btn-transition">Help Center</a></li>
              <li><a href="#" class="hover:text-gray-900 btn-transition">Safety information</a></li>
              <li><a href="#" class="hover:text-gray-900 btn-transition">Cancellation options</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-4">Community</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-gray-900 btn-transition">Airbnb.org</a></li>
              <li><a href="#" class="hover:text-gray-900 btn-transition">Diversity & Belonging</a></li>
              <li><a href="#" class="hover:text-gray-900 btn-transition">Accessibility</a></li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-gray-900 mb-4">Hosting</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li><a href="#" class="hover:text-gray-900 btn-transition">Become a Host</a></li>
              <li><a href="#" class="hover:text-gray-900 btn-transition">Host your home</a></li>
              <li><a href="#" class="hover:text-gray-900 btn-transition">Resource Center</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-200 mt-8 pt-8 text-center">
          <p class="text-sm text-gray-600">
            © {{ currentYear }} Villa Tiare. All rights reserved. | 
            <a href="#" class="hover:text-gray-900 btn-transition">Privacy</a> · 
            <a href="#" class="hover:text-gray-900 btn-transition">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import GalleryCarousel from './components/GalleryCarousel.vue'
import PropertyFacts from './components/PropertyFacts.vue'
import MapLeaflet from './components/MapLeaflet.vue'
import AvailabilityCard from './components/AvailabilityCard.vue'
import propertyData from './data/property.json'

export default {
  name: 'App',
  components: {
    GalleryCarousel,
    PropertyFacts,
    MapLeaflet,
    AvailabilityCard
  },
  data() {
    return {
      property: propertyData
    }
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
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