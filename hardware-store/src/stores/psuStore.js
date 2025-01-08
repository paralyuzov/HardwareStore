import { defineStore } from "pinia";
import axios from "@/services/api";

export const usePsuStore = defineStore("psuStore", {
  state: () => ({
    psus: [],
    error: null,
    loading: false,
    selectedPsu:null,
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
    async createPsus(psuData) {
      try {
        const response = await axios.post('/psu', psuData);
        this.psus.push(response.data);
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to create PSU';
        console.error('Error creating PSU:', error);
        throw error;
      }
    },

    async updatePsus(id, psuData) {
      try {
        const response = await axios.put(`/psu/${id}`, psuData);
        const index = this.psus.findIndex((psu) => psu._id === id);
        if (index !== -1) {
          this.psus[index] = response.data;
        }
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to update PSU';
        console.error('Error updating PSU:', error);
        throw error;
      }
    },

    async deletePsus(id) {
      try {
        await axios.delete(`/psu/${id}`);
        this.psus = this.psus.filter((psu) => psu._id !== id);
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to delete PSU';
        console.error('Error deleting PSU:', error);
        throw error;
      }
    },
    async fetchPsuById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`/psu/${id}`);
        this.selectedPsu = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch PSU details";
        console.error("Error fetching PSU details:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },
});
