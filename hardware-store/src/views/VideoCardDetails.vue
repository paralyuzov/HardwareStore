<script>
import { computed, ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useVideoCardStore } from "@/stores/videoCardStore";
import { useCartStore } from "@/stores/cartStore";
import MessageModal from "@/components/ui/MessageModal.vue";

export default {
  name: "VideoCardDetails",
  components: { MessageModal },
  setup() {
    const route = useRoute();
    const videoCardStore = useVideoCardStore();
    const cartStore = useCartStore();

    const videoCard = computed(() => videoCardStore.selectedVideoCard);
    const loading = computed(() => videoCardStore.loading);
    const error = computed(() => videoCardStore.error);

    const isModalVisible = ref(false);
    const modalMessage = ref("");

    const fetchVideoCardDetails = async () => {
      try {
        await videoCardStore.fetchVideoCardById(route.params.id);
      } catch (err) {
        console.error("Error fetching video card details:", err);
      }
    };

    const addToCart = () => {
      if (videoCard.value) {
        const existingItem = cartStore.cartItems.find(
          (item) => item.id === videoCard.value._id
        );

        if (existingItem) {
          cartStore.updateItemQuantity(
            videoCard.value._id,
            existingItem.quantity + 1
          );
        } else {
          cartStore.addToCart({
            id: videoCard.value._id,
            name: videoCard.value.name,
            price: videoCard.value.price,
            image: videoCard.value.image,
            quantity: 1,
          });
        }
        
        modalMessage.value = `${videoCard.value.name} has been added to your cart.`;
        isModalVisible.value = true;
      }
    };

    onBeforeMount(fetchVideoCardDetails);

    return {
      videoCard,
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
      <div v-if="loading" class="text-center text-gray-600">
        Loading video card details...
      </div>
      <div v-else-if="error" class="text-center text-red-600">
        {{ error }}
      </div>
      <div v-else-if="videoCard" class="flex justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <div class="flex justify-center mb-6">
            <img
              v-if="videoCard.image"
              :src="videoCard.image"
              :alt="videoCard.name"
              class="w-96 object-cover rounded-lg"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Name:</span>
              {{ videoCard.name }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Brand:</span>
              {{ videoCard.brand }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Memory:</span>
              {{ videoCard.memory }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Core Clock:</span>
              {{ videoCard.core_clock }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Boost Clock:</span>
              {{ videoCard.boost_clock }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ videoCard.price.toFixed(2) }}
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
