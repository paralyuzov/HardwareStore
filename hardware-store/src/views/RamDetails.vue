<script>
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useRamStores } from "@/stores/ramStores";
import { useCartStore } from "@/stores/cartStore";
import MessageModal from "@/components/ui/MessageModal.vue";

export default {
  name: "RamDetails",
  components: { MessageModal },
  setup() {
    const route = useRoute();
    const ramStore = useRamStores();
    const cartStore = useCartStore();

    const ram = computed(() => ramStore.selectedRam);
    const loading = computed(() => ramStore.loading);
    const error = computed(() => ramStore.error);

    const isModalVisible = ref(false);
    const modalMessage = ref("");

    const fetchRamDetails = async () => {
      try {
        await ramStore.fetchRamById(route.params.id);
      } catch (err) {
        console.error("Error fetching RAM details:", err);
      }
    };

    const addToCart = () => {
      if (ram.value) {
        const existingItem = cartStore.cartItems.find(
          (item) => item.id === ram.value._id
        );

        if (existingItem) {
          cartStore.updateItemQuantity(ram.value._id, existingItem.quantity + 1);
        } else {
          cartStore.addToCart({
            id: ram.value._id,
            name: ram.value.name,
            price: ram.value.price,
            image: ram.value.image,
            quantity: 1,
          });
        }

        modalMessage.value = `${ram.value.name} has been added to your cart.`;
        isModalVisible.value = true;
      }
    };

    onBeforeMount(fetchRamDetails);

    return {
      ram,
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
      <div v-if="loading" class="text-center text-gray-600">Loading RAM details...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <div v-else-if="ram" class="flex justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <div class="flex justify-center mb-6">
            <img
              v-if="ram.image"
              :src="ram.image"
              :alt="ram.name"
              class="w-96 object-cover rounded-lg"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ ram.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Type:</span>
              {{ ram.type }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Capacity:</span>
              {{ ram.capacity }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Speed:</span>
              {{ ram.speed }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Latency:</span>
              {{ ram.latency }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Voltage:</span>
              {{ ram.voltage }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ ram.price.toFixed(2) }}
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
