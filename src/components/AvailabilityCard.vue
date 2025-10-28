<template>
  <div class="bg-white rounded-2xl p-6 card-shadow sticky top-8">
    <div class="mb-6">
      <div class="flex items-baseline gap-2">
        <span class="text-3xl font-bold text-gray-900">€{{ nightlyFrom }}</span>
        <span class="text-gray-600">{{ $t('property.perNight') }}</span>
      </div>
    </div>

    <form @submit.prevent="handleBookingRequest" class="space-y-4">
      <!-- Check-in / Check-out -->
      <div class="grid grid-cols-2 gap-2">
        <div class="border border-gray-300 rounded-lg p-3">
          <label class="block text-xs font-medium text-gray-700 mb-1">{{ $t('property.checkIn') }}</label>
          <input
            v-model="checkIn"
            type="date"
            class="w-full text-sm border-none p-0 focus:ring-0"
            :min="today"
            required
          />
        </div>
        <div class="border border-gray-300 rounded-lg p-3">
          <label class="block text-xs font-medium text-gray-700 mb-1">{{ $t('property.checkOut') }}</label>
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
        <label class="block text-xs font-medium text-gray-700 mb-1">{{ $t('booking.guestsLabel') }}</label>
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
            {{ num }} {{ num === 1 ? $t('property.guests').slice(0, -1) : $t('property.guests') }}
          </option>
        </select>
      </div>

      <!-- Book Buttons -->
      <div class="space-y-3">
        <button
          type="submit"
          class="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-4 rounded-lg btn-transition focus:ring-4 focus:ring-rose-200 relative"
          :disabled="!isFormValid"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
          @mouseenter="handleReserveHover"
          @mouseleave="handleReserveLeave"
        >
          {{ $t('property.reserve') }}
        </button>
        
        <!-- Date Required Toast - positioned below Reserve button -->
        <div v-if="showDateToast" 
             class="bg-yellow-200 text-gray-900 text-sm font-bold px-6 py-3 rounded-lg shadow-2xl border-2 border-yellow-400 text-center mt-2"
             style="background-color: #fef3c7;">
          {{ $t('booking.enterDatesFirst') }}
        </div>
        
        <button
          v-if="!showDateToast"
          type="button"
          @click="showAirbnbPopup = true"
          class="w-full bg-white border-2 border-rose-500 text-rose-500 hover:bg-rose-50 font-semibold py-4 rounded-lg btn-transition focus:ring-4 focus:ring-rose-200"
        >
          {{ $t('booking.reserveOnAirbnb') }}
        </button>
      </div>
    </form>

    <!-- Price breakdown -->
    <div v-if="nights > 0" class="mt-6 pt-6 border-t border-gray-200">
      <div class="space-y-2">
        <div class="flex justify-between text-sm">
          <span>€{{ nightlyFrom }} × {{ nights }} {{ nights === 1 ? $t('booking.night') : $t('booking.nights') }}</span>
          <span>€{{ subtotal }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>{{ $t('booking.pricing.serviceFee') }}</span>
          <span>€{{ serviceFee }}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span>{{ $t('booking.pricing.taxes') }}</span>
          <span>€{{ taxes }}</span>
        </div>
        
        <!-- Extras Section -->
        <div class="mt-4">
          <button 
            @click="showExtras = !showExtras"
            class="flex items-center justify-between w-full text-left text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <span>{{ $t('booking.extras.title') }}</span>
            <svg 
              :class="{ 'transform rotate-180': showExtras }"
              class="w-4 h-4 transition-transform"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div v-if="showExtras" class="mt-3 space-y-3">
            <label class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  v-model="selectedExtras.airportPickup"
                  class="mr-3 h-4 w-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                >
                <span class="text-sm text-gray-700">{{ $t('booking.extras.airportPickup') }}</span>
              </div>
              <span class="text-sm font-medium">€20</span>
            </label>
            
            <label class="flex items-center justify-between">
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  v-model="selectedExtras.kayakHire"
                  class="mr-3 h-4 w-4 text-rose-500 border-gray-300 rounded focus:ring-rose-500"
                >
                <span class="text-sm text-gray-700">{{ $t('booking.extras.kayakHire') }}</span>
              </div>
              <span class="text-sm font-medium">€10</span>
            </label>
          </div>
          
          <div v-if="extrasTotal > 0" class="flex justify-between text-sm mt-3 pt-3 border-t border-gray-200">
            <span>{{ $t('booking.extras.subtotal') }}</span>
            <span>€{{ extrasTotal }}</span>
          </div>
        </div>
        
        <hr class="my-3">
        <div class="flex justify-between font-semibold">
          <span>{{ $t('property.total') }}</span>
          <span>€{{ total }}</span>
        </div>
      </div>
    </div>

    <!-- Airbnb Popup Modal -->
    <Teleport to="body">
      <div v-if="showAirbnbPopup" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4"
           style="z-index: 99999;">
        <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
          <div class="text-center">
            <div class="mb-4">
              <span class="text-4xl">💰</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">{{ $t('booking.popup.title') }}</h3>
          <p class="text-gray-600 mb-6 leading-relaxed">
            {{ $t('booking.popup.message') }}
          </p>
          <div class="space-y-3">
            <button
              @click="openAirbnb"
              class="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-lg btn-transition"
            >
              {{ $t('booking.popup.continueToAirbnb') }}
            </button>
            <button
              @click="showAirbnbPopup = false"
              class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg btn-transition"
            >
              {{ $t('booking.popup.cancel') }}
            </button>
          </div>
          </div>
        </div>
      </div>
    </Teleport>
    
    <!-- Booking Confirmation Popup Modal -->
    <Teleport to="body">
      <div v-if="showConfirmationPopup" 
           class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4"
           style="z-index: 99999;">
        <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
          <div class="text-center mb-6">
            <div class="mb-4">
              <span class="text-4xl">📋</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ $t('booking.confirmation.title') }}</h3>
            <p class="text-gray-600 text-sm">
              {{ $t('booking.confirmation.message') }}
            </p>
          </div>
          
          <form @submit.prevent="submitBookingWithContact" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('booking.confirmation.name') }} *
              </label>
              <input 
                type="text" 
                v-model="userContact.name"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                :placeholder="$t('booking.confirmation.namePlaceholder')"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('booking.confirmation.email') }} *
              </label>
              <input 
                type="email" 
                v-model="userContact.email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                :placeholder="$t('booking.confirmation.emailPlaceholder')"
              >
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                {{ $t('booking.confirmation.phone') }}
              </label>
              <input 
                type="tel" 
                v-model="userContact.phone"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                :placeholder="$t('booking.confirmation.phonePlaceholder')"
              >
            </div>
            
            <div class="space-y-3 pt-4">
              <button
                type="submit"
                class="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 px-6 rounded-lg btn-transition"
              >
                {{ $t('booking.confirmation.submit') }}
              </button>
              <button
                type="button"
                @click="showConfirmationPopup = false"
                class="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg btn-transition"
              >
                {{ $t('booking.confirmation.cancel') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
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
      guests: 1,
      showAirbnbPopup: false,
      showDateToast: false,
      showExtras: false,
      showConfirmationPopup: false,
      userContact: {
        name: '',
        email: '',
        phone: ''
      },
      selectedExtras: {
        airportPickup: false,
        kayakHire: false
      }
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
    extrasTotal() {
      let total = 0
      if (this.selectedExtras.airportPickup) total += 20
      if (this.selectedExtras.kayakHire) total += 10
      return total
    },
    total() {
      return this.subtotal + this.serviceFee + this.taxes + this.extrasTotal
    },
    isFormValid() {
      return this.checkIn && this.checkOut && this.guests && this.nights > 0
    }
  },
  methods: {
    handleBookingRequest() {
      if (!this.isFormValid) return
      
      // Show confirmation popup instead of direct submission
      this.showConfirmationPopup = true
    },
    async submitBookingWithContact() {
      if (!this.userContact.name || !this.userContact.email) {
        alert('Please fill in required fields (Name and Email)')
        return
      }

      // Create booking summary including extras and contact info
      const selectedExtrasDetails = []
      if (this.selectedExtras.airportPickup) selectedExtrasDetails.push('Airport pickup - €20')
      if (this.selectedExtras.kayakHire) selectedExtrasDetails.push('Kayak hire - €10')
      
      const bookingDetails = {
        property: 'Raiatea Bungalow - French Polynesia',
        checkIn: this.checkIn,
        checkOut: this.checkOut,
        guests: this.guests,
        nights: this.nights,
        subtotal: this.subtotal,
        serviceFee: this.serviceFee,
        taxes: this.taxes,
        extrasTotal: this.extrasTotal,
        selectedExtras: selectedExtrasDetails.join(', ') || 'None',
        total: this.total,
        timestamp: new Date().toLocaleString(),
        // Add contact information
        contactName: this.userContact.name,
        contactEmail: this.userContact.email,
        contactPhone: this.userContact.phone || 'Not provided'
      }
      
      try {
        // Load EmailJS configuration and send email directly from browser
        const emailjs = await import('@emailjs/browser')
        const baseUrl = import.meta.env.BASE_URL || '/'
        const configResponse = await fetch(`${baseUrl}emailjs-config.json`)
        const config = await configResponse.json()
        
        // Template parameters - all booking details
        const templateParams = {
          from_name: 'Raiatea Bungalow Website',
          reply_to: bookingDetails.contactEmail,
          to_name: 'Bungalow Tehei',
          subject: this.$t('booking.email.subject'),
          property: bookingDetails.property,
          check_in: bookingDetails.checkIn,
          check_out: bookingDetails.checkOut,
          guests: bookingDetails.guests,
          nights: bookingDetails.nights,
          subtotal: bookingDetails.subtotal,
          service_fee: bookingDetails.serviceFee,
          taxes: bookingDetails.taxes,
          extras_total: bookingDetails.extrasTotal,
          selected_extras: bookingDetails.selectedExtras,
          total: bookingDetails.total,
          timestamp: bookingDetails.timestamp,
          language: this.$i18n.locale,
          contact_name: bookingDetails.contactName,
          contact_email: bookingDetails.contactEmail,
          contact_phone: bookingDetails.contactPhone
        }
        
        // Send booking notification to owner (bungalowtehei@gmail.com)
        // Note: The recipient email should be configured in the EmailJS template settings
        // to send to bungalowtehei@gmail.com instead of chalky66@gmail.com
        const ownerResult = await emailjs.send(
          config.emailjs.serviceId,
          config.emailjs.templateId,
          templateParams,
          config.emailjs.publicKey
        )
        
        console.log('Owner notification sent:', ownerResult)
        
        // Send booking confirmation to customer
        // Uses separate template (template_8c6vq5g) with recipient set to {{contact_email}}
        const customerResult = await emailjs.send(
          config.emailjs.serviceId,
          config.emailjs.customerTemplateId,
          templateParams,
          config.emailjs.publicKey
        )
        
        console.log('Customer confirmation sent:', customerResult)
        
        if (ownerResult.status === 200 && customerResult.status === 200) {
          // Close confirmation popup
          this.showConfirmationPopup = false
          
          // Reset contact form
          this.userContact = { name: '', email: '', phone: '' }
          
          alert(this.$t('booking.success'))
          // Keep booking form data intact for user convenience
        } else {
          throw new Error('Failed to send email')
        }
      } catch (error) {
        console.error('Booking submission error:', error)
        alert(this.$t('booking.error'))
      }
      
      console.log('Booking request with contact:', bookingDetails)
    },
    openAirbnb() {
      const airbnbUrl = 'https://www.airbnb.com/rooms/1097297389212603888?check_in=2026-02-01&check_out=2026-02-06&guests=1&adults=1&s=67&unique_share_id=e265ea61-2a83-4673-b62f-d75e7e87bfea'
      window.open(airbnbUrl, '_blank')
      this.showAirbnbPopup = false
    },
    handleReserveHover() {
      if (!this.checkIn || !this.checkOut) {
        this.showDateToast = true
      }
    },
    handleReserveLeave() {
      this.showDateToast = false
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
  box-shadow: 0 0 0 2px rgb(244 63 94);
}
</style>