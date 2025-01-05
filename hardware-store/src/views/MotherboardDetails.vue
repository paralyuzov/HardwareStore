<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useMotherboardStore } from "@/stores/motherboardStore";

export default {
  name: "MotherboardDetails",
  setup() {
    const route = useRoute();
    const motherboardStore = useMotherboardStore();

    const motherboard = computed(() =>
      motherboardStore.motherboards.find((mb) => mb._id === route.params.id)
    );

    const addToCart = () => {
      console.log(`Added to cart: ${motherboard.value.name}`);
    };

    return {
      motherboard,
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
              v-if="motherboard?.image"
              :src="motherboard.image"
              :alt="motherboard.name"
              class="w-96 object-cover"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ motherboard?.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Chipset:</span>
              {{ motherboard?.chipset }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Socket:</span>
              {{ motherboard?.socket }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Form Factor:</span>
              {{ motherboard?.form_factor }}
            </li>
            <li>
              <span class="font-bold text-gray-800">RAM Support:</span>
              {{ motherboard?.ram_support }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ motherboard?.price.toFixed(2) }}
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
