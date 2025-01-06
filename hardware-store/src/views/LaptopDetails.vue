<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useLaptopStore } from "@/stores/laptopStore";

export default {
  name: "LaptopDetails",
  setup() {
    const route = useRoute();
    const laptopStore = useLaptopStore();

    const laptop = computed(() =>
      laptopStore.laptops.find((laptop) => laptop._id === route.params.id)
    );

    const addToCart = () => {
      console.log(`Added to cart: ${laptop.value.name}`);
    };

    return {
      laptop,
      addToCart,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <div class="container mx-auto px-6 py-12">
      <div class="flex justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <div class="flex justify-center mb-6">
            <img
              v-if="laptop?.image"
              :src="laptop.image"
              :alt="laptop.name"
              class="w-96 object-cover"
            />
          </div>
          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ laptop?.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Brand:</span>
              {{ laptop?.brand }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Processor:</span>
              {{ laptop?.processor }}
            </li>
            <li>
              <span class="font-bold text-gray-800">RAM:</span>
              {{ laptop?.ram }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Storage:</span>
              {{ laptop?.storage }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Graphics:</span>
              {{ laptop?.graphics }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Screen:</span>
              {{ laptop?.screen }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ laptop?.price.toFixed(2) }}
            </li>
          </ul>

          <button
            @click="addToCart"
            class="w-full px-6 py-4 bg-blue-600 text-white rounded-lg text-xl font-semibold hover:bg-blue-700 hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
