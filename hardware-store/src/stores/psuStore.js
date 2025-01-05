import { defineStore } from "pinia";
import axios from "@/services/api";

export const usePsuStore = defineStore("psuStore", {
  state: () => ({
    psus: [],
    error: null,
    loading: false,
  }),
  actions: {
    async fetchPsus() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/psu");
        this.psus = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch PSUs";
        console.error("Error fetching PSUs:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
