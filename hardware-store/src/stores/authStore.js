import { defineStore } from 'pinia'
import axios from '../services/api'
import { useCartStore } from './cartStore'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: null,
    error: null,
    loading: false,
    orders: [],
    adminUsers: [],
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
        await axios.post('/auth/register', userData)
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
        this.user = null
        this.orders = []
        const cart = useCartStore()
        cart.clearCart()
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
    async fetchOrders() {
      if (!this.user) {
        this.error = 'User not logged in'
        return
      }
      this.loading = true
      this.error = null

      try {
        const response = await axios.post('/users/orders', {
          userId: this.user.id,
        })
        this.orders = response.data
      } catch (error) {
        console.error('Error fetching orders:', error)
        this.error = error.response?.data?.error || 'Failed to fetch orders'
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async editUser(updatedData) {
      if (!this.user) {
        this.error = 'User not logged in'
        return
      }
      this.loading = true
      this.error = null

      try {
        const response = await axios.put('/auth/edit', updatedData, {
          withCredentials: true,
        })

        this.user = {
          ...this.user,
          ...response.data.user,
        }

        return response.data.user
      } catch (error) {
        console.error('Error updating profile:', error)
        this.error = error.response?.data?.error || 'Failed to update profile'
        throw this.error
      } finally {
        this.loading = false
      }
    },
    async fetchUsers() {
      if (!this.isAdmin) {
        this.error = 'Unauthorized. Admins only.'
        return
      }
      this.loading = true
      this.error = null

      try {
        const response = await axios.get('/auth/admin/users', {
          withCredentials: true,
        })
        this.adminUsers = response.data.filter((user) => user._id !== this.user.id)
      } catch (error) {
        console.error('Error fetching users:', error)
        this.error = error.response?.data?.error || 'Failed to fetch users'
        throw this.error
      } finally {
        this.loading = false
      }
    },

    async adminEditUser(userId, updatedData) {
      if (!this.isAdmin) {
        this.error = 'Unauthorized. Admins only.'
        return
      }
      this.loading = true
      this.error = null
      console.log(updatedData)
      try {
        const response = await axios.put(`/auth/admin/edit/${userId}`, updatedData, {
          withCredentials: true,
        })
        const index = this.adminUsers.findIndex((user) => user._id === userId)
        if (index !== -1) {
          this.adminUsers[index] = response.data.user
        }
        return response.data.user
      } catch (error) {
        console.error('Error editing user:', error)
        this.error = error.response?.data?.error || 'Failed to edit user'
        throw this.error
      } finally {
        this.loading = false
      }
    },

    async adminDeleteUser(userId) {
      if (!this.isAdmin) {
        this.error = 'Unauthorized. Admins only.'
        return
      }
      this.loading = true
      this.error = null

      try {
        await axios.delete(`/auth/admin/delete/${userId}`, {
          withCredentials: true,
        })
        this.adminUsers = this.adminUsers.filter((user) => user._id !== userId)
      } catch (error) {
        console.error('Error deleting user:', error)
        this.error = error.response?.data?.error || 'Failed to delete user'
        throw this.error
      } finally {
        this.loading = false
      }
    },
  },
})
