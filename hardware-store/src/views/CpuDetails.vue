<script>
import { onBeforeMount, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cartStore";
import { useCpuStore } from "@/stores/cpuStores";
import MessageModal from "@/components/ui/MessageModal.vue";

export default {
  name: "CpuDetails",
  components: { MessageModal },
  setup() {
    const route = useRoute();
    const cpuStore = useCpuStore();
    const cartStore = useCartStore();

    const cpu = computed(() => cpuStore.selectedCpu);
    const loading = computed(() => cpuStore.loading);
    const error = computed(() => cpuStore.error);

    const isModalVisible = ref(false);
    const modalMessage = ref("");

    const fetchCpuDetails = async () => {
      try {
        await cpuStore.fetchCpuById(route.params.id);
      } catch (err) {
        console.error("Error fetching CPU details:", err);
      }
    };

    const addToCart = () => {
      if (cpu.value) {
        const existingItem = cartStore.cartItems.find(
          (item) => item.id === cpu.value._id
        );

        if (existingItem) {
          cartStore.updateItemQuantity(cpu.value._id, existingItem.quantity + 1);
        } else {
          cartStore.addToCart({
            id: cpu.value._id,
            name: cpu.value.model,
            price: cpu.value.price,
            image: cpu.value.image,
            quantity: 1,
          });
        }
        
        modalMessage.value = `${cpu.value.model} has been added to your cart.`;
        isModalVisible.value = true;
      }
    };

    onBeforeMount(fetchCpuDetails);

    return {
      cpu,
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
      <div v-if="loading" class="text-center text-gray-600">Loading CPU details...</div>
      <div v-else-if="error" class="text-center text-red-600">{{ error }}</div>
      <div v-else-if="cpu" class="flex justify-center">
        <div class="bg-white p-8 rounded-xl shadow-lg max-w-3xl w-full">
          <div class="flex justify-center mb-6">
            <img
              v-if="cpu.image"
              :src="cpu.image"
              :alt="cpu.model"
              class="w-96 object-cover rounded-lg"
            />
          </div>

          <ul class="text-lg text-gray-700 space-y-4 mb-8">
            <li>
              <span class="font-bold text-gray-800">Brand:</span>
              {{ cpu.brand }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Model:</span>
              {{ cpu.model }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Cores:</span>
              {{ cpu.cores }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Threads:</span>
              {{ cpu.threads }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Base Clock:</span>
              {{ cpu.base_clock }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Boost Clock:</span>
              {{ cpu.boost_clock }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Socket:</span>
              {{ cpu.socket }}
            </li>
            <li>
              <span class="font-bold text-gray-800">Price:</span>
              ${{ cpu.price.toFixed(2) }}
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
