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
    async createMotherboard(motherboardData) {
      try {
        const response = await axios.post('/motherboards', motherboardData);
        this.motherboards.push(response.data);
      } catch (error) {
        this.error =
          error.response?.data?.error || 'Failed to create motherboard';
        console.error('Error creating motherboard:', error);
        throw error;
      }
    },
    async updateMotherboard(id, motherboardData) {
      try {
        const response = await axios.put(`/motherboards/${id}`, motherboardData);
        const index = this.motherboards.findIndex(
          (motherboard) => motherboard._id === id
        );
        if (index !== -1) {
          this.motherboards[index] = response.data;
        }
      } catch (error) {
        this.error =
          error.response?.data?.error || 'Failed to update motherboard';
        console.error('Error updating motherboard:', error);
        throw error;
      }
    },
    async deleteMotherboard(id) {
      try {
        await axios.delete(`/motherboards/${id}`);
        this.motherboards = this.motherboards.filter(
          (motherboard) => motherboard._id !== id
        );
      } catch (error) {
        this.error =
          error.response?.data?.error || 'Failed to delete motherboard';
        console.error('Error deleting motherboard:', error);
        throw error;
      }
    },
  },
});
