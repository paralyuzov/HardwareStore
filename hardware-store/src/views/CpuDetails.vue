<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useCpuStore } from "@/stores/cpuStores";

export default {
  name: "CpuDetails",
  setup() {
    const route = useRoute();
    const cpuStore = useCpuStore();

    const cpu = computed(() =>
      cpuStore.cpus.find((cpu) => cpu._id === route.params.id)
    );

    const addToCart = () => {
      console.log(`Added to cart: ${cpu.value.name}`);
    };

    return {
      cpu,
      addToCart,
    };
  },
};
</script>


<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <div class="container mx-auto px-6 py-12">
      <!-- Main Layout -->
      <div class="flex justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <!-- Image Section -->
          <div class="flex justify-center mb-6">
            <img
              v-if="cpu?.image"
              :src="cpu.image"
              :alt="cpu.name"
              class="w-96  object-cover"
            />
          </div>

          <!-- Price -->


          <!-- CPU Properties -->
          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Brand:</span>
              {{ cpu?.brand }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Model:</span>
              {{ cpu?.model }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Cores:</span>
              {{ cpu?.cores }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Threads:</span>
              {{ cpu?.threads }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Base Clock:</span>
              {{ cpu?.base_clock }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Boost Clock:</span>
              {{ cpu?.boost_clock }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Socket:</span>
              {{ cpu?.socket }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{  cpu?.price.toFixed(2) }}
            </li>
          </ul>

          <!-- Add to Cart Button -->
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

