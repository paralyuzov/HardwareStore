<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useVideoCardStore } from "@/stores/videoCardStore";

export default {
  name: "VideoCardDetails",
  setup() {
    const route = useRoute();
    const videoCardStore = useVideoCardStore();

    const videoCard = computed(() =>
      videoCardStore.videoCards.find((vc) => vc._id === route.params.id)
    );

    const addToCart = () => {
      console.log(`Added to cart: ${videoCard.value.name}`);
    };

    return {
      videoCard,
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
              v-if="videoCard?.image"
              :src="videoCard.image"
              :alt="videoCard.name"
              class="w-96 object-cover rounded-lg"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ videoCard?.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Brand:</span>
              {{ videoCard?.brand }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Memory:</span>
              {{ videoCard?.memory }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Core Clock:</span>
              {{ videoCard?.core_clock }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Boost Clock:</span>
              {{ videoCard?.boost_clock }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ videoCard?.price.toFixed(2) }}
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
