import { defineStore } from "pinia";
import axios from "@/services/api";

export const useRamStores = defineStore("ramStore", {
  state: () => ({
    rams: [],
    error: null,
    loading: false,
  }),
  actions: {
    async fetchRams() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/ram");
        this.rams = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch RAMs";
        console.error("Error fetching RAMs:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
