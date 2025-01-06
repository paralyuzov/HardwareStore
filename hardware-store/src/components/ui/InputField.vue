<script>
export default {
  props: {
    modelValue: {
      type: [String,Number],
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    id: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    error: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const updateValue = (value) => {
      emit('update:modelValue', value);
    };

    return {
      updateValue,
    };
  },
};
</script>

<template>
  <div class="mb-4">
    <label :for="id" class="block text-sm font-bold text-gray-700">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="updateValue($event.target.value)"
      :placeholder="placeholder"
      :class="[
        'mt-2 block w-full px-2 py-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
        error ? 'border-red-500' : ''
      ]"
    />
    <p v-if="error" class="mt-1 text-sm text-red-500">{{ error }}</p>
  </div>
</template>
