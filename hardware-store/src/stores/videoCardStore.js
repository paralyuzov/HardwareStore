import { defineStore } from "pinia";
import axios from "@/services/api";

export const useVideoCardStore = defineStore("videoCardStore", {
  state: () => ({
    videoCards: [],
    error: null,
    loading: false,
    selectedVideoCard:null
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
    async createVideoCard(videoCardData) {
      try {
        const response = await axios.post('/videocards', videoCardData);
        this.videoCards.push(response.data);
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to create Video Card';
        console.error('Error creating Video Card:', error);
        throw error;
      }
    },
    async updateVideoCard(id, videoCardData) {
      try {
        const response = await axios.put(`/videocards/${id}`, videoCardData);
        const index = this.videoCards.findIndex((videoCard) => videoCard._id === id);
        if (index !== -1) {
          this.videoCards[index] = response.data;
        }
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to update Video Card';
        console.error('Error updating Video Card:', error);
        throw error;
      }
    },
    async deleteVideoCard(id) {
      try {
        await axios.delete(`/videocards/${id}`);
        this.videoCards = this.videoCards.filter((videoCard) => videoCard._id !== id);
      } catch (error) {
        this.error = error.response?.data?.error || 'Failed to delete Video Card';
        console.error('Error deleting Video Card:', error);
        throw error;
      }
    },
    async fetchVideoCardById(id) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(`/videocards/${id}`);
        this.selectedVideoCard = response.data;
      } catch (error) {
        this.error = error.response?.data?.error || "Failed to fetch video card details";
        console.error("Error fetching video card details:", error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  },
});
