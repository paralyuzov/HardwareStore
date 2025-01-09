<script>
import { computed } from "vue";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import SearchBar from "./ui/SearchBar.vue";

export default {
  components: { SearchBar },
  setup() {
    const authStore = useAuthStore();
    const cartStore = useCartStore();

    const user = computed(() => authStore.user);
    const isLoggedIn = computed(() => !!authStore.user);
    const isAdmin = computed(() => authStore.user?.roles.includes("admin"));
    const cartItemCount = computed(() => cartStore.cartItems.length);

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

      <SearchBar />

      <div class="flex items-center space-x-10 font-serif">

        <div class="relative group">
          <p class="text-white focus:outline-none cursor-pointer bg-blue-500 px-4 py-2 rounded-xl">
            PRODUCTS
          </p>
          <div class="absolute hidden group-hover:block -right-20 pt-1 w-48 border bg-white rounded-md shadow-lg z-50">
            <router-link to="/catalog/laptop" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              Laptops
            </router-link>
            <router-link to="/catalog/cpu" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              CPU
            </router-link>
            <router-link to="/catalog/motherboard" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              Motherboards
            </router-link>
            <router-link to="/catalog/ram" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              RAM
            </router-link>
            <router-link to="/catalog/ssd" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              SSD
            </router-link>
            <router-link to="/catalog/videocard" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              Video Cards
            </router-link>
            <router-link to="/catalog/psu" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              PSU
            </router-link>
          </div>
        </div>

        <div class="relative group">
          <div v-if="isLoggedIn" class="flex items-center space-x-2 cursor-pointer focus:outline-none bg-blue-500 px-4 py-2 rounded-xl text-white">
            <i class="fa-solid fa-user"></i>
            <span>{{ user?.username || 'User' }}</span>
          </div>
          <div v-else class="flex items-center space-x-2 cursor-pointer focus:outline-none  bg-blue-500 px-4 py-2 rounded-xl text-white">
            <i class="fa-solid fa-user"></i>
            <span>Guest</span>
          </div>
          <div class="absolute hidden group-hover:block -right-20 pt-1 border w-48 bg-white rounded-md shadow-lg z-50">
            <router-link v-if="isAdmin" to="/admin" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              Admin Panel
            </router-link>
            <router-link v-if="isLoggedIn" to="/orders" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              Orders
            </router-link>
            <router-link v-if="isLoggedIn" to="/profile" class="block px-4 py-2 text-black rounded-2xl hover:bg-blue-500 hover:text-white">
              Profile
            </router-link>
            <a v-else href="/login" class="block px-4 py-2 text-black hover:bg-blue-500 rounded-2xl hover:text-white">
              Login
            </a>
            <button v-if="isLoggedIn" @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-black hover:bg-blue-500 rounded-2xl hover:text-white">
              Logout
            </button>
          </div>
        </div>
        <div class="relative group bg-sky-100 p-4 rounded-full">
          <router-link to="/cart" class="flex items-center space-x-2 cursor-pointer">
            <i class="fa-solid fa-cart-shopping text-gray-700 hover:scale-105"></i>
            <div v-if="cartItemCount > 0" class="absolute top-7 left-7 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
              {{ cartItemCount }}
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>
