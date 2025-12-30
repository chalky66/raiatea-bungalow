import { createApp } from 'vue'
import App from './App.vue'
import i18n from './i18n'
import './styles.css'

// Import pool property data
import propertyData from './data/property-pool.json'
import propertyI18n from './data/property-pool-i18n.json'

const app = createApp(App, {
  propertyType: 'pool'
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
