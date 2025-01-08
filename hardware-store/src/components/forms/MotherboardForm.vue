<script>
import { ref, watch, computed } from 'vue';
import * as yup from 'yup';
import InputField from '@/components/ui/InputField.vue';
import DropdownField from '@/components/ui/DropdownField.vue';

export default {
  name: 'MotherboardForm',
  components: {
    InputField,
    DropdownField,
  },
  props: {
    motherboardData: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    const localMotherboardData = ref({ ...props.motherboardData });
    const validationErrors = ref({});

    const excludedFields = ['_id', 'createdAt', '__v'];

    const filteredMotherboardData = computed(() => {
      return Object.keys(localMotherboardData.value)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = localMotherboardData.value[key];
          return obj;
        }, {});
    });

    watch(
      () => props.motherboardData,
      (newVal) => {
        localMotherboardData.value = { ...newVal };
      }
    );

    const schema = yup.object({
      name: yup.string().required('Name is required'),
      chipset: yup.string().required('Chipset is required'),
      socket: yup.string().required('Socket is required'),
      form_factor: yup
        .string()
        .oneOf(['ATX', 'Micro ATX', 'Mini ITX'], 'Form Factor must be ATX, Micro ATX, or Mini ITX')
        .required('Form Factor is required'),
      ram_support: yup.string().required('RAM Support is required'),
      brand: yup
        .string()
        .oneOf(['AMD', 'Intel'], 'Brand must be AMD or Intel')
        .required('Brand is required'),
      price: yup.number().required('Price is required').min(1, 'Price must be a positive number'),
      image: yup.string().url('Must be a valid URL'),
    });

    const validateForm = async () => {
      try {
        const preprocessedData = {
          ...localMotherboardData.value,
          price: Number(localMotherboardData.value.price),
        };

        await schema.validate(preprocessedData, { abortEarly: false });
        validationErrors.value = {};
        return true;
      } catch (validationError) {
        validationErrors.value = validationError.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        return false;
      }
    };

    const handleSave = async () => {
      const isValid = await validateForm();
      if (isValid) {
        emit('save', { ...localMotherboardData.value });
      } else {
        console.log('Form is invalid, not emitting save event.');
      }
    };

    const handleCancel = () => {
      emit('cancel');
    };

    const isDropdownField = (key) => ['form_factor', 'brand'].includes(key);

    const getFieldType = (key) => {
      const numericFields = ['price'];
      return numericFields.includes(key) ? 'number' : 'text';
    };

    return {
      localMotherboardData,
      filteredMotherboardData,
      validationErrors,
      handleSave,
      handleCancel,
      getFieldType,
      isDropdownField,
    };
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSave">
      <template v-for="(value, key) in filteredMotherboardData">
        <InputField
          v-if="!isDropdownField(key)"
          :key="`input-${key}`"
          :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'"
          :type="getFieldType(key)"
          v-model="localMotherboardData[key]"
          :error="validationErrors[key]"
          placeholder="Enter value"
        />
        <DropdownField
          v-else
          :key="`dropdown-${key}`"
          :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'"
          :options="key === 'form_factor' ? ['ATX', 'Micro ATX', 'Mini ITX'] : ['AMD', 'Intel']"
          v-model="localMotherboardData[key]"
          :error="validationErrors[key]"
        />
      </template>

      <div class="flex justify-end space-x-2">
        <button
          type="button"
          @click="handleCancel"
          class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
        >
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Save
        </button>
      </div>
    </form>
  </div>
</template>
