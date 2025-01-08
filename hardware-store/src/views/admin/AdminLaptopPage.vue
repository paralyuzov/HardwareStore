<script>
import { ref, onBeforeMount } from "vue";
import { useLaptopStore } from "@/stores/laptopStore";
import LaptopForm from "@/components/forms/LaptopForm.vue";
import MessageModal from "@/components/ui/MessageModal.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";

export default {
  name: "AdminLaptopPage",
  components: {
    LaptopForm,
    MessageModal,
    ConfirmationModal,
  },
  setup() {
    const laptopStore = useLaptopStore();
    const isModalOpen = ref(false);
    const isMessageModalOpen = ref(false);
    const isConfirmationModalOpen = ref(false);
    const messageModalContent = ref("");
    const messageModalType = ref("info");
    const modalAction = ref("create");
    const currentLaptop = ref({
      name: "",
      brand: "",
      processor: "",
      ram: "",
      storage: "",
      graphics: "",
      screen: "",
      price: 0,
      image: "",
    });
    const deleteLaptopId = ref(null);

    onBeforeMount(() => {
      laptopStore.fetchLaptops();
    });

    const openModal = (action, laptop = null) => {
      modalAction.value = action;
      currentLaptop.value = laptop
        ? { ...laptop }
        : {
          name: "",
          brand: "",
          processor: "",
          ram: "",
          storage: "",
          graphics: "",
          screen: "",
          price: 0,
          image: "",
        };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveLaptop = async (laptopData) => {
      try {
        if (modalAction.value === "create") {
          await laptopStore.createLaptop(laptopData);
          messageModalContent.value = "Laptop created successfully!";
          messageModalType.value = "success";
          closeModal();
        } else if (modalAction.value === "edit") {
          await laptopStore.updateLaptop(laptopData._id, laptopData);
          messageModalContent.value = "Laptop updated successfully!";
          messageModalType.value = "success";
          closeModal();
        }
      } catch (error) {
        console.error("Error during saveLaptop:", error);
        messageModalContent.value =
          laptopStore.error || "An error occurred while saving the laptop.";
        messageModalType.value = "error";
      } finally {
        isMessageModalOpen.value = true;
      }
    };

    const confirmDelete = (id) => {
      deleteLaptopId.value = id;
      isConfirmationModalOpen.value = true;
    };

    const deleteLaptop = async () => {
      try {
        if (deleteLaptopId.value) {
          await laptopStore.deleteLaptop(deleteLaptopId.value);
          messageModalContent.value = "Laptop deleted successfully!";
          messageModalType.value = "success";
        }
      } catch (error) {
        console.log(error);
        messageModalContent.value =
          laptopStore.error || "An error occurred while deleting the laptop.";
        messageModalType.value = "error";
      } finally {
        deleteLaptopId.value = null;
        isConfirmationModalOpen.value = false;
        isMessageModalOpen.value = true;
      }
    };

    return {
      laptopStore,
      isModalOpen,
      isMessageModalOpen,
      isConfirmationModalOpen,
      messageModalContent,
      messageModalType,
      modalAction,
      currentLaptop,
      deleteLaptopId,
      openModal,
      closeModal,
      saveLaptop,
      confirmDelete,
      deleteLaptop,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Manage Laptops
      </h1>

      <div class="mb-4 text-right">
        <button class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openModal('create')">
          Create New Laptop
        </button>
      </div>

      <div v-if="laptopStore.loading" class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>

      <table v-if="!laptopStore.loading" class="w-full bg-white border-collapse border border-gray-200 text-center">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Brand</th>
            <th class="border px-4 py-2">Processor</th>
            <th class="border px-4 py-2">Price</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="laptop in laptopStore.laptops" :key="laptop._id">
            <td class="border px-4 py-2">{{ laptop.name }}</td>
            <td class="border px-4 py-2">{{ laptop.brand }}</td>
            <td class="border px-4 py-2">{{ laptop.processor }}</td>
            <td class="border px-4 py-2">${{ laptop.price }}</td>
            <td class="border px-4 py-2">
              <div class="flex justify-center items-center space-x-4">
                <button @click="openModal('edit', laptop)"
                  class="px-4 py-2 text-white hover:scale-105 bg-yellow-400 rounded-xl">
                  Edit
                </button>
                <button @click="confirmDelete(laptop._id)"
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
          <LaptopForm :laptop-data="currentLaptop" @save="saveLaptop" @cancel="closeModal" />
        </div>
      </div>

      <ConfirmationModal :visible="isConfirmationModalOpen" message="Are you sure you want to delete this laptop?"
        type="info" @confirm="deleteLaptop" @cancel="isConfirmationModalOpen = false" />

      <MessageModal :visible="isMessageModalOpen" :message="messageModalContent" :type="messageModalType"
        @close="isMessageModalOpen = false" />
    </div>
  </div>
</template>
