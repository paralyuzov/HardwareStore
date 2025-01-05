<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSsdStore } from "@/stores/ssdStores";

export default {
  name: "SsdDetails",
  setup() {
    const route = useRoute();
    const ssdStore = useSsdStore();

    const ssd = computed(() =>
      ssdStore.ssds.find((ssd) => ssd._id === route.params.id)
    );

    const addToCart = () => {
      console.log(`Added to cart: ${ssd.value.name}`);
    };

    return {
      ssd,
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
              v-if="ssd?.image"
              :src="ssd.image"
              :alt="ssd.name"
              class="w-96 object-cover rounded-lg"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ ssd?.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Type:</span>
              {{ ssd?.type }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Capacity:</span>
              {{ ssd?.capacity }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Interface:</span>
              {{ ssd?.interface }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Read Speed:</span>
              {{ ssd?.read_speed }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Write Speed:</span>
              {{ ssd?.write_speed }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ ssd?.price.toFixed(2) }}
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
