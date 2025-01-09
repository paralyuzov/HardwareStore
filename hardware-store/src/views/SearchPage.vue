<script>
import ProductCard from "@/components/ui/ProductCard.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "@/services/api";

export default {
  name: "SearchResults",
  components: {
    ProductCard,
  },
  setup() {
    const route = useRoute();
    const products = ref([]);
    const isLoading = ref(false);
    const error = ref("");
    const type = route.query.category.slice(0,-1);

    const fetchProducts = async () => {
      try {
        isLoading.value = true;
        error.value = "";
        const { category, q } = route.query;

        const queryParams = new URLSearchParams();
        if (category) queryParams.append("category", category);
        if (q) queryParams.append("q", q);

        const response = await axios.get(`/search?${queryParams.toString()}`);
        products.value = response.data;
      } catch (err) {
        console.log(err);
        error.value = "Failed to fetch products. Please try again.";
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(fetchProducts);
    watch(() => route.query, fetchProducts);

    return {
      products,
      isLoading,
      error,
      type
    };
  },
};
</script>

<template>
  <div class="container mx-auto px-6 py-12 bg-white">
    <h1 class="text-2xl font-bold mb-6 text-center font-orbitron">Search Results</h1>
    <div v-if="products.length === 0" class="text-center text-gray-500">
      No products found.
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :id="product._id"
        :name="product.name"
        :type="type"
        :price="product.price"
        :image="product.image"
      />
    </div>
  </div>
</template>
