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
    async createSsds(ssdData) {
      try {
        const response = await axios.post('/ssd', ssdData);
        this.ssds.push(response.data);
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to create SSD';
        console.error('Error creating SSD:', error);
        throw error;
      }
    },
    async updateSsds(id, ssdData) {
      try {
        const response = await axios.put(`/ssd/${id}`, ssdData);
        const index = this.ssds.findIndex((ssd) => ssd._id === id);
        if (index !== -1) {
          this.ssds[index] = response.data;
        }
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to update SSD';
        console.error('Error updating SSD:', error);
        throw error;
      }
    },
    async deleteSsds(id) {
      try {
        await axios.delete(`/ssd/${id}`);
        this.ssds = this.ssds.filter((ssd) => ssd._id !== id);
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to delete SSD';
        console.error('Error deleting SSD:', error);
        throw error;
      }
    },
  },
});
