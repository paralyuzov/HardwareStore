<script>
import { onBeforeMount } from "vue";
import { useSsdStore } from "@/stores/ssdStores";
import ProductCard from "@/components/ui/ProductCard.vue";

export default {
  name: "SsdPage",
  components: {
    ProductCard,
  },
  setup() {
    const ssdStore = useSsdStore();
    onBeforeMount(() => {
      ssdStore.fetchSsds();
    });

    return {
      ssdStore,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">SSD</h1>

      <div v-if="ssdStore.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>

      <div
        v-if="!ssdStore.loading && ssdStore.ssds.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="ssd in ssdStore.ssds"
          :key="ssd._id"
          :id="ssd._id"
          :type="'ssd'"
          :name="ssd.name"
          :price="ssd.price"
          :image="ssd.image"
        />
      </div>

      <div
        v-else-if="!ssdStore.loading && ssdStore.ssds.length === 0"
        class="text-center text-gray-500"
      >
        No SSDs available.
      </div>
    </div>
  </div>
</template>
