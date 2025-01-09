import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { defineStore } from 'pinia'
import { useAuthStore } from './authStore'

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  getters: {
    totalPrice: (state) =>
      state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    addToCart(item) {
      this.cartItems.push(item)
      this.saveCartToLocalStorage()
    },
    removeItemFromCart(id) {
      this.cartItems = this.cartItems.filter((item) => item.id !== id)
      this.saveCartToLocalStorage()
    },
    updateItemQuantity(id, quantity) {
      const item = this.cartItems.find((item) => item.id === id)
      if (item) {
        item.quantity = quantity
        this.saveCartToLocalStorage()
      }
    },
    clearCart() {
      this.cartItems = []
      this.saveCartToLocalStorage()
    },
    saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    },
    async handlePayment() {
      try {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
        if (!stripe) {
          throw new Error('Stripe.js failed to load.')
        }
        const authStore = useAuthStore()
        const userId = authStore.user.id

        const items = this.cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          image:item.image,
          quantity: item.quantity,
        }))

        const response = await axios.post('http://localhost:3002/api/checkout', {
          items,
          userId,
        })
        this.clearCart()
        if (!response.data.id) {
          throw new Error('Failed to create checkout session.')
        }

        const sessionId = response.data.id

        const result = await stripe.redirectToCheckout({ sessionId })

        if (result.error) {
          console.error('Stripe Checkout Error:', result.error.message)
          alert('Failed to redirect to payment. Please try again.')
        }
      } catch (error) {
        console.error('Payment Error:', error.message || error.response?.data?.error)
        alert('An error occurred during payment. Please try again later.')
      }
    },
  },
})
