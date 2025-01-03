<script>
export default {
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
  emits: ['close'],
};
</script>

<template>
  <div
    v-if="visible"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-white rounded-md shadow-md max-w-sm w-full p-6 text-center"
    >
      <h2
        class="text-lg font-semibold"
        :class="{
          'text-green-600': type === 'success',
          'text-red-600': type === 'error',
          'text-blue-600': type === 'info',
        }"
      >
        {{ type === 'success' ? 'Success' : type === 'error' ? 'Error' : 'Info' }}
      </h2>
      <p class="mt-4 text-gray-700">{{ message }}</p>
      <button
        @click="$emit('close')"
        class="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring focus:ring-indigo-500"
      >
        Close
      </button>
    </div>
  </div>
</template>

