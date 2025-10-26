<template>
  <div class="relative">
    <select 
      v-model="currentLocale" 
      @change="changeLanguage"
      class="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
    >
      <option value="en">🇺🇸 English</option>
      <option value="fr">🇫🇷 Français</option>
    </select>
    <div class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
      <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'LanguageSwitcher',
  setup() {
    const { locale } = useI18n()
    
    return {
      currentLocale: locale,
      changeLanguage(event) {
        const newLanguage = event.target.value
        locale.value = newLanguage
        // Save to localStorage (using same key as i18n.js)
        localStorage.setItem('user-language', newLanguage)
        // Update HTML lang attribute
        document.documentElement.lang = newLanguage
      }
    }
  },
  mounted() {
    // The language is already set by i18n.js, just update HTML lang attribute
    document.documentElement.lang = this.$i18n.locale
  }
}
</script>

<style scoped>
select {
  background-image: none;
}
</style>