<script>
export default {
  name: "ConfirmationModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
    },
  },
  emits: ['confirm', 'cancel'],
};
</script>

<template>
  <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
      <h2 class="text-lg font-semibold text-center" :class="{
        'text-blue-600': type === 'info',
        'text-red-600': type === 'error',
        'text-green-600': type === 'success',
      }">
        {{ type === 'info' ? 'Confirmation' : type === 'error' ? 'Error' : 'Success' }}
      </h2>

      <p class="mt-4 text-gray-700 text-center">{{ message }}</p>


      <div class="mt-6 flex justify-center space-x-4">
        <button @click="$emit('confirm')"
          class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
          Confirm
        </button>
        <button @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200">
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
