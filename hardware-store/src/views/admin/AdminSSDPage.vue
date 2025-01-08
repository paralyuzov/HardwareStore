<script>
import { ref, onBeforeMount } from "vue";
import SSDForm from "@/components/forms/SsdForm.vue";
import MessageModal from "@/components/ui/MessageModal.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import { useSsdStore } from "@/stores/ssdStores";

export default {
  name: "AdminSSDPage",
  components: {
    SSDForm,
    MessageModal,
    ConfirmationModal,
  },
  setup() {
    const ssdStore = useSsdStore();
    const isModalOpen = ref(false);
    const isMessageModalOpen = ref(false);
    const isConfirmationModalOpen = ref(false);
    const messageModalContent = ref("");
    const messageModalType = ref("info");
    const modalAction = ref("create");
    const currentSSD = ref({
      name: "",
      capacity: "",
      type: "",
      interface: "",
      read_speed: "",
      write_speed: "",
      price: 0,
      image: "",
    });
    const deleteSSDId = ref(null);

    onBeforeMount(() => {
      ssdStore.fetchSsds();
    });

    const openModal = (action, ssd = null) => {
      modalAction.value = action;
      currentSSD.value = ssd
        ? { ...ssd }
        : {
            name: "",
            capacity: "",
            type: "",
            interface: "",
            read_speed: "",
            write_speed: "",
            price: 0,
            image: "",
          };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveSSD = async (ssdData) => {
      try {
        if (modalAction.value === "create") {
          await ssdStore.createSsds(ssdData);
          messageModalContent.value = "SSD created successfully!";
          messageModalType.value = "success";
          closeModal();
        } else if (modalAction.value === "edit") {
          await ssdStore.updateSsds(ssdData._id, ssdData);
          messageModalContent.value = "SSD updated successfully!";
          messageModalType.value = "success";
          closeModal();
        }
      } catch (error) {
        console.error("Error during saveSSD:", error);
        messageModalContent.value =
          ssdStore.error || "An error occurred while saving the SSD.";
        messageModalType.value = "error";
      } finally {
        isMessageModalOpen.value = true;
      }
    };

    const confirmDelete = (id) => {
      deleteSSDId.value = id;
      isConfirmationModalOpen.value = true;
    };

    const deleteSSD = async () => {
      try {
        if (deleteSSDId.value) {
          await ssdStore.deleteSsds(deleteSSDId.value);
          messageModalContent.value = "SSD deleted successfully!";
          messageModalType.value = "success";
        }
      } catch (error) {
        console.error("Error during deleteSSD:", error);
        messageModalContent.value =
          ssdStore.error || "An error occurred while deleting the SSD.";
        messageModalType.value = "error";
      } finally {
        deleteSSDId.value = null;
        isConfirmationModalOpen.value = false;
        isMessageModalOpen.value = true;
      }
    };

    return {
      ssdStore,
      isModalOpen,
      isMessageModalOpen,
      isConfirmationModalOpen,
      messageModalContent,
      messageModalType,
      modalAction,
      currentSSD,
      deleteSSDId,
      openModal,
      closeModal,
      saveSSD,
      confirmDelete,
      deleteSSD,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Manage SSDs
      </h1>

      <div class="mb-4 text-right">
        <button class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openModal('create')">
          Create New SSD
        </button>
      </div>

      <div v-if="ssdStore.loading" class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>

      <table v-if="!ssdStore.loading" class="w-full bg-white border-collapse border border-gray-200 text-center">
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
          <tr v-for="ssd in ssdStore.ssds" :key="ssd._id">
            <td class="border px-4 py-2">{{ ssd.name }}</td>
            <td class="border px-4 py-2">{{ ssd.type }}</td>
            <td class="border px-4 py-2">{{ ssd.capacity }}</td>
            <td class="border px-4 py-2">${{ ssd.price }}</td>
            <td class="border px-4 py-2">
              <div class="flex justify-center items-center space-x-4">
                <button @click="openModal('edit', ssd)"
                  class="px-4 py-2 text-white hover:scale-105 bg-yellow-400 rounded-xl">
                  Edit
                </button>
                <button @click="confirmDelete(ssd._id)"
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
          <SSDForm :ssd-data="currentSSD" @save="saveSSD" @cancel="closeModal" />
        </div>
      </div>

      <ConfirmationModal :visible="isConfirmationModalOpen" message="Are you sure you want to delete this SSD?"
        type="info" @confirm="deleteSSD" @cancel="isConfirmationModalOpen = false" />

      <MessageModal :visible="isMessageModalOpen" :message="messageModalContent" :type="messageModalType"
        @close="isMessageModalOpen = false" />
    </div>
  </div>
</template>
