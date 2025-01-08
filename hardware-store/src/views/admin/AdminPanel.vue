<script>
export default {
  name: "AdminPanel",
  setup() {
    const categories = [
      {
        name: "CPUs",
        image: new URL("@/assets/cpu.png", import.meta.url).href,
        route: "/admin/cpus",
      },
      {
        name: "RAMs",
        image: new URL("@/assets/ram.png", import.meta.url).href,
        route: "/admin/rams",
      },
      {
        name: "SSDs",
        image: new URL("@/assets/ssd.png", import.meta.url).href,
        route: "/admin/ssds",
      },
      {
        name: "Motherboards",
        image: new URL("@/assets/motherboard.png", import.meta.url).href,
        route: "/admin/motherboards",
      },
      {
        name: "Laptops",
        image: new URL("@/assets/laptop.png", import.meta.url).href,
        route: "/admin/laptops",
      },
      {
        name: "Video Cards",
        image: new URL("@/assets/graphicscard.png", import.meta.url).href,
        route: "/admin/videocards",
      },
      {
        name: "PSUs",
        image: new URL("@/assets/powersupply.png", import.meta.url).href,
        route: "/admin/psus",
      },
      {
        name: "Users",
        image: new URL("@/assets/users.png", import.meta.url).href,
        route: "/admin/users",
      }
    ];

    return {
      categories,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-8 text-center font-orbitron">Admin Panel</h1>

      <div v-if="$route.path === '/admin'" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="category in categories"
          :key="category.name"
          @click="$router.push(category.route)"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer p-4 flex flex-col items-center text-center hover:scale-105"
        >
          <div class="w-full h-40 flex items-center justify-center mb-4 overflow-hidden rounded-md">
            <img
              :src="category.image"
              :alt="category.name"
              class="w-32 h-auto object-contain"
            />
          </div>

          <h2 class="text-xl font-bold text-gray-800">{{ category.name }}</h2>
        </div>
      </div>

      <router-view v-else />
    </div>
  </div>
</template>
