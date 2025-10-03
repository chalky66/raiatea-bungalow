<template>
  <div class="relative rounded-2xl overflow-hidden card-shadow">
    <div class="relative">
      <img
        :src="images[0]"
        :alt="'Property image 1'"
        class="w-full h-64 sm:h-80 md:h-96 object-cover"
        loading="lazy"
      />
      <div class="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg">
        1 of {{ images.length }} photos
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GalleryCarousel',
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    }
  }
}
</script>