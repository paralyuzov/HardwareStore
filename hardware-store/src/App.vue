<script setup>
import { ref, onBeforeMount } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import NavBar from './components/NavBar.vue';

const authStore = useAuthStore();
const isInitialized = ref(false);

onBeforeMount(async () => {
  await authStore.initializeSession();
  isInitialized.value = true;
});
</script>

<template>
  <NavBar />
  <div v-if="!isInitialized" class="fixed inset-0 flex items-center justify-center bg-gray-100">
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  </div>
  <RouterView v-else />
</template>
