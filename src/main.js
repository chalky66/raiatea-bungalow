import { createApp } from 'vue'
import App from './App.vue'
import './styles.css'
import i18n from './i18n.js'

const app = createApp(App)
app.use(i18n)

// Set HTML lang attribute when locale changes
i18n.global.locale.value && (document.documentElement.lang = i18n.global.locale.value)

// Watch for locale changes and update HTML lang attribute
const originalLocale = i18n.global.locale
if (originalLocale && typeof originalLocale === 'object' && 'value' in originalLocale) {
  // Create a watcher for reactive locale changes
  const updateHtmlLang = () => {
    if (i18n.global.locale.value) {
      document.documentElement.lang = i18n.global.locale.value
    }
  }
  
  // Update immediately and watch for changes
  updateHtmlLang()
  
  // Set up a mutation observer to watch for locale changes
  let currentLocale = i18n.global.locale.value
  setInterval(() => {
    if (i18n.global.locale.value !== currentLocale) {
      currentLocale = i18n.global.locale.value
      updateHtmlLang()
    }
  }, 100)
}

app.mount('#app')