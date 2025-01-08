import { defineStore } from 'pinia'
import axios from '../services/api'
import { useCartStore } from './cartStore'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    error: null,
    loading: false,
    orders:[],
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => state.user?.roles?.includes('admin'),
  },
  actions: {
    async initializeSession() {
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/auth/validate')
        this.user = response.data.user
      } catch (error) {
        console.error('Session validation failed:', error)
        this.user = null
      } finally {
        this.loading = false
      }
    },
    async registerUser(userData) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/auth/register', userData)
        this.user = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Registration failed'
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async loginUser(credentials) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post('/auth/login', credentials)
        this.user = response.data.user
        return response.data
      } catch (error) {
        this.error = error.response?.data?.error || 'Login failed'
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async logout() {
      try {
        await axios.post('/auth/logout')
        this.user = null;
        this.orders = [];
        const cart = useCartStore();
        cart.clearCart();
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
    async fetchOrders() {
      if (!this.user) {
        this.error = 'User not logged in';
        return;
      }
      this.loading = true;
      this.error = null;

      try {
        const response = await axios.post('/users/orders', {
          userId: this.user.id,
        });
        this.orders = response.data;
      } catch (error) {
        console.error('Error fetching orders:', error);
        this.error = error.response?.data?.error || 'Failed to fetch orders';
        throw this.error;
      } finally {
        this.loading = false;
      }
    },
  },
})
