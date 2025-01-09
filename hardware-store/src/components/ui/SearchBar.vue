<script>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "SearchBar",
  props: {
    initialCategory: {
      type: String,
      default: "",
    },
    initialQuery: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const selectedCategory = ref(props.initialCategory);
    const searchQuery = ref(props.initialQuery);
    const inputError = ref(false);
    const router = useRouter();

    const handleSearch = () => {
      if (!searchQuery.value.trim()) {
        inputError.value = true;
        return;
      }

      inputError.value = false;

      router.push({
        path: "/search",
        query: { category: selectedCategory.value, q: searchQuery.value },
      });
      searchQuery.value = "";
      selectedCategory.value = "";
    };



    watch(searchQuery, (newValue) => {
      if (newValue.trim()) {
        inputError.value = false;
      }
    });

    return {
      selectedCategory,
      searchQuery,
      inputError,
      handleSearch,
    };
  },
};
</script>

<template>
  <div class="flex items-center space-x-2 md:space-x-4 bg-white rounded-lg p-2">
    <select
      v-model="selectedCategory"
      class="w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
    >
      <option value="" disabled>Choose Category</option>
      <option value="cpus">CPUs</option>
      <option value="laptops">Laptops</option>
      <option value="motherboards">Motherboards</option>
      <option value="rams">RAMs</option>
      <option value="ssds">SSDs</option>
      <option value="videocards">Video Cards</option>
      <option value="psus">Power Supplies</option>
    </select>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search for products..."
      :class="[
        'flex-grow px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 transition',
        inputError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
      ]"
    />

    <button
      @click="handleSearch"
      class="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:outline-none"
    >
      <i class="fas fa-search mr-2"></i>
      Search
    </button>
  </div>
</template>
