<script>
import { ref, watch, computed } from 'vue';
import * as yup from 'yup';
import InputField from '@/components/ui/InputField.vue';
import DropdownField from '@/components/ui/DropdownField.vue';

export default {
  name: 'RamForm',
  components: {
    InputField,
    DropdownField,
  },
  props: {
    ramData: {
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
    const localRamData = ref({ ...props.ramData });
    const validationErrors = ref({});

    const excludedFields = ['_id', 'createdAt', '__v'];

    const filteredRamData = computed(() => {
      return Object.keys(localRamData.value)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = localRamData.value[key];
          return obj;
        }, {});
    });

    watch(
      () => props.ramData,
      (newVal) => {
        localRamData.value = { ...newVal };
      }
    );

    const schema = yup.object({
      name: yup.string().required('Name is required'),
      type: yup
        .string()
        .oneOf(['DDR4', 'DDR5'], 'Type must be either DDR4 or DDR5')
        .required('Type is required'),
      capacity: yup.string().required('Capacity is required'),
      speed: yup.string().required('Speed is required'),
      latency: yup.string().required('Latency is required'),
      voltage: yup.string().required('Voltage is required'),
      image: yup.string().url('Must be a valid URL'),
      price: yup.number().required('Price is required').min(1, 'Price must be a positive number'),
    });

    const validateForm = async () => {
      try {
        const preprocessedData = {
          ...localRamData.value,
          price: Number(localRamData.value.price),
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
        emit('save', { ...localRamData.value });
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
      localRamData,
      filteredRamData,
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
      <template v-for="(value, key) in filteredRamData">
        <InputField
          v-if="!isDropdownField(key)"
          :key="`input-${key}`"
          :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'"
          :type="getFieldType(key)"
          v-model="localRamData[key]"
          :error="validationErrors[key]"
          placeholder="Enter value"
        />
        <DropdownField
          v-else
          :key="`dropdown-${key}`"
          :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'"
          :options="['DDR4', 'DDR5']"
          v-model="localRamData[key]"
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
