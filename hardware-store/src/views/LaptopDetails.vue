<script>
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useLaptopStore } from "@/stores/laptopStore";
import { useCartStore } from "@/stores/cartStore";
import MessageModal from "@/components/ui/MessageModal.vue";

export default {
  name: "LaptopDetails",
  components: { MessageModal },
  setup() {
    const route = useRoute();
    const laptopStore = useLaptopStore();
    const cartStore = useCartStore();

    const laptop = computed(() => laptopStore.selectedLaptop);
    const loading = computed(() => laptopStore.loading);
    const error = computed(() => laptopStore.error);

    const isModalVisible = ref(false);
    const modalMessage = ref("");

    const fetchLaptopDetails = async () => {
      try {
        await laptopStore.fetchLaptopById(route.params.id);
      } catch (err) {
        console.error("Error fetching laptop details:", err);
      }
    };

    const addToCart = () => {
      if (laptop.value) {
        const existingItem = cartStore.cartItems.find(
          (item) => item.id === laptop.value._id
        );

        if (existingItem) {
          cartStore.updateItemQuantity(
            laptop.value._id,
            existingItem.quantity + 1
          );
        } else {
          cartStore.addToCart({
            id: laptop.value._id,
            name: laptop.value.name,
            price: laptop.value.price,
            image: laptop.value.image,
            quantity: 1,
          });
        }
        modalMessage.value = `${laptop.value.name} has been added to your cart.`;
        isModalVisible.value = true;
      }
    };

    onBeforeMount(fetchLaptopDetails);

    return {
      laptop,
      loading,
      error,
      addToCart,
      isModalVisible,
      modalMessage,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <div class="container mx-auto px-6 py-12">
      <div v-if="loading" class="text-center text-gray-600">Loading laptop details...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <div v-else-if="laptop" class="flex justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <div class="flex justify-center mb-6">
            <img
              v-if="laptop.image"
              :src="laptop.image"
              :alt="laptop.name"
              class="w-96 object-cover rounded-lg"
            />
          </div>
          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ laptop.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Brand:</span>
              {{ laptop.brand }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Processor:</span>
              {{ laptop.processor }}
            </li>
            <li>
              <span class="font-bold text-gray-800">RAM:</span>
              {{ laptop.ram }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Storage:</span>
              {{ laptop.storage }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Graphics:</span>
              {{ laptop.graphics }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Screen:</span>
              {{ laptop.screen }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ laptop.price.toFixed(2) }}
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

    <MessageModal
      :visible="isModalVisible"
      :message="modalMessage"
      type="success"
      @close="isModalVisible = false"
    />
  </div>
</template>
