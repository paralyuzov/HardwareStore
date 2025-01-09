<script>
import { computed, ref } from "vue";
import { useCartStore } from "@/stores/cartStore";
import InputField from "@/components/ui/InputField.vue";
import MessageModal from "@/components/ui/MessageModal.vue";

export default {
  components: {
    InputField,
    MessageModal,
  },
  setup() {
    const cartStore = useCartStore();
    const cartItems = computed(() => cartStore.cartItems);
    const totalPrice = computed(() => cartStore.totalPrice);
    const isModalVisible = ref(false);
    const modalMessage = ref("");
    const modalType = ref("error");

    const updateQuantity = (id, quantity) => {
      if (quantity < 1) return;
      cartStore.updateItemQuantity(id, quantity);
    };

    const removeItem = (id) => {
      cartStore.removeItemFromCart(id);
    };

    const clearCart = () => {
      cartStore.clearCart();
    };

    const handlePayment = async () => {
      try {
        await cartStore.handlePayment();
      } catch (error) {
        console.error("Error during payment:", error.message || error);
        modalMessage.value = "Payment failed. Please try again.";
        isModalVisible.value = true;
      }
    };

    return {
      cartItems,
      totalPrice,
      updateQuantity,
      removeItem,
      clearCart,
      handlePayment,
      isModalVisible,
      modalMessage,
      modalType,
    };
  },
};
</script>

<template>
  <div class="mx-auto px-6 py-12 bg-white text-center min-h-screen">
    <h1 class="text-4xl font-bold text-gray-800 mb-8">CART</h1>

    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      <p class="text-lg">Your cart is empty.</p>
    </div>

    <div v-else>
      <table class="w-full bg-white border border-gray-300 rounded-lg shadow-lg text-left overflow-hidden">
        <thead>
          <tr class="bg-gray-200 text-gray-600">
            <th class="px-6 py-3">Product</th>
            <th class="px-6 py-3">Quantity</th>
            <th class="px-6 py-3">Price</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cartItems" :key="item.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-semibold text-gray-700">
              <div class="flex items-center space-x-4">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-12 h-12 object-cover rounded-md"
                />
                <span>{{ item.name }}</span>
              </div>
            </td>
            <td class="px-6 py-4">
              <InputField
                :id="`quantity-${item.id}`"
                label=""
                type="number"
                :modelValue="item.quantity"
                @update:modelValue="updateQuantity(item.id, $event)"
                placeholder="Enter quantity"
                class="w-20"
                :min="1"
              />
            </td>
            <td class="px-6 py-4 font-semibold text-gray-700">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </td>
            <td class="px-6 py-4">
              <button
                @click="removeItem(item.id)"
                class="text-red-600 hover:text-red-800 font-medium"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="mt-8 flex flex-col sm:flex-row justify-between items-center">
        <div class="text-2xl font-bold text-gray-800">
          Total: <span class="text-blue-600">${{ totalPrice.toFixed(2) }}</span>
        </div>

        <div class="flex space-x-4 mt-4 sm:mt-0">
          <button
            @click="clearCart"
            class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            CLEAR CART
          </button>
          <button
            @click="handlePayment"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>

    <MessageModal
      v-if="isModalVisible"
      :message="modalMessage"
      :type="modalType"
      @close="isModalVisible = false"
    />
  </div>
</template>
