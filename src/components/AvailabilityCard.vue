<template>
  <div class="bg-white rounded-2xl p-6 card-shadow sticky top-8">
    <div class="mb-6">
      <div class="flex items-baseline gap-2">
        <span class="text-3xl font-bold text-gray-900">${{ nightlyFrom }}</span>
        <span class="text-gray-600">per night</span>
      </div>
    </div>

    <form @submit.prevent="handleBookingRequest" class="space-y-4">
      <!-- Check-in / Check-out -->
      <div class="grid grid-cols-2 gap-2">
        <div class="border border-gray-300 rounded-lg p-3">
          <label class="block text-xs font-medium text-gray-700 mb-1">Check-in</label>
          <input
            v-model="checkIn"
            type="date"
            class="w-full text-sm border-none p-0 focus:ring-0"
            :min="today"
            required
          />
        </div>
        <div class="border border-gray-300 rounded-lg p-3">
          <label class="block text-xs font-medium text-gray-700 mb-1">Check-out</label>
          <input
            v-model="checkOut"
            type="date"
            class="w-full text-sm border-none p-0 focus:ring-0"
            :min="checkInMinDate"
            required
          />
        </div>
      </div>

      <!-- Guests -->
      <div class="border border-gray-300 rounded-lg p-3">
        <label class="block text-xs font-medium text-gray-700 mb-1">Guests</label>
        <select
          v-model="guests"
          class="w-full text-sm border-none p-0 focus:ring-0"
          required
        >
          <option
            v-for="num in maxGuests"
            :key="num"
            :value="num"
          >
            {{ num }} {{ num === 1 ? 'guest' : 'guests' }}
          </option>
        </select>
      </div>

      <!-- Book Button -->
      <button
        type="submit"
        class="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-4 rounded-lg btn-transition focus:ring-4 focus:ring-rose-200"
        :disabled="!isFormValid"
        :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
      >
        Request to book
      </button>
    </form>

    <!-- Price breakdown -->
    <div v-if="nights > 0" class="mt-6 pt-6 border-t border-gray-200">
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span>${{ nightlyFrom }} × {{ nights }} {{ nights === 1 ? 'night' : 'nights' }}</span>
          <span>${{ subtotal }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Service fee</span>
          <span>${{ serviceFee }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>Taxes</span>
          <span>${{ taxes }}</span>
        </div>
        <hr class="my-3">
        <div class="flex justify-between font-semibold">
          <span>Total</span>
          <span>${{ total }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvailabilityCard',
  props: {
    nightlyFrom: {
      type: Number,
      required: true
    },
    maxGuests: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      checkIn: '',
      checkOut: '',
      guests: 1
    }
  },
  computed: {
    today() {
      return new Date().toISOString().split('T')[0]
    },
    checkInMinDate() {
      if (!this.checkIn) return this.today
      const checkInDate = new Date(this.checkIn)
      checkInDate.setDate(checkInDate.getDate() + 1)
      return checkInDate.toISOString().split('T')[0]
    },
    nights() {
      if (!this.checkIn || !this.checkOut) return 0
      const checkInDate = new Date(this.checkIn)
      const checkOutDate = new Date(this.checkOut)
      const diffTime = checkOutDate - checkInDate
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays > 0 ? diffDays : 0
    },
    subtotal() {
      return this.nights * this.nightlyFrom
    },
    serviceFee() {
      return Math.round(this.subtotal * 0.14) // 14% service fee
    },
    taxes() {
      return Math.round(this.subtotal * 0.12) // 12% taxes
    },
    total() {
      return this.subtotal + this.serviceFee + this.taxes
    },
    isFormValid() {
      return this.checkIn && this.checkOut && this.guests && this.nights > 0
    }
  },
  methods: {
    handleBookingRequest() {
      if (!this.isFormValid) return
      
      // Create booking summary
      const bookingDetails = {
        checkIn: this.checkIn,
        checkOut: this.checkOut,
        guests: this.guests,
        nights: this.nights,
        subtotal: this.subtotal,
        serviceFee: this.serviceFee,
        taxes: this.taxes,
        total: this.total
      }
      
      // For demo purposes, show an alert
      alert(`Booking request submitted!\n\nDetails:\nCheck-in: ${this.checkIn}\nCheck-out: ${this.checkOut}\nGuests: ${this.guests}\nNights: ${this.nights}\nTotal: $${this.total}`)
      
      console.log('Booking request:', bookingDetails)
      
      // In a real app, you would send this to your booking API
      // this.$emit('booking-request', bookingDetails)
    }
  }
}
</script>

<style scoped>
/* Remove default date input styling */
input[type="date"]::-webkit-calendar-picker-indicator {
  cursor: pointer;
}

/* Focus styles for form elements */
input:focus,
select:focus {
  outline: none;
  ring: 2px;
  ring-color: rgb(244 63 94);
}
</style>