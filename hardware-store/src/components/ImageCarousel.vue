<template>
  <swiper
    :modules="[Navigation, Pagination, Autoplay]"
    :autoplay="{ delay: 5000, disableOnInteraction: false }"
    loop
    :pagination="{ clickable: true }"
    slides-per-view="1"
    space-between="30"
    class="w-full mx-auto"
  >

    <swiper-slide
      v-for="(img, i) in images"
      :key="i"
      class="flex items-center justify-center"
    >
      <img
        :src="img"
        :alt="`Slide ${i}`"
        class="h-auto w-full object-cover"
      />
    </swiper-slide>
  </swiper>
</template>

<script>
import { ref } from 'vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

export default {
  name: 'MyImageCarousel',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const images = ref([
    'https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/1413018-am5-ryzen.jpg',
      'https://i.pcmag.com/imagery/articles/0123dP9RxAFybqkUfjsXnr1-7.fit_lim.size_1600x900.v1629318672.jpg',
      'https://www.gigabyte.com/FileUpload/global/news/2038/o202211081401006652.jpg',
      'https://www.trustedreviews.com/wp-content/uploads/sites/54/2023/06/Best-MacBook-1-920x518.jpg',
    ])

    return {
      images,
      Navigation,
      Pagination,
      Autoplay,
    }
  },
}
</script>

<style scoped>
.w-full.max-w-5xl.mx-auto {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
