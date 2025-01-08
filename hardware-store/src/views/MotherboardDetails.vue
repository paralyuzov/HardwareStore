<script>
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import { useMotherboardStore } from "@/stores/motherboardStore";
import { useCartStore } from "@/stores/cartStore";
import MessageModal from "@/components/ui/MessageModal.vue";

export default {
  name: "MotherboardDetails",
  components: { MessageModal },
  setup() {
    const route = useRoute();
    const motherboardStore = useMotherboardStore();
    const cartStore = useCartStore();

    const motherboard = computed(() => motherboardStore.selectedMotherboard);
    const loading = computed(() => motherboardStore.loading);
    const error = computed(() => motherboardStore.error);

    const isModalVisible = ref(false);
    const modalMessage = ref("");

    const fetchMotherboardDetails = async () => {
      try {
        await motherboardStore.fetchMotherboardById(route.params.id);
      } catch (err) {
        console.error("Error fetching motherboard details:", err);
      }
    };

    const addToCart = () => {
      if (motherboard.value) {
        const existingItem = cartStore.cartItems.find(
          (item) => item.id === motherboard.value._id
        );

        if (existingItem) {
          cartStore.updateItemQuantity(
            motherboard.value._id,
            existingItem.quantity + 1
          );
        } else {
          cartStore.addToCart({
            id: motherboard.value._id,
            name: motherboard.value.name,
            price: motherboard.value.price,
            image: motherboard.value.image,
            quantity: 1,
          });
        }
        modalMessage.value = `${motherboard.value.name} has been added to your cart.`;
        isModalVisible.value = true;
      }
    };

    onBeforeMount(fetchMotherboardDetails);

    return {
      motherboard,
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
      <div v-if="loading" class="text-center text-gray-600">Loading motherboard details...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <div v-else-if="motherboard" class="flex justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <div class="flex justify-center mb-6">
            <img
              v-if="motherboard.image"
              :src="motherboard.image"
              :alt="motherboard.name"
              class="w-96 object-cover rounded-lg"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ motherboard.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Chipset:</span>
              {{ motherboard.chipset }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Socket:</span>
              {{ motherboard.socket }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Form Factor:</span>
              {{ motherboard.form_factor }}
            </li>
            <li>
              <span class="font-bold text-gray-800">RAM Support:</span>
              {{ motherboard.ram_support }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ motherboard.price.toFixed(2) }}
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
