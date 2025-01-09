
<script>
import { useRouter } from "vue-router";

export default {
  name: "CategoriesSection",
  setup() {
    const router = useRouter();

    const categories = [
      {
        id: 1,
        name: "CPUs",
        image: new URL("@/assets/cpu.png", import.meta.url).href,
        route: "/catalog/cpu",
      },
      {
        id: 2,
        name: "RAM",
        image: new URL("@/assets/ram.png", import.meta.url).href,
        route: "/catalog/ram",
      },
      {
        id: 3,
        name: "Motherboards",
        image: new URL("@/assets/motherboard.png", import.meta.url).href,
        route: "/catalog/motherboard",
      },
      {
        id: 4,
        name: "SSDs",
        image: new URL("@/assets/ssd.png", import.meta.url).href,
        route: "/catalog/ssd",
      },
      {
        id: 5,
        name: "Video Cards",
        image: new URL("@/assets/graphicscard.png", import.meta.url).href,
        route: "/catalog/videocard",
      },
      {
        id: 6,
        name: "PSUs",
        image: new URL("@/assets/powersupply.png", import.meta.url).href,
        route: "/catalog/psu",
      },
      {
        id: 7,
        name: "Laptops",
        image: new URL("@/assets/laptop.png", import.meta.url).href,
        route: "/catalog/laptop",
      },
    ];

    const navigateToCategory = (route) => {
      router.push(route);
    };

    return {
      categories,
      navigateToCategory,
    };
  },
};
</script>

<template>
  <section class="categories py-8 bg-gray-50 px-4">
    <h2 class="text-3xl font-bold text-center mb-8 font-orbitron">SHOP BY CATEGORY</h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6 container mx-auto">
      <div
        v-for="category in categories"
        :key="category.id"
        class="category-card bg-white shadow-md rounded-lg p-4 flex flex-col items-center hover:scale-105 transition-transform"
        @click="navigateToCategory(category.route)"
      >
        <img
          :src="category.image"
          :alt="category.name"
          class="w-40 h-40 object-cover mb-4"
        />
        <h3 class="text-lg font-medium text-gray-800">{{ category.name }}</h3>
      </div>
    </div>
  </section>
</template>



