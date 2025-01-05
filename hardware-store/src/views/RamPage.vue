<script>
import { onBeforeMount } from "vue";
import { useMotherboardStore } from "@/stores/motherboardStore";
import ProductCard from "@/components/ui/ProductCard.vue";

export default {
  name: "MotherboardPage",
  components: {
    ProductCard,
  },
  setup() {
    const motherboardStore = useMotherboardStore();
    onBeforeMount(() => {
      motherboardStore.fetchMotherboards(); // Fetch motherboards on page load
    });

    return {
      motherboardStore,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Motherboard Catalog
      </h1>

      <div v-if="motherboardStore.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>

      <div
        v-if="!motherboardStore.loading && motherboardStore.motherboards.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="motherboard in motherboardStore.motherboards"
          :key="motherboard._id"
          :id="motherboard._id"
          :type="'motherboard'"
          :name="motherboard.name"
          :price="motherboard.price"
          :image="motherboard.image"
        />
      </div>
      <div
        v-else-if="!motherboardStore.loading && motherboardStore.motherboards.length === 0"
        class="text-center text-gray-500"
      >
        No motherboards available.
      </div>
    </div>
  </div>
</template>
