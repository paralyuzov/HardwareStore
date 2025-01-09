<script>
export default {
  name: "PaymentCancel",
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
      <div class="flex justify-center items-center bg-red-500 text-white rounded-full w-16 h-16 mx-auto mb-6 animate-bounce">
        <i class="fas fa-times text-3xl"></i>
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Payment Canceled</h1>
      <p class="text-gray-600 mb-6">
        Your payment process was canceled. If this was a mistake, you can try again or contact support for assistance.
      </p>
      <router-link
        to="/"
        class="block w-full px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition text-center"
      >
        Go back to home
      </router-link>
    </div>
  </div>
</template>


