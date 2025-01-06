import { defineStore } from "pinia";
import axios from "@/services/api";

export const useLaptopStore = defineStore("laptopStore", {
  state: () => ({
    laptops: [],
    error: null,
    loading: false,
  }),
  actions: {
    async fetchLaptops() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/laptops");
        this.laptops = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch laptops";
        console.error("Error fetching laptops:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
