<script>
import CategoriesSection from '@/components/CategoriesSection.vue';
import ImageCarousel from '@/components/ImageCarousel.vue';

export default {
  name: 'HomeView',
  components: {
    ImageCarousel,
    CategoriesSection
  },
};
</script>

<template>

      <ImageCarousel />
      <CategoriesSection/>

</template>
