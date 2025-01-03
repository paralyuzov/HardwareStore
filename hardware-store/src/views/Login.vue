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
    </div>
  </div>
</template>
