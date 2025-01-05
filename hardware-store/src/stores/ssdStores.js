import { defineStore } from "pinia";
import axios from "@/services/api";

export const useSsdStore = defineStore("ssdStore", {
  state: () => ({
    ssds: [],
    error: null,
    loading: false,
  }),
  actions: {
    async fetchSsds() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/ssd");
        this.ssds = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch SSDs";
        console.error("Error fetching SSDs:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
