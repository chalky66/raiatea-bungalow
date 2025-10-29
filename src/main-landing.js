import { createApp } from 'vue'
import LandingPage from './LandingPage.vue'
import i18n from './i18n'
import './styles.css'

const app = createApp(LandingPage)
app.use(i18n)
app.mount('#app')
