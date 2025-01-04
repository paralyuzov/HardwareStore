import { defineStore } from "pinia";
import axios from "@/services/api";

export const useCpuStore = defineStore("cpuStore", {
  state: () => ({
    cpus: [],
    error: null,
    loading: false,
  }),
  actions: {
    async fetchCpus() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/cpus");
        this.cpus = response.data; 
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch CPUs";
        console.error("Error fetching CPUs:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
