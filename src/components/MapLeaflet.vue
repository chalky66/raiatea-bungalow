<template>
  <div class="bg-white rounded-2xl p-6 card-shadow">
    <h3 class="text-xl font-semibold text-gray-900 mb-4">Location</h3>
    <p class="text-gray-600 mb-4">{{ address }}</p>
    <div ref="mapContainer" class="leaflet-container"></div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in Leaflet with bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
})

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
  },
  data() {
    return {
      map: null,
      marker: null
    }
  },
  mounted() {
    this.initMap()
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove()
    }
  },
  methods: {
    initMap() {
      // Initialize the map
      this.map = L.map(this.$refs.mapContainer, {
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        tap: true,
        touchZoom: true
      }).setView([this.coords.lat, this.coords.lng], 13)

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
      }).addTo(this.map)

      // Add marker
      this.marker = L.marker([this.coords.lat, this.coords.lng])
        .addTo(this.map)
        .bindPopup(`
          <div class="text-center">
            <strong class="block text-sm font-semibold">${this.title}</strong>
            <span class="text-xs text-gray-600">${this.address}</span>
          </div>
        `)
        .openPopup()

      // Ensure map renders correctly
      setTimeout(() => {
        this.map.invalidateSize()
      }, 100)
    }
  }
}
</script>

<style scoped>
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
}

:deep(.leaflet-popup-tip) {
  background: white;
}
</style>