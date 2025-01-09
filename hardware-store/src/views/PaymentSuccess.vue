<script>
export default {
  name: "PaymentSuccess",
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
      <div class="flex justify-center items-center bg-green-500 text-white rounded-full w-16 h-16 mx-auto mb-6 animate-bounce">
        <i class="fas fa-check text-3xl"></i>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
      <p class="text-gray-600 mb-6">
        Thank you for your purchase. Your order has been processed successfully.
      </p>
      <router-link
        to="/orders"
        class="block w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-center mb-4"
      >
        View My Orders
      </router-link>
      <router-link
        to="/"
        class="block w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-center"
      >
        Go back to home
      </router-link>
    </div>
  </div>
</template>



