<template>
  <div class="bg-white rounded-2xl p-6 card-shadow">
    <h3 class="text-xl font-semibold text-gray-900 mb-4">Location</h3>
    <p class="text-gray-600 mb-4">{{ address }}</p>
    <div class="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
      <div class="text-center">
        <div class="text-4xl mb-2">🗺️</div>
        <p class="text-gray-600">Interactive Map</p>
        <p class="text-sm text-gray-500">Coordinates: {{ coords.lat }}, {{ coords.lng }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapLeaflet',
  props: {
    coords: {
      type: Object,
      required: true,
      validator(value) {
        return value && typeof value.lat === 'number' && typeof value.lng === 'number'
      }
    },
    address: {
      type: String,
      required: true
    },
    title: {
      type: String,
      default: 'Property Location'
    }
  }
}
</script>