<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto p-8">
      <h1 class="text-4xl font-bold text-center mb-8">{{ property.title }}</h1>
      <p class="text-xl text-center text-gray-600 mb-8">{{ property.location }}</p>
      
      <!-- Simple image display -->
      <div class="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <img 
          :src="property.heroImages[0]" 
          :alt="property.title"
          class="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <!-- Property Facts -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-lg p-4 text-center shadow">
          <div class="text-2xl font-bold">{{ property.maxGuests }}</div>
          <div class="text-sm text-gray-600">Guests</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow">
          <div class="text-2xl font-bold">{{ property.bedrooms }}</div>
          <div class="text-sm text-gray-600">Bedrooms</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow">
          <div class="text-2xl font-bold">{{ property.beds }}</div>
          <div class="text-sm text-gray-600">Beds</div>
        </div>
        <div class="bg-white rounded-lg p-4 text-center shadow">
          <div class="text-2xl font-bold">{{ property.baths }}</div>
          <div class="text-sm text-gray-600">Baths</div>
        </div>
      </div>

      <!-- Description -->
      <div class="bg-white rounded-2xl p-6 shadow-lg">
        <h2 class="text-2xl font-semibold mb-4">About this place</h2>
        <p class="text-gray-700 leading-relaxed">{{ property.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import propertyData from './data/property.json'

export default {
  name: 'App',
  data() {
    return {
      property: propertyData
    }
  }
}
</script>