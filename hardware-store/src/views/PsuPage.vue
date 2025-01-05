<script>
import { onBeforeMount } from "vue";
import { usePsuStore } from "@/stores/psuStore";
import ProductCard from "@/components/ui/ProductCard.vue";

export default {
  name: "PsuPage",
  components: {
    ProductCard,
  },
  setup() {
    const psuStore = usePsuStore();
    onBeforeMount(() => {
      psuStore.fetchPsus();
    });

    return {
      psuStore,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        PSU
      </h1>

      <div v-if="psuStore.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>

      <div
        v-if="!psuStore.loading && psuStore.psus.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="psu in psuStore.psus"
          :key="psu._id"
          :id="psu._id"
          :type="'psu'"
          :name="psu.name"
          :price="psu.price"
          :image="psu.image"
        />
      </div>

      <div
        v-else-if="!psuStore.loading && psuStore.psus.length === 0"
        class="text-center text-gray-500"
      >
        No PSU products available.
      </div>
    </div>
  </div>
</template>
