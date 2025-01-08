<script>
import { computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore"; // Assuming you have a cart store

export default {
  setup() {
    const authStore = useAuthStore();
    const cartStore = useCartStore(); // Cart Store for tracking cart items

    const user = computed(() => authStore.user);
    const isLoggedIn = computed(() => !!authStore.user);
    const isAdmin = computed(() => authStore.user?.roles.includes("admin"));
    const cartItemCount = computed(() => cartStore.cartItems.length); // Track cart items count

    const handleLogout = () => {
      authStore.logout();
    };

    return {
      user,
      isLoggedIn,
      isAdmin,
      cartItemCount,
      handleLogout,
    };
  },
};
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <router-link to="/" class="text-2xl font-bold text-gray-800 font-orbitron">HardwareStore</router-link>

      <div class="hidden md:flex items-center space-x-4">
        <input type="text" placeholder="Search for products..."
          class="w-96 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Search
        </button>
      </div>

      <div class="flex items-center space-x-10 font-serif">

        <div class="relative group">
          <p class="text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer">
            PRODUCTS
          </p>
          <div class="absolute hidden group-hover:block -right-20 pt-1 w-48 border bg-white rounded-md shadow-lg z-50">
            <router-link to="/catalog/laptop" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Laptops
            </router-link>
            <router-link to="/catalog/cpu" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              CPU
            </router-link>
            <router-link to="/catalog/motherboard" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Motherboards
            </router-link>
            <router-link to="/catalog/ram" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              RAM
            </router-link>
            <router-link to="/catalog/ssd" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              SSD
            </router-link>
            <router-link to="/catalog/videocard" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Video Cards
            </router-link>
            <router-link to="/catalog/psu" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              PSU
            </router-link>
          </div>
        </div>

        <div class="relative group">
          <div v-if="isLoggedIn" class="flex items-center space-x-2 cursor-pointer focus:outline-none">
            <i class="fa-solid fa-user"></i>
            <span>{{ user?.username || 'User' }}</span>
          </div>
          <div v-else class="flex items-center space-x-2 cursor-pointer focus:outline-none">
            <i class="fa-solid fa-user"></i>
            <span>Guest</span>
          </div>
          <div class="absolute hidden group-hover:block -right-20 pt-1 border w-48 bg-white rounded-md shadow-lg z-50">
            <router-link v-if="isAdmin" to="/admin" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Admin Panel
            </router-link>
            <a v-if="isLoggedIn" href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Orders
            </a>
            <a v-if="isLoggedIn" href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </a>
            <a v-else href="/login" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Login
            </a>
            <button v-if="isLoggedIn" @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </div>
        <div class="relative group bg-sky-100 p-2 rounded-full">
          <router-link to="/cart" class="flex items-center space-x-2 cursor-pointer">
            <i class="fa-solid fa-cart-shopping text-gray-700 hover:scale-105"></i>
            <div v-if="cartItemCount > 0" class="absolute top-5 left-5 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              {{ cartItemCount }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
