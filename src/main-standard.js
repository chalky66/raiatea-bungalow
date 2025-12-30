import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import './styles.css'

// Import standard property data
import propertyData from './data/property-standard.json'
import propertyI18n from './data/property-standard-i18n.json'

const app = createApp(App, {
  propertyType: 'standard'
})

// Override property data before mounting
app.mixin({
  beforeCreate() {
    if (this.$options.name === 'App') {
      this.$options.data = function() {
        return {
          property: propertyData,
          propertyI18n: propertyI18n
        }
      }
    }
  }
})

app.use(i18n)
app.mount('#app')
