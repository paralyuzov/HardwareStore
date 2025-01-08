<script>
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
  },
};
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="w-full max-w-lg bg-gray-100 p-6 rounded-lg shadow-lg z-50">
      <LoginForm />
      <div class="mt-4 text-center">
      <p class="text-gray-700">
        Don't have an account?
        <router-link to="/register" class="text-blue-500 hover:underline">
          Register here
        </router-link>
      </p>
    </div>
    </div>

  </div>

</template>
