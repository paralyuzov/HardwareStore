<script>
export default {
  name: "PageNotFound",
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-600 mb-4 font-orbitron">404</h1>
      <p class="text-xl text-gray-700 mb-8 font-orbitron">PAGE NOT FOUND</p>
      <router-link
        to="/"
        class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Homepage
      </router-link>
    </div>
  </div>
</template>
