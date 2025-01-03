<script>
import { computed } from "vue";
import { useAuthStore } from "@/stores/authStore";

export default {
  setup() {
    const authStore = useAuthStore();

    // Computed properties to access user state
    const user = computed(() => authStore.user);
    const isLoggedIn = computed(() => !!authStore.user); // User is logged in if user exists
    const isAdmin = computed(() => authStore.user?.roles.includes("admin")); // Check if user is admin

    const handleLogout = () => {
      authStore.logout(); // Call logout action from authStore
    };

    return {
      user,
      isLoggedIn,
      isAdmin,
      handleLogout,
    };
  },
};
</script>

<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-6 py-3 flex justify-between items-center">
      <!-- Logo -->
      <a href="/" class="text-2xl font-bold text-gray-800 font-orbitron">HardwareStore</a>

      <!-- Search Bar -->
      <div class="hidden md:flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search for products..."
          class="w-96 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Search
        </button>
      </div>

      <!-- Menu Items -->
      <div class="flex items-center space-x-10 font-serif">
        <!-- Products Dropdown -->
        <div class="relative group">
          <a href="#" class="text-gray-700 hover:text-gray-900 focus:outline-none">
            PRODUCTS
          </a>
          <div class="absolute hidden group-hover:block -right-20 pt-1 w-48 border bg-white rounded-md shadow-lg z-50">
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Laptops</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">CPU</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Motherboards</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">RAM</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">SSD</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Video Cards</a>
            <a href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">Accessories</a>
          </div>
        </div>

        <!-- Profile Dropdown -->
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
            <!-- Admin Panel -->
            <a v-if="isAdmin" href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Admin Panel
            </a>
            <!-- Orders -->
            <a v-if="isLoggedIn" href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Orders
            </a>
            <!-- Settings -->
            <a v-if="isLoggedIn" href="#" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Settings
            </a>
            <!-- Login -->
            <a v-else href="/login" class="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              Login
            </a>
            <!-- Logout -->
            <button
              v-if="isLoggedIn"
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


