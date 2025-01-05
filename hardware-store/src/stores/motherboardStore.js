import { defineStore } from "pinia";
import axios from "@/services/api";

export const useMotherboardStore = defineStore("motherboardStore", {
  state: () => ({
    motherboards: [],
    error: null,
    loading: false,
  }),
  actions: {
    async fetchMotherboards() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/motherboards");
        this.motherboards = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch motherboards";
        console.error("Error fetching motherboards:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
