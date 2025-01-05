import { defineStore } from "pinia";
import axios from "@/services/api";

export const useVideoCardStore = defineStore("videoCardStore", {
  state: () => ({
    videoCards: [],
    error: null,
    loading: false,
  }),
  actions: {
    async fetchVideoCards() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/videocards");
        this.videoCards = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch video cards";
        console.error("Error fetching video cards:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
