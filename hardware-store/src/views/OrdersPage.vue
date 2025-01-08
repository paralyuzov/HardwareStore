<script>
import { computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'OrdersPage',
  setup() {
    const authStore = useAuthStore();

    onMounted(() => {
      authStore.fetchOrders();
    });
    const sortedOrders = computed(() => {
      return [...authStore.orders].sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    });
    const isLoading = computed(() => authStore.loading);
    const error = computed(() => authStore.error);

    return {
      sortedOrders,
      isLoading,
      error,
    };
  },
};
</script>

<template>
  <div class=" mx-auto px-6 py-12 min-h-screen bg-white">
    <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center font-orbitron">Your Orders</h1>

    <div v-if="isLoading" class="text-center">
      <p class="text-lg text-gray-500">Loading orders...</p>
    </div>

    <div v-if="error && !isLoading" class="text-center text-red-600">
      <p>{{ error }}</p>
    </div>

    <div v-if="sortedOrders.length === 0 && !isLoading && !error" class="text-center text-gray-500">
      <p class="text-lg">You have no orders yet.</p>
    </div>

    <div v-else>
      <table class="w-full bg-white border border-gray-300 rounded-lg shadow-lg text-left overflow-hidden">
        <thead>
          <tr class="bg-gray-200 text-gray-600">
            <th class="px-6 py-3">Product Name</th>
            <th class="px-6 py-3">Quantity</th>
            <th class="px-6 py-3">Price</th>
            <th class="px-6 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in sortedOrders" :key="order._id" class="hover:bg-gray-50">
            <td class="px-6 py-4 font-semibold text-gray-700">{{ order.productName }}</td>
            <td class="px-6 py-4">{{ order.quantity }}</td>
            <td class="px-6 py-4 font-semibold text-gray-700">
              ${{ (order.price).toFixed(2) }}
            </td>
            <td class="px-6 py-4">
              {{ new Date(order.purchaseDate).toLocaleDateString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
