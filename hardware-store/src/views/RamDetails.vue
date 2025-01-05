<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useRamStores } from "@/stores/ramStores";

export default {
  name: "RamDetails",
  setup() {
    const route = useRoute();
    const ramStore = useRamStores();

    const ram = computed(() =>
      ramStore.rams.find((ram) => ram._id === route.params.id)
    );

    const addToCart = () => {
      console.log(`Added to cart: ${ram.value.name}`);
    };

    return {
      ram,
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
              v-if="ram?.image"
              :src="ram.image"
              :alt="ram.name"
              class="w-96 object-cover"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ ram?.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Type:</span>
              {{ ram?.type }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Capacity:</span>
              {{ ram?.capacity }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Speed:</span>
              {{ ram?.speed }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Latency:</span>
              {{ ram?.latency }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Voltage:</span>
              {{ ram?.voltage }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ ram?.price.toFixed(2) }}
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

