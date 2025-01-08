<script>
import { ref, onBeforeMount } from "vue";
import UpdateUserForm from "@/components/forms/UpdateUserForm.vue";
import MessageModal from "@/components/ui/MessageModal.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import { useAuthStore } from "@/stores/authStore";

export default {
  name: "AdminUsersPage",
  components: {
    UpdateUserForm,
    MessageModal,
    ConfirmationModal,
  },
  setup() {
    const authStore = useAuthStore();
    const isModalOpen = ref(false);
    const isMessageModalOpen = ref(false);
    const isConfirmationModalOpen = ref(false);
    const messageModalContent = ref("");
    const messageModalType = ref("info");
    const modalAction = ref("edit");
    const currentUser = ref({
      _id: "",
      username: "",
      email: "",
      roles: [],
    });
    const deleteUserId = ref(null);

    onBeforeMount(() => {
      authStore.fetchUsers();
    });

    const openModal = (action, user = null) => {
      modalAction.value = action;
      if (action === "edit" && user) {
        currentUser.value = { ...user };
      } else {
        currentUser.value = {
          _id: "",
          username: "",
          email: "",
          roles: [],
        };
      }
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveUser = async (userData) => {
      try {
        if (modalAction.value === "edit") {
          await authStore.adminEditUser(userData._id, {
            username: userData.username,
            email: userData.email,
            roles: userData.roles,
          });
          messageModalContent.value = "User updated successfully!";
          messageModalType.value = "success";
          closeModal();
        }
      } catch (error) {
        console.error("Error during saveUser:", error);
        messageModalContent.value =
          authStore.error || "An error occurred while saving the user.";
        messageModalType.value = "error";
      } finally {
        isMessageModalOpen.value = true;
      }
    };

    const confirmDelete = (id) => {
      deleteUserId.value = id;
      isConfirmationModalOpen.value = true;
    };

    const deleteUser = async () => {
      try {
        if (deleteUserId.value) {
          await authStore.adminDeleteUser(deleteUserId.value);
          messageModalContent.value = "User deleted successfully!";
          messageModalType.value = "success";
        }
      } catch (error) {
        console.error("Error during deleteUser:", error);
        messageModalContent.value =
          authStore.error || "An error occurred while deleting the user.";
        messageModalType.value = "error";
      } finally {
        deleteUserId.value = null;
        isConfirmationModalOpen.value = false;
        isMessageModalOpen.value = true;
      }
    };

    return {
      authStore,
      isModalOpen,
      isMessageModalOpen,
      isConfirmationModalOpen,
      messageModalContent,
      messageModalType,
      modalAction,
      currentUser,
      deleteUserId,
      openModal,
      closeModal,
      saveUser,
      confirmDelete,
      deleteUser,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Manage Users
      </h1>

      <div v-if="authStore.loading" class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>

      <div v-if="!authStore.loading && authStore.adminUsers.length === 0" class="flex justify-center items-center">
        <p class="text-gray-500">There are no users to manage at the moment.</p>
      </div>

      <table
        v-if="!authStore.loading && authStore.adminUsers.length > 0"
        class="w-full bg-white border-collapse border border-gray-200 text-center"
      >
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Username</th>
            <th class="border px-4 py-2">Email</th>
            <th class="border px-4 py-2">Role</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in authStore.adminUsers" :key="user._id">
            <td class="border px-4 py-2">{{ user.username }}</td>
            <td class="border px-4 py-2">{{ user.email }}</td>
            <td class="border px-4 py-2">{{ user.roles.join(", ") }}</td>
            <td class="border px-4 py-2">
              <div class="flex justify-center items-center space-x-4">
                <button
                  @click="openModal('edit', user)"
                  class="px-4 py-2 text-white hover:scale-105 bg-yellow-400 rounded-xl"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(user._id)"
                  class="px-4 py-2 text-white hover:scale-105 bg-red-400 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        v-if="isModalOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-gray-200 p-6 rounded-lg shadow-lg w-1/3">
          <UpdateUserForm
            :user-data="currentUser"
            @save="saveUser"
            @cancel="closeModal"
          />
        </div>
      </div>

      <ConfirmationModal
        :visible="isConfirmationModalOpen"
        message="Are you sure you want to delete this user?"
        type="info"
        @confirm="deleteUser"
        @cancel="isConfirmationModalOpen = false"
      />

      <MessageModal
        :visible="isMessageModalOpen"
        :message="messageModalContent"
        :type="messageModalType"
        @close="isMessageModalOpen = false"
      />
    </div>
  </div>
</template>
