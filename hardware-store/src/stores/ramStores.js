import { defineStore } from "pinia";
import axios from "@/services/api";

export const useRamStores = defineStore("ramStore", {
  state: () => ({
    rams: [],
    error: null,
    loading: false,
    selectedRam:null
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
    async createRam(ramData) {
      try {
        const response = await axios.post('/ram', ramData)
        this.rams.push(response.data)
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to create RAM'
        console.error('Error creating RAM:', error)
        throw error
      }
    },
    async updateRam(id, ramData) {
      try {
        const response = await axios.put(`/ram/${id}`, ramData)
        const index = this.rams.findIndex((ram) => ram._id === id)
        if (index !== -1) {
          this.rams[index] = response.data
        }
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to update RAM'
        console.error('Error updating RAM:', error)
        throw error
      }
    },
    async deleteRam(id) {
      try {
        await axios.delete(`/ram/${id}`)
        this.rams = this.rams.filter((ram) => ram._id !== id)
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to delete RAM'
        console.error('Error deleting RAM:', error)
        throw error
      }
    },
    async fetchRamById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`/ram/${id}`);
        this.selectedRam = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch RAM details";
        console.error("Error fetching RAM details:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },
});
