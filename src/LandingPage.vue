<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
    <!-- Header -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">{{ $t('landing.title') }}</h1>
            <p class="text-gray-600 mt-1">📍 {{ $t('landing.location') }}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('landing.subtitle') }}</h2>
        <p class="text-xl text-gray-600">{{ $t('landing.description') }}</p>
      </div>

      <!-- Property Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- Bungalow with Pool -->
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div class="aspect-video bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-8xl">🏊</span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ $t('landing.poolBungalow.name') }}</h3>
            <p class="text-gray-600 mb-4">{{ $t('landing.poolBungalow.description') }}</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center text-gray-700">
                <span class="mr-2">🏊</span>
                {{ $t('landing.poolBungalow.feature1') }}
              </li>
              <li class="flex items-center text-gray-700">
                <span class="mr-2">🚴</span>
                {{ $t('landing.poolBungalow.feature2') }}
              </li>
              <li class="flex items-center text-gray-700">
                <span class="mr-2">🏡</span>
                {{ $t('landing.poolBungalow.feature3') }}
              </li>
            </ul>
            <a
              href="/bungalow-with-pool.html"
              class="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-center btn-transition"
            >
              {{ $t('landing.viewProperty') }}
            </a>
          </div>
        </div>

        <!-- Standard Bungalow -->
        <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div class="aspect-video bg-gradient-to-br from-green-400 to-green-600 relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="text-8xl">🌴</span>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ $t('landing.standardBungalow.name') }}</h3>
            <p class="text-gray-600 mb-4">{{ $t('landing.standardBungalow.description') }}</p>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center text-gray-700">
                <span class="mr-2">🌿</span>
                {{ $t('landing.standardBungalow.feature1') }}
              </li>
              <li class="flex items-center text-gray-700">
                <span class="mr-2">🚴</span>
                {{ $t('landing.standardBungalow.feature2') }}
              </li>
              <li class="flex items-center text-gray-700">
                <span class="mr-2">🏡</span>
                {{ $t('landing.standardBungalow.feature3') }}
              </li>
            </ul>
            <a
              href="/bungalow.html"
              class="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg text-center btn-transition"
            >
              {{ $t('landing.viewProperty') }}
            </a>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-16 text-center">
        <p class="text-gray-600 text-lg">{{ $t('landing.contactInfo') }}</p>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white mt-16 py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
        <p>{{ $t('landing.footer') }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import LanguageSwitcher from './components/LanguageSwitcher.vue'

export default {
  name: 'LandingPage',
  components: {
    LanguageSwitcher
  }
}
</script>

<style scoped>
.btn-transition {
  transition: all 0.2s ease-in-out;
}
</style>
