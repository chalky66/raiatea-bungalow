import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'

const messages = {
  en,
  fr
}

// French-speaking countries and territories (ISO 3166-1 alpha-2 codes)
const FRENCH_SPEAKING_COUNTRIES = [
  'FR', // France
  'BE', // Belgium
  'CH', // Switzerland
  'CA', // Canada
  'MC', // Monaco
  'LU', // Luxembourg
  'CI', // Côte d'Ivoire
  'SN', // Senegal
  'ML', // Mali
  'BF', // Burkina Faso
  'NE', // Niger
  'TD', // Chad
  'MG', // Madagascar
  'CM', // Cameroon
  'CD', // Democratic Republic of Congo
  'CG', // Republic of Congo
  'CF', // Central African Republic
  'GA', // Gabon
  'GQ', // Equatorial Guinea
  'DJ', // Djibouti
  'KM', // Comoros
  'VU', // Vanuatu
  'PF', // French Polynesia
  'NC', // New Caledonia
  'WF', // Wallis and Futuna
  'PM', // Saint Pierre and Miquelon
  'BL', // Saint Barthélemy
  'MF', // Saint Martin
  'GP', // Guadeloupe
  'MQ', // Martinique
  'GF', // French Guiana
  'RE', // Réunion
  'YT', // Mayotte
  'TF', // French Southern Territories
  'HT', // Haiti
  'SC', // Seychelles
  'RW', // Rwanda
  'BI'  // Burundi
]

// Function to detect user's country and determine appropriate language
async function detectUserLanguage() {
  // Check if language is already stored in localStorage
  const storedLanguage = localStorage.getItem('user-language')
  if (storedLanguage && ['en', 'fr'].includes(storedLanguage)) {
    console.log('Using stored language preference:', storedLanguage)
    return storedLanguage
  }

  console.log('First visit detected, determining language...')

  // First, try browser language as it's instant
  const browserLanguage = navigator.language || navigator.languages?.[0]
  if (browserLanguage) {
    const languageCode = browserLanguage.split('-')[0].toLowerCase()
    if (languageCode === 'fr') {
      console.log('French browser language detected:', browserLanguage)
      localStorage.setItem('user-language', 'fr')
      return 'fr'
    }
  }

  try {
    // Try to get user's country from IP geolocation for more accuracy
    console.log('Detecting user location for language preference...')
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout
    
    const response = await fetch('https://ipapi.co/json/', {
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      const data = await response.json()
      const countryCode = data.country_code
      
      console.log('Detected country:', countryCode)
      
      if (countryCode && FRENCH_SPEAKING_COUNTRIES.includes(countryCode)) {
        console.log('French-speaking country detected, setting language to French')
        localStorage.setItem('user-language', 'fr')
        return 'fr'
      } else {
        console.log('Non-French speaking country, defaulting to English')
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Geolocation request timed out, using browser language fallback')
    } else {
      console.log('Geolocation detection failed:', error.message)
    }
  }

  // Default to English
  console.log('Setting default language to English')
  localStorage.setItem('user-language', 'en')
  return 'en'
}

// Get initial locale
const getInitialLocale = async () => {
  return await detectUserLanguage()
}

// Create i18n instance with default locale (will be updated after detection)
const i18n = createI18n({
  locale: 'en', // temporary default, will be updated
  fallbackLocale: 'en',
  messages,
  legacy: false,
  globalInjection: true
})

// Initialize locale detection
getInitialLocale().then(detectedLocale => {
  i18n.global.locale.value = detectedLocale
})

export default i18n