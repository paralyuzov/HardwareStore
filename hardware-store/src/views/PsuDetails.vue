<script>
import {  onBeforeMount, computed } from "vue";
import { useRoute } from "vue-router";
import { usePsuStore } from "@/stores/psuStore";
import { useCartStore } from "@/stores/cartStore";

export default {
  name: "PsuDetails",
  setup() {
    const route = useRoute();
    const psuStore = usePsuStore();
    const cartStore = useCartStore();

    const psu = computed(() => psuStore.selectedPsu);
    const loading = computed(() => psuStore.loading);
    const error = computed(() => psuStore.error);

    const fetchPsuDetails = async () => {
      try {
        await psuStore.fetchPsuById(route.params.id);
      } catch (err) {
        console.error("Error fetching PSU details:", err);
      }
    };

    const addToCart = () => {
      if (psu.value) {
        const existingItem = cartStore.cartItems.find(
          (item) => item.id === psu.value._id
        );

        if (existingItem) {
          cartStore.updateItemQuantity(psu.value._id, existingItem.quantity + 1);
        } else {
          cartStore.addToCart({
            id: psu.value._id,
            name: psu.value.name,
            price: psu.value.price,
            quantity: 1,
          });
        }
      }
    };

    onBeforeMount(fetchPsuDetails);

    return {
      psu,
      loading,
      error,
      addToCart,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <div class="container mx-auto px-6 py-12">
      <div v-if="loading" class="text-center text-gray-600">Loading PSU details...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <div v-else-if="psu" class="flex justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <div class="flex justify-center mb-6">
            <img
              v-if="psu.image"
              :src="psu.image"
              :alt="psu.name"
              class="w-96 object-cover rounded-lg"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ psu.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Brand:</span>
              {{ psu.brand }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Wattage:</span>
              {{ psu.wattage }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Efficiency:</span>
              {{ psu.efficiency }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Modularity:</span>
              {{ psu.modularity }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ psu.price.toFixed(2) }}
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
