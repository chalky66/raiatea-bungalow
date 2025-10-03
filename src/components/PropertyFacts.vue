<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div
      v-for="fact in facts"
      :key="fact.label"
      class="bg-white rounded-2xl p-6 text-center card-shadow hover:shadow-xl btn-transition"
    >
      <div class="text-2xl mb-2" v-html="fact.icon"></div>
      <div class="text-2xl font-bold text-gray-900 mb-1">{{ fact.value }}</div>
      <div class="text-sm text-gray-600 font-medium">{{ fact.label }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropertyFacts',
  props: {
    maxGuests: {
      type: Number,
      required: true
    },
    bedrooms: {
      type: Number,
      required: true
    },
    beds: {
      type: Number,
      required: true
    },
    baths: {
      type: Number,
      required: true
    }
  },
  computed: {
    facts() {
      return [
        {
          icon: '👥',
          value: this.maxGuests,
          label: this.maxGuests === 1 ? 'Guest' : 'Guests'
        },
        {
          icon: '🛏️',
          value: this.bedrooms,
          label: this.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'
        },
        {
          icon: '🛌',
          value: this.beds,
          label: this.beds === 1 ? 'Bed' : 'Beds'
        },
        {
          icon: '🚿',
          value: this.baths,
          label: this.baths === 1 ? 'Bath' : 'Baths'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Component-specific styles if needed */
</style>