<template>
  <div class="swiper-container relative rounded-2xl overflow-hidden card-shadow">
    <div class="swiper" ref="swiperRef">
      <div class="swiper-wrapper">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="swiper-slide"
        >
          <img
            :src="image"
            :alt="`Property image ${index + 1}`"
            class="w-full h-64 sm:h-80 md:h-96 object-cover"
            loading="lazy"
          />
        </div>
      </div>
      
      <!-- Navigation arrows -->
      <div class="swiper-button-next">></div>
      <div class="swiper-button-prev"><</div>
      
      <!-- Pagination dots -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import { Swiper } from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  name: 'GalleryCarousel',
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
      swiper: null
    }
  },
  mounted() {
    this.initSwiper()
  },
  beforeUnmount() {
    if (this.swiper) {
      this.swiper.destroy()
    }
  },
  methods: {
    initSwiper() {
      this.swiper = new Swiper(this.$refs.swiperRef, {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          bulletClass: 'swiper-pagination-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active'
        },
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.swiper-container {
  position: relative;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
  background: rgba(0, 0, 0, 0.3);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  transition: all 0.3s ease;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  background: rgba(0, 0, 0, 0.5);
  transform: scale(1.1);
}

:deep(.swiper-button-next::after),
:deep(.swiper-button-prev::after) {
  content: '';
}

:deep(.swiper-pagination) {
  bottom: 20px;
}

:deep(.swiper-pagination-bullet) {
  background: rgba(255, 255, 255, 0.5);
  opacity: 1;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  background: white;
  transform: scale(1.2);
}
</style>