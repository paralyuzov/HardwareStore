<script>
import { computed, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useSsdStore } from "@/stores/ssdStores";
import { useCartStore } from "@/stores/cartStore";
import MessageModal from "@/components/ui/MessageModal.vue";

export default {
  name: "SsdDetails",
  components: { MessageModal },
  setup() {
    const route = useRoute();
    const ssdStore = useSsdStore();
    const cartStore = useCartStore();

    const ssd = computed(() => ssdStore.selectedSsd);
    const loading = computed(() => ssdStore.loading);
    const error = computed(() => ssdStore.error);

    const isModalVisible = ref(false);
    const modalMessage = ref("");

    const fetchSsdDetails = async () => {
      try {
        await ssdStore.fetchSsdById(route.params.id);
      } catch (err) {
        console.error("Error fetching SSD details:", err);
      }
    };

    const addToCart = () => {
      if (ssd.value) {
        const existingItem = cartStore.cartItems.find(
          (item) => item.id === ssd.value._id
        );

        if (existingItem) {
          cartStore.updateItemQuantity(ssd.value._id, existingItem.quantity + 1);
        } else {
          cartStore.addToCart({
            id: ssd.value._id,
            name: ssd.value.name,
            price: ssd.value.price,
            image: ssd.value.image,
            quantity: 1,
          });
        }

        modalMessage.value = `${ssd.value.name} has been added to your cart.`;
        isModalVisible.value = true;
      }
    };

    onBeforeMount(fetchSsdDetails);

    return {
      ssd,
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
      <div v-if="loading" class="text-center text-gray-600">Loading SSD details...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <div v-else-if="ssd" class="flex justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <div class="flex justify-center mb-6">
            <img
              v-if="ssd.image"
              :src="ssd.image"
              :alt="ssd.name"
              class="w-96 object-cover rounded-lg"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ ssd.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Type:</span>
              {{ ssd.type }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Capacity:</span>
              {{ ssd.capacity }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Interface:</span>
              {{ ssd.interface }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Read Speed:</span>
              {{ ssd.read_speed }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Write Speed:</span>
              {{ ssd.write_speed }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ ssd.price.toFixed(2) }}
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
