import { defineStore } from 'pinia'
import axios from '@/services/api'

export const useLaptopStore = defineStore('laptopStore', {
  state: () => ({
    laptops: [],
    error: null,
    loading: false,
    selectedLaptop:null
  }),
  actions: {
    async fetchLaptops() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get('/laptops')
        this.laptops = response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to fetch laptops'
        console.error('Error fetching laptops:', error)
      } finally {
        this.loading = false
      }
    },
    async createLaptop(laptopData) {
      try {
        const response = await axios.post('/laptops', laptopData)
        this.laptops.push(response.data)
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to create laptop'
        console.error('Error creating laptop:', error)
        throw error
      }
    },
    async updateLaptop(id, laptopData) {
      try {
        const response = await axios.put(`/laptops/${id}`, laptopData)
        const index = this.laptops.findIndex((laptop) => laptop._id === id)
        if (index !== -1) {
          this.laptops[index] = response.data
        }
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to update laptop'
        console.error('Error updating laptop:', error)
        throw error
      }
    },
    async deleteLaptop(id) {
      try {
        await axios.delete(`/laptops/${id}`)
        this.laptops = this.laptops.filter((laptop) => laptop._id !== id)
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to delete laptop'
        console.error('Error deleting laptop:', error)
        throw error
      }
    },
    async fetchLaptopById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`/laptops/${id}`);
        this.selectedLaptop = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch laptop details";
        console.error("Error fetching laptop details:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },
})
