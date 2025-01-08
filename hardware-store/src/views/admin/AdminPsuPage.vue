<script>
import { ref, onBeforeMount } from "vue";
import PSUForm from "@/components/forms/PsuForm.vue";
import MessageModal from "@/components/ui/MessageModal.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import { usePsuStore } from "@/stores/psuStore";

export default {
  name: "AdminPSUPage",
  components: {
    PSUForm,
    MessageModal,
    ConfirmationModal,
  },
  setup() {
    const psuStore = usePsuStore();
    const isModalOpen = ref(false);
    const isMessageModalOpen = ref(false);
    const isConfirmationModalOpen = ref(false);
    const messageModalContent = ref("");
    const messageModalType = ref("info");
    const modalAction = ref("create");
    const currentPSU = ref({
      name: "",
      brand: "",
      wattage: "",
      efficiency: "",
      modularity: "",
      price: 0,
      image: "",
    });
    const deletePSUId = ref(null);

    onBeforeMount(() => {
      psuStore.fetchPsus();
    });

    const openModal = (action, psu = null) => {
      modalAction.value = action;
      currentPSU.value = psu
        ? { ...psu }
        : {
            name: "",
            brand: "",
            wattage: "",
            efficiency: "",
            modularity: "",
            price: 0,
            image: "",
          };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const savePSU = async (psuData) => {
      try {
        if (modalAction.value === "create") {
          await psuStore.createPsus(psuData);
          messageModalContent.value = "PSU created successfully!";
          messageModalType.value = "success";
          closeModal();
        } else if (modalAction.value === "edit") {
          await psuStore.updatePsus(psuData._id, psuData);
          messageModalContent.value = "PSU updated successfully!";
          messageModalType.value = "success";
          closeModal();
        }
      } catch (error) {
        console.error("Error during savePSU:", error);
        messageModalContent.value =
          psuStore.error || "An error occurred while saving the PSU.";
        messageModalType.value = "error";
      } finally {
        isMessageModalOpen.value = true;
      }
    };

    const confirmDelete = (id) => {
      deletePSUId.value = id;
      isConfirmationModalOpen.value = true;
    };

    const deletePSU = async () => {
      try {
        if (deletePSUId.value) {
          await psuStore.deletePsus(deletePSUId.value);
          messageModalContent.value = "PSU deleted successfully!";
          messageModalType.value = "success";
        }
      } catch (error) {
        console.error("Error during deletePSU:", error);
        messageModalContent.value =
          psuStore.error || "An error occurred while deleting the PSU.";
        messageModalType.value = "error";
      } finally {
        deletePSUId.value = null;
        isConfirmationModalOpen.value = false;
        isMessageModalOpen.value = true;
      }
    };

    return {
      psuStore,
      isModalOpen,
      isMessageModalOpen,
      isConfirmationModalOpen,
      messageModalContent,
      messageModalType,
      modalAction,
      currentPSU,
      deletePSUId,
      openModal,
      closeModal,
      savePSU,
      confirmDelete,
      deletePSU,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Manage PSUs
      </h1>

      <div class="mb-4 text-right">
        <button
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          @click="openModal('create')"
        >
          Create New PSU
        </button>
      </div>

      <div v-if="psuStore.loading" class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>

      <table
        v-if="!psuStore.loading"
        class="w-full bg-white border-collapse border border-gray-200 text-center"
      >
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Brand</th>
            <th class="border px-4 py-2">Wattage</th>
            <th class="border px-4 py-2">Price</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="psu in psuStore.psus" :key="psu._id">
            <td class="border px-4 py-2">{{ psu.name }}</td>
            <td class="border px-4 py-2">{{ psu.brand }}</td>
            <td class="border px-4 py-2">{{ psu.wattage }}</td>
            <td class="border px-4 py-2">${{ psu.price }}</td>
            <td class="border px-4 py-2">
              <div class="flex justify-center items-center space-x-4">
                <button
                  @click="openModal('edit', psu)"
                  class="px-4 py-2 text-white hover:scale-105 bg-yellow-400 rounded-xl"
                >
                  Edit
                </button>
                <button
                  @click="confirmDelete(psu._id)"
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
          <PSUForm
            :psu-data="currentPSU"
            @save="savePSU"
            @cancel="closeModal"
          />
        </div>
      </div>

      <ConfirmationModal
        :visible="isConfirmationModalOpen"
        message="Are you sure you want to delete this PSU?"
        type="info"
        @confirm="deletePSU"
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
