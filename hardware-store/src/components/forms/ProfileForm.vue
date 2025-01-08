<script>
import { ref } from 'vue';
import * as yup from 'yup';
import InputField from '@/components/ui/InputField.vue';

export default {
  name: 'SettingsForm',
  components: { InputField },
  props: {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['save'],
  setup(props, { emit }) {
    const localUsername = ref(props.username);
    const localEmail = ref(props.email);
    const validationErrors = ref({
      username: '',
      email: '',
    });

    const schema = yup.object({
      username: yup.string().min(3, 'Username must be at least 3 characters long.').required('Username is required.'),
      email: yup.string().email('Please enter a valid email address.').required('Email is required.'),
    });

    const validateForm = async () => {
      try {
        await schema.validate({ username: localUsername.value, email: localEmail.value }, { abortEarly: false });
        validationErrors.value = {};
        return true;
      } catch (err) {
        validationErrors.value = err.inner.reduce((acc, error) => {
          acc[error.path] = error.message;
          return acc;
        }, {});
        return false;
      }
    };

    const handleSave = async () => {
      const isValid = await validateForm();
      if (isValid) {
        emit('save', { username: localUsername.value, email: localEmail.value });
      }
    };

    return {
      localUsername,
      localEmail,
      validationErrors,
      handleSave,
    };
  },
};
</script>

<template>
  <form @submit.prevent="handleSave" class="max-w-md mx-auto bg-gray-50 p-6 rounded-lg shadow-lg">
    <InputField
      id="username"
      label="Username"
      v-model="localUsername"
      :error="validationErrors.username"
      placeholder="Enter your username"
    />
    <InputField
      id="email"
      label="Email Address"
      type="email"
      v-model="localEmail"
      :error="validationErrors.email"
      placeholder="Enter your email"
    />
    <div class="flex justify-center items-center mt-4">
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 "
      >
        Save Changes
      </button>
      <p v-if="loading" class="text-sm text-gray-500">Saving...</p>
    </div>
  </form>
</template>
