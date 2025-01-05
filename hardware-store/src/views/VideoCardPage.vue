<script>
import { onBeforeMount } from "vue";
import { useVideoCardStore } from "@/stores/videoCardStore";
import ProductCard from "@/components/ui/ProductCard.vue";

export default {
  name: "VideoCardPage",
  components: {
    ProductCard,
  },
  setup() {
    const videoCardStore = useVideoCardStore();
    onBeforeMount(() => {
      videoCardStore.fetchVideoCards();
    });

    return {
      videoCardStore,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Video Cards
      </h1>

      <div v-if="videoCardStore.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>

      <div
        v-if="!videoCardStore.loading && videoCardStore.videoCards.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="videoCard in videoCardStore.videoCards"
          :key="videoCard._id"
          :id="videoCard._id"
          :type="'videocard'"
          :name="videoCard.name"
          :price="videoCard.price"
          :image="videoCard.image"
        />
      </div>

      <div
        v-else-if="!videoCardStore.loading && videoCardStore.videoCards.length === 0"
        class="text-center text-gray-500"
      >
        No video cards available.
      </div>
    </div>
  </div>
</template>
