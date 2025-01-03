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
      username: '',
      email: '',
      password: '',
      repassword: '',
    });

    const errors = reactive({});
    const isSubmitting = ref(false);

    const isModalVisible = ref(false);
    const modalMessage = ref('');
    const modalType = ref('info'); 

    const schema = yup.object({
      username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters long'),
      email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
      password: yup
        .string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
      repassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
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
        const userData = {
          username: form.username,
          email: form.email,
          password: form.password,
        };
        await authStore.registerUser(userData);

        modalMessage.value = 'User registered successfully! You will be redirected to login page...';
        modalType.value = 'success';
        isModalVisible.value = true;

        setTimeout(() => {
          isModalVisible.value = false; 
          router.push('/login'); 
        }, 5000);
      } catch (err) {
        console.log(err)
        modalMessage.value = authStore.error || 'An unexpected error occurred';
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
  <div class="">
    <div class="max-w-md mx-auto bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-6 rounded-md">
      <h2 class="text-xl font-semibold text-gray-700 text-center mb-4">
        Create Account
      </h2>
      <form @submit.prevent="handleSubmit">
        <FormInput
          id="username"
          label="Username"
          v-model="form.username"
          :error="errors.username"
          placeholder="Enter your username"
        />
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
        <FormInput
          id="repassword"
          label="Confirm Password"
          type="password"
          v-model="form.repassword"
          :error="errors.repassword"
          placeholder="Confirm your password"
        />
        <FormButton label="Register" type="submit" :disabled="isSubmitting" />
      </form>
    </div>

    <MessageModal
      :visible="isModalVisible"
      :message="modalMessage"
      :type="modalType"
      @close="isModalVisible = false"
    />
  </div>
</template>
