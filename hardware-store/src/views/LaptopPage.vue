<script>
import { onBeforeMount } from "vue";
import { useLaptopStore } from "@/stores/laptopStore";
import ProductCard from "@/components/ui/ProductCard.vue";

export default {
  name: "LaptopPage",
  components: {
    ProductCard,
  },
  setup() {
    const laptopStore = useLaptopStore();
    onBeforeMount(() => {
      laptopStore.fetchLaptops();
    });

    return {
      laptopStore,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Laptops
      </h1>

      <div v-if="laptopStore.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>

      <div
        v-if="!laptopStore.loading && laptopStore.laptops.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <ProductCard
          v-for="laptop in laptopStore.laptops"
          :key="laptop._id"
          :id="laptop._id"
          :type="'laptop'"
          :name="laptop.name"
          :price="laptop.price"
          :image="laptop.image"
        />
      </div>

      <div
        v-else-if="!laptopStore.loading && laptopStore.laptops.length === 0"
        class="text-center text-gray-500"
      >
        No laptops available.
      </div>
    </div>
  </div>
</template>
