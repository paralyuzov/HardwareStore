<script>
import { ref, watch, computed } from 'vue';
import * as yup from 'yup';
import InputField from '@/components/ui/InputField.vue';
import DropdownField from '@/components/ui/DropdownField.vue';

export default {
  name: 'SSDForm',
  components: {
    InputField,
    DropdownField,
  },
  props: {
    ssdData: {
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
    const localSSDData = ref({ ...props.ssdData });
    const validationErrors = ref({});

    const excludedFields = ['_id', 'createdAt', '__v'];

    const filteredSSDData = computed(() => {
      return Object.keys(localSSDData.value)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = localSSDData.value[key];
          return obj;
        }, {});
    });

    watch(
      () => props.ssdData,
      (newVal) => {
        localSSDData.value = { ...newVal };
      }
    );

    const schema = yup.object({
      name: yup.string().required('Name is required'),
      capacity: yup.string().required('Capacity is required'),
      type: yup
        .string()
        .oneOf(['NVMe', 'SATA'], 'Type must be either NVMe or SATA')
        .required('Type is required'),
      interface: yup.string().required('Interface is required'),
      read_speed: yup.string().required('Read speed is required'),
      write_speed: yup.string().required('Write speed is required'),
      price: yup.number().required('Price is required').min(1, 'Price must be a positive number'),
      image: yup.string().url('Must be a valid URL'),
    });

    const validateForm = async () => {
      try {
        const preprocessedData = {
          ...localSSDData.value,
          price: Number(localSSDData.value.price),
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
        emit('save', { ...localSSDData.value });
      } else {
        console.log('Form is invalid, not emitting save event.');
      }
    };

    const handleCancel = () => {
      emit('cancel');
    };

    const isDropdownField = (key) => key === 'type';

    const getFieldType = (key) => {
      const numericFields = ['price'];
      return numericFields.includes(key) ? 'number' : 'text';
    };

    return {
      localSSDData,
      filteredSSDData,
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
      <template v-for="(value, key) in filteredSSDData">
        <InputField
          v-if="!isDropdownField(key)"
          :key="`input-${key}`"
          :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'"
          :type="getFieldType(key)"
          v-model="localSSDData[key]"
          :error="validationErrors[key]"
          placeholder="Enter value"
        />
        <DropdownField
          v-else
          :key="`dropdown-${key}`"
          :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'"
          :options="['NVMe', 'SATA']"
          v-model="localSSDData[key]"
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
