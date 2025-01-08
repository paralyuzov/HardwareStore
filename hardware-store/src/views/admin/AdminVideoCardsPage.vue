<script>
import { ref, onBeforeMount } from "vue";
import VideoCardForm from "@/components/forms/VideoCardForm.vue";
import MessageModal from "@/components/ui/MessageModal.vue";
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
import { useVideoCardStore } from "@/stores/videoCardStore";

export default {
  name: "AdminVideoCardPage",
  components: {
    VideoCardForm,
    MessageModal,
    ConfirmationModal,
  },
  setup() {
    const videoCardStore = useVideoCardStore();
    const isModalOpen = ref(false);
    const isMessageModalOpen = ref(false);
    const isConfirmationModalOpen = ref(false);
    const messageModalContent = ref("");
    const messageModalType = ref("info");
    const modalAction = ref("create");
    const currentVideoCard = ref({
      name: "",
      brand: "",
      memory: "",
      core_clock: "",
      boost_clock: "",
      price: 0,
      image: "",
    });
    const deleteVideoCardId = ref(null);

    onBeforeMount(() => {
      videoCardStore.fetchVideoCards();
    });

    const openModal = (action, videoCard = null) => {
      modalAction.value = action;
      currentVideoCard.value = videoCard
        ? { ...videoCard }
        : {
            name: "",
            brand: "",
            memory: "",
            core_clock: "",
            boost_clock: "",
            price: 0,
            image: "",
          };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveVideoCard = async (videoCardData) => {
      try {
        if (modalAction.value === "create") {
          await videoCardStore.createVideoCard(videoCardData);
          messageModalContent.value = "Video Card created successfully!";
          messageModalType.value = "success";
          closeModal();
        } else if (modalAction.value === "edit") {
          await videoCardStore.updateVideoCard(videoCardData._id, videoCardData);
          messageModalContent.value = "Video Card updated successfully!";
          messageModalType.value = "success";
          closeModal();
        }
      } catch (error) {
        console.error("Error during saveVideoCard:", error);
        messageModalContent.value =
          videoCardStore.error || "An error occurred while saving the Video Card.";
        messageModalType.value = "error";
      } finally {
        isMessageModalOpen.value = true;
      }
    };

    const confirmDelete = (id) => {
      deleteVideoCardId.value = id;
      isConfirmationModalOpen.value = true;
    };

    const deleteVideoCard = async () => {
      try {
        if (deleteVideoCardId.value) {
          await videoCardStore.deleteVideoCard(deleteVideoCardId.value);
          messageModalContent.value = "Video Card deleted successfully!";
          messageModalType.value = "success";
        }
      } catch (error) {
        console.error("Error during deleteVideoCard:", error);
        messageModalContent.value =
          videoCardStore.error || "An error occurred while deleting the Video Card.";
        messageModalType.value = "error";
      } finally {
        deleteVideoCardId.value = null;
        isConfirmationModalOpen.value = false;
        isMessageModalOpen.value = true;
      }
    };

    return {
      videoCardStore,
      isModalOpen,
      isMessageModalOpen,
      isConfirmationModalOpen,
      messageModalContent,
      messageModalType,
      modalAction,
      currentVideoCard,
      deleteVideoCardId,
      openModal,
      closeModal,
      saveVideoCard,
      confirmDelete,
      deleteVideoCard,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-10">
    <div class="container mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">
        Manage Video Cards
      </h1>

      <div class="mb-4 text-right">
        <button class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600" @click="openModal('create')">
          Create New Video Card
        </button>
      </div>

      <div v-if="videoCardStore.loading" class="flex justify-center items-center">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>

      <table v-if="!videoCardStore.loading" class="w-full bg-white border-collapse border border-gray-200 text-center">
        <thead>
          <tr class="bg-gray-100">
            <th class="border px-4 py-2">Name</th>
            <th class="border px-4 py-2">Brand</th>
            <th class="border px-4 py-2">Memory</th>
            <th class="border px-4 py-2">Price</th>
            <th class="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="videoCard in videoCardStore.videoCards" :key="videoCard._id">
            <td class="border px-4 py-2">{{ videoCard.name }}</td>
            <td class="border px-4 py-2">{{ videoCard.brand }}</td>
            <td class="border px-4 py-2">{{ videoCard.memory }}</td>
            <td class="border px-4 py-2">${{ videoCard.price }}</td>
            <td class="border px-4 py-2">
              <div class="flex justify-center items-center space-x-4">
                <button @click="openModal('edit', videoCard)"
                  class="px-4 py-2 text-white hover:scale-105 bg-yellow-400 rounded-xl">
                  Edit
                </button>
                <button @click="confirmDelete(videoCard._id)"
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
          <VideoCardForm :video-card-data="currentVideoCard" @save="saveVideoCard" @cancel="closeModal" />
        </div>
      </div>

      <ConfirmationModal :visible="isConfirmationModalOpen" message="Are you sure you want to delete this Video Card?"
        type="info" @confirm="deleteVideoCard" @cancel="isConfirmationModalOpen = false" />

      <MessageModal :visible="isMessageModalOpen" :message="messageModalContent" :type="messageModalType"
        @close="isMessageModalOpen = false" />
    </div>
  </div>
</template>
