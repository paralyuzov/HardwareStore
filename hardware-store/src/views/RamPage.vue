<script>
import { onBeforeMount } from "vue";
import { useRamStores } from "@/stores/ramStores";
import ProductCard from "@/components/ui/ProductCard.vue";

export default {
  name: "RamPage",
  components: {
    ProductCard,
  },
  setup() {
    const ramStore = useRamStores();
    onBeforeMount(() => {
      ramStore.fetchRams();
    });

    return {
      ramStore,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">RAM</h1>
      <div v-if="ramStore.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>

      <div
        v-if="!ramStore.loading && ramStore.rams.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="ram in ramStore.rams"
          :key="ram._id"
          :id="ram._id"
          :type="'ram'"
          :name="ram.name"
          :price="ram.price"
          :image="ram.image"
        />
      </div>

      <div
        v-else-if="!ramStore.loading && ramStore.rams.length === 0"
        class="text-center text-gray-500"
      >
        No RAM products available.
      </div>
    </div>
  </div>
</template>
