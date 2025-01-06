<script>
import { ref, onBeforeMount } from "vue";
import { useCpuStore } from "@/stores/cpuStores";
import CpuForm from "@/components/CpuForm.vue";
import MessageModal from "@/components/ui/MessageModal.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";

export default {
  name: "AdminCpuPage",
  components: {
    CpuForm,
    MessageModal,
    ConfirmationModal,
  },
  setup() {
    const cpuStore = useCpuStore();
    const isModalOpen = ref(false);
    const isMessageModalOpen = ref(false);
    const isConfirmationModalOpen = ref(false);
    const messageModalContent = ref("");
    const messageModalType = ref("info");
    const modalAction = ref("create");
    const currentCpu = ref({
      name: "",
      brand: "",
      model: "",
      price: 0,
      cores: 0,
      threads: 0,
      base_clock: "",
      boost_clock: "",
      socket: "",
      image: "",
    });
    const deleteCpuId = ref(null);

    onBeforeMount(() => {
      cpuStore.fetchCpus();
    });

    const openModal = (action, cpu = null) => {
      modalAction.value = action;
      currentCpu.value = cpu
        ? { ...cpu }
        : {
          name: "",
          brand: "",
          model: "",
          price: 0,
          cores: 0,
          threads: 0,
          base_clock: "",
          boost_clock: "",
          socket: "",
          image: "",
        };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveCpu = async (cpuData) => {
      try {
        if (modalAction.value === "create") {
          await cpuStore.createCpu(cpuData);
          messageModalContent.value = "CPU created successfully!";
          messageModalType.value = "success";
          closeModal();
        } else if (modalAction.value === "edit") {
          await cpuStore.updateCpu(cpuData._id, cpuData);
          messageModalContent.value = "CPU updated successfully!";
          messageModalType.value = "success";
          closeModal();
        }
      } catch (error) {
        console.error("Error during saveCpu:", error);
        messageModalContent.value =
          cpuStore.error || "An error occurred while saving the CPU.";
        messageModalType.value = "error";
        isMessageModalOpen.value = true;
      } finally {
        isMessageModalOpen.value = true;
      }
    };




    const confirmDelete = (id) => {
      deleteCpuId.value = id;
      isConfirmationModalOpen.value = true;
    };

    const deleteCpu = async () => {
      try {
        if (deleteCpuId.value) {
          await cpuStore.deleteCpu(deleteCpuId.value);
          messageModalContent.value = "CPU deleted successfully!";
          messageModalType.value = "success";
        }
      } catch (error) {
        console.log(error)
        messageModalContent.value =
          cpuStore.error || "An error occurred while deleting the CPU.";
        messageModalType.value = "error";
      } finally {
        deleteCpuId.value = null;
        isConfirmationModalOpen.value = false;
        isMessageModalOpen.value = true;
      }
    };

    return {
      cpuStore,
      isModalOpen,
      isMessageModalOpen,
      isConfirmationModalOpen,
      messageModalContent,
      messageModalType,
      modalAction,
      currentCpu,
      deleteCpuId,
      openModal,
      closeModal,
      saveCpu,
      confirmDelete,
      deleteCpu,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Manage CPUs
      </h1>

      <div class="mb-4 text-right">
        <button class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openModal('create')">
          Create New CPU
        </button>
      </div>

      <div v-if="cpuStore.loading" class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>

      <table v-if="!cpuStore.loading" class="w-full bg-white border-collapse border border-gray-200 text-center">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Brand</th>
            <th class="border px-4 py-2">Cores</th>
            <th class="border px-4 py-2">Price</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cpu in cpuStore.cpus" :key="cpu._id">
            <td class="border px-4 py-2">{{ cpu.name }}</td>
            <td class="border px-4 py-2">{{ cpu.brand }}</td>
            <td class="border px-4 py-2">{{ cpu.cores }}</td>
            <td class="border px-4 py-2">${{ cpu.price }}</td>
            <td class="border px-4 py-2">
              <div class="flex justify-center items-center space-x-4">
                <button @click="openModal('edit', cpu)"
                  class="px-4 py-2 text-white hover:scale-105 bg-yellow-400 rounded-xl">
                  Edit
                </button>
                <button @click="confirmDelete(cpu._id)"
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
          <CpuForm :cpu-data="currentCpu" @save="saveCpu" @cancel="closeModal" />
        </div>
      </div>

      <ConfirmationModal :visible="isConfirmationModalOpen" message="Are you sure you want to delete this CPU?"
        type="info" @confirm="deleteCpu" @cancel="isConfirmationModalOpen = false" />

      <MessageModal :visible="isMessageModalOpen" :message="messageModalContent" :type="messageModalType"
        @close="isMessageModalOpen = false" />
    </div>
  </div>
</template>
