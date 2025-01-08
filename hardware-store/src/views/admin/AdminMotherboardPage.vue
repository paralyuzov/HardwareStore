<script>
import { ref, onBeforeMount } from "vue";
import MotherboardForm from "@/components/forms/MotherboardForm.vue";
import MessageModal from "@/components/ui/MessageModal.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import { useMotherboardStore } from "@/stores/motherboardStore";

export default {
  name: "AdminMotherboardPage",
  components: {
    MotherboardForm,
    MessageModal,
    ConfirmationModal,
  },
  setup() {
    const motherboardStore = useMotherboardStore();
    const isModalOpen = ref(false);
    const isMessageModalOpen = ref(false);
    const isConfirmationModalOpen = ref(false);
    const messageModalContent = ref("");
    const messageModalType = ref("info");
    const modalAction = ref("create");
    const currentMotherboard = ref({
      name: "",
      chipset: "",
      socket: "",
      form_factor: "",
      ram_support: "",
      price: 0,
      image: "",
      brand: "",
    });
    const deleteMotherboardId = ref(null);

    onBeforeMount(() => {
      motherboardStore.fetchMotherboards();
    });

    const openModal = (action, motherboard = null) => {
      modalAction.value = action;
      currentMotherboard.value = motherboard
        ? { ...motherboard }
        : {
            name: "",
            chipset: "",
            socket: "",
            form_factor: "",
            ram_support: "",
            price: 0,
            image: "",
            brand: "",
          };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveMotherboard = async (motherboardData) => {
      try {
        if (modalAction.value === "create") {
          await motherboardStore.createMotherboard(motherboardData);
          messageModalContent.value = "Motherboard created successfully!";
          messageModalType.value = "success";
          closeModal();
        } else if (modalAction.value === "edit") {
          await motherboardStore.updateMotherboard(
            motherboardData._id,
            motherboardData
          );
          messageModalContent.value = "Motherboard updated successfully!";
          messageModalType.value = "success";
          closeModal();
        }
      } catch (error) {
        console.error("Error during saveMotherboard:", error);
        messageModalContent.value =
          motherboardStore.error ||
          "An error occurred while saving the motherboard.";
        messageModalType.value = "error";
      } finally {
        isMessageModalOpen.value = true;
      }
    };

    const confirmDelete = (id) => {
      deleteMotherboardId.value = id;
      isConfirmationModalOpen.value = true;
    };

    const deleteMotherboard = async () => {
      try {
        if (deleteMotherboardId.value) {
          await motherboardStore.deleteMotherboard(deleteMotherboardId.value);
          messageModalContent.value = "Motherboard deleted successfully!";
          messageModalType.value = "success";
        }
      } catch (error) {
        console.error("Error during deleteMotherboard:", error);
        messageModalContent.value =
          motherboardStore.error ||
          "An error occurred while deleting the motherboard.";
        messageModalType.value = "error";
      } finally {
        deleteMotherboardId.value = null;
        isConfirmationModalOpen.value = false;
        isMessageModalOpen.value = true;
      }
    };

    return {
      motherboardStore,
      isModalOpen,
      isMessageModalOpen,
      isConfirmationModalOpen,
      messageModalContent,
      messageModalType,
      modalAction,
      currentMotherboard,
      deleteMotherboardId,
      openModal,
      closeModal,
      saveMotherboard,
      confirmDelete,
      deleteMotherboard,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Manage Motherboards
      </h1>

      <div class="mb-4 text-right">
        <button
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          @click="openModal('create')"
        >
          Create New Motherboard
        </button>
      </div>

      <div v-if="motherboardStore.loading" class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>

      <table
        v-if="!motherboardStore.loading"
        class="w-full bg-white border-collapse border border-gray-200 text-center"
      >
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Chipset</th>
            <th class="border px-4 py-2">Socket</th>
            <th class="border px-4 py-2">Price</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="motherboard in motherboardStore.motherboards"
            :key="motherboard._id"
          >
            <td class="border px-4 py-2">{{ motherboard.name }}</td>
            <td class="border px-4 py-2">{{ motherboard.chipset }}</td>
            <td class="border px-4 py-2">{{ motherboard.socket }}</td>
            <td class="border px-4 py-2">${{ motherboard.price }}</td>
            <td class="border px-4 py-2">
              <div class="flex justify-center items-center space-x-4">
                <button
                  @click="openModal('edit', motherboard)"
                  class="px-4 py-2 text-white hover:scale-105 bg-yellow-400 rounded-xl"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(motherboard._id)"
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
          <MotherboardForm
            :motherboard-data="currentMotherboard"
            @save="saveMotherboard"
            @cancel="closeModal"
          />
        </div>
      </div>

      <ConfirmationModal
        :visible="isConfirmationModalOpen"
        message="Are you sure you want to delete this motherboard?"
        type="info"
        @confirm="deleteMotherboard"
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
