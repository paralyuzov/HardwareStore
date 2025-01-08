<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import SettingsForm from '@/components/forms/ProfileForm.vue';
import MessageModal from '@/components/ui/MessageModal.vue';

export default {
  name: 'SettingsPage',
  components: { SettingsForm, MessageModal },
  setup() {
    const authStore = useAuthStore();

    const isModalOpen = ref(false);
    const modalMessage = ref('');
    const modalType = ref('info');

    const handleSave = async (updatedData) => {
      try {
        await authStore.editUser(updatedData);
        modalMessage.value = 'Profile updated successfully!';
        modalType.value = 'success';
      } catch (error) {
        console.log(error)
        modalMessage.value = authStore.error || 'Failed to update settings.';
        modalType.value = 'error';
      } finally {
        isModalOpen.value = true;
      }
    };

    return {
      user: authStore.user,
      loading: authStore.loading,
      isModalOpen,
      modalMessage,
      modalType,
      handleSave,
    };
  },
};
</script>

<template>
  <div class="container mx-auto px-6 py-12 min-h-screen bg-gray-100">
    <h1 class="text-4xl font-bold text-gray-800 mb-8 text-center font-orbitron">Profile</h1>

    <div class="max-w-2xl mx-auto">
      <SettingsForm
        :username="user.username"
        :email="user.email"
        :loading="loading"
        @save="handleSave"
      />
    </div>

    <MessageModal
      :visible="isModalOpen"
      :message="modalMessage"
      :type="modalType"
      @close="isModalOpen = false"
    />
  </div>
</template>
