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
        const response = await axios.get("/cpu");
        this.cpus = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch CPUs";
        console.error("Error fetching CPUs:", error);
      } finally {
        this.loading = false;
      }
    },
    async createCpu(cpuData) {
      try {
        const response = await axios.post("/cpu", cpuData);
        this.cpus.push(response.data);
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to create CPU";
        console.error("Error creating CPU:", error);
        throw error;
      }
    },
    async updateCpu(id, cpuData) {
      try {
        const response = await axios.put(`/cpu/${id}`, cpuData);
        const index = this.cpus.findIndex((cpu) => cpu._id === id);
        if (index !== -1) {
          this.cpus[index] = response.data;
        }
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to update CPU";
        console.error("Error updating CPU:", error);
        throw error;
      }
    },
    async deleteCpu(id) {
      try {
        await axios.delete(`/cpu/${id}`);
        this.cpus = this.cpus.filter((cpu) => cpu._id !== id);
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to delete CPU";
        console.error("Error deleting CPU:", error);
        throw error;
      }
    },
  },
});
