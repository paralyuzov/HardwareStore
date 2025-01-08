<script>
import { ref, onBeforeMount } from "vue";
import RamForm from "@/components/forms/RamForm.vue";
import MessageModal from "@/components/ui/MessageModal.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import { useRamStores } from "@/stores/ramStores";


export default {
  name: "AdminRamPage",
  components: {
    RamForm,
    MessageModal,
    ConfirmationModal,
  },
  setup() {
    const ramStore = useRamStores();
    const isModalOpen = ref(false);
    const isMessageModalOpen = ref(false);
    const isConfirmationModalOpen = ref(false);
    const messageModalContent = ref("");
    const messageModalType = ref("info");
    const modalAction = ref("create");
    const currentRam = ref({
      name: "",
      type: "",
      capacity: "",
      speed: "",
      latency: "",
      voltage: "",
      price: 0,
      image: "",
    });
    const deleteRamId = ref(null);

    onBeforeMount(() => {
      ramStore.fetchRams();
    });

    const openModal = (action, ram = null) => {
      modalAction.value = action;
      currentRam.value = ram
        ? { ...ram }
        : {
            name: "",
            type: "",
            capacity: "",
            speed: "",
            latency: "",
            voltage: "",
            price: 0,
            image: "",
          };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveRam = async (ramData) => {
      try {
        if (modalAction.value === "create") {
          await ramStore.createRam(ramData);
          messageModalContent.value = "RAM created successfully!";
          messageModalType.value = "success";
          closeModal();
        } else if (modalAction.value === "edit") {
          await ramStore.updateRam(ramData._id, ramData);
          messageModalContent.value = "RAM updated successfully!";
          messageModalType.value = "success";
          closeModal();
        }
      } catch (error) {
        console.error("Error during saveRam:", error);
        messageModalContent.value =
          ramStore.error || "An error occurred while saving the RAM.";
        messageModalType.value = "error";
      } finally {
        isMessageModalOpen.value = true;
      }
    };

    const confirmDelete = (id) => {
      deleteRamId.value = id;
      isConfirmationModalOpen.value = true;
    };

    const deleteRam = async () => {
      try {
        if (deleteRamId.value) {
          await ramStore.deleteRam(deleteRamId.value);
          messageModalContent.value = "RAM deleted successfully!";
          messageModalType.value = "success";
        }
      } catch (error) {
        console.error("Error during deleteRam:", error);
        messageModalContent.value =
          ramStore.error || "An error occurred while deleting the RAM.";
        messageModalType.value = "error";
      } finally {
        deleteRamId.value = null;
        isConfirmationModalOpen.value = false;
        isMessageModalOpen.value = true;
      }
    };

    return {
      ramStore,
      isModalOpen,
      isMessageModalOpen,
      isConfirmationModalOpen,
      messageModalContent,
      messageModalType,
      modalAction,
      currentRam,
      deleteRamId,
      openModal,
      closeModal,
      saveRam,
      confirmDelete,
      deleteRam,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Manage RAM
      </h1>

      <div class="mb-4 text-right">
        <button class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openModal('create')">
          Create New RAM
        </button>
      </div>

      <div v-if="ramStore.loading" class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>

      <table v-if="!ramStore.loading" class="w-full bg-white border-collapse border border-gray-200 text-center">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Type</th>
            <th class="border px-4 py-2">Capacity</th>
            <th class="border px-4 py-2">Price</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ram in ramStore.rams" :key="ram._id">
            <td class="border px-4 py-2">{{ ram.name }}</td>
            <td class="border px-4 py-2">{{ ram.type }}</td>
            <td class="border px-4 py-2">{{ ram.capacity }}</td>
            <td class="border px-4 py-2">${{ ram.price }}</td>
            <td class="border px-4 py-2">
              <div class="flex justify-center items-center space-x-4">
                <button @click="openModal('edit', ram)"
                  class="px-4 py-2 text-white hover:scale-105 bg-yellow-400 rounded-xl">
                  Edit
                </button>
                <button @click="confirmDelete(ram._id)"
                  class="px-4 py-2 text-white hover:scale-105 bg-red-400 rounded-xl">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="bg-gray-200 p-6 rounded-lg shadow-lg w-1/3">
          <RamForm :ram-data="currentRam" @save="saveRam" @cancel="closeModal" />
        </div>
      </div>

      <ConfirmationModal :visible="isConfirmationModalOpen" message="Are you sure you want to delete this RAM?"
        type="info" @confirm="deleteRam" @cancel="isConfirmationModalOpen = false" />

      <MessageModal :visible="isMessageModalOpen" :message="messageModalContent" :type="messageModalType"
        @close="isMessageModalOpen = false" />
    </div>
  </div>
</template>
