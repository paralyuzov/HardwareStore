<script>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/authStore';
import FormInput from '@/components/ui/InputField.vue';
import FormButton from '@/components/ui/FormButton.vue';
import MessageModal from '@/components/ui/MessageModal.vue';

export default {
  components: {
    FormInput,
    FormButton,
    MessageModal,
  },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const form = reactive({
      email: '',
      password: '',
    });

    const errors = reactive({});
    const isSubmitting = ref(false);

    const isModalVisible = ref(false);
    const modalMessage = ref('');
    const modalType = ref('info');

    const schema = yup.object({
      email: yup.string().email('Invalid email format').required('Email is required'),
      password: yup.string().required('Password is required'),
    });

    const validate = async () => {
      try {
        await schema.validate(form, { abortEarly: false });
        Object.keys(errors).forEach((key) => (errors[key] = ''));
        return true;
      } catch (validationErrors) {
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        return false;
      }
    };

    const handleSubmit = async () => {
      const isValid = await validate();
      if (!isValid) return;

      isSubmitting.value = true;
      try {
        const credentials = { email: form.email, password: form.password };
        await authStore.loginUser(credentials);
        router.push('/');
      } catch (err) {
        console.log(err)
        modalMessage.value = authStore.error || 'Login failed. Please try again.';
        modalType.value = 'error';
        isModalVisible.value = true;
      } finally {
        isSubmitting.value = false;
      }
    };

    return {
      form,
      errors,
      isSubmitting,
      handleSubmit,
      isModalVisible,
      modalMessage,
      modalType,
    };
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <FormInput
        id="email"
        label="Email"
        type="email"
        v-model="form.email"
        :error="errors.email"
        placeholder="Enter your email"
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        v-model="form.password"
        :error="errors.password"
        placeholder="Enter your password"
      />
      <FormButton label="Login" type="submit" :disabled="isSubmitting" />
    </form>

    <MessageModal
      :visible="isModalVisible"
      :message="modalMessage"
      :type="modalType"
      @close="isModalVisible = false"
    />
  </div>
</template>
