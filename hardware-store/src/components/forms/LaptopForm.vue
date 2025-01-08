<script>
import { ref, watch, computed } from 'vue'
import * as yup from 'yup'
import InputField from '@/components/ui/InputField.vue'

export default {
  name: 'LaptopForm',
  components: {
    InputField,
  },
  props: {
    laptopData: {
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
    const localLaptopData = ref({ ...props.laptopData })
    const validationErrors = ref({})

    const excludedFields = ['_id', 'createdAt', '__v']

    const filteredLaptopData = computed(() => {
      return Object.keys(localLaptopData.value)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = localLaptopData.value[key]
          return obj
        }, {})
    })

    watch(
      () => props.laptopData,
      (newVal) => {
        localLaptopData.value = { ...newVal }
      },
    )

    const schema = yup.object({
      name: yup.string().required('Name is required'),
      brand: yup.string().required('Brand is required'),
      processor: yup.string().required('Processor is required'),
      ram: yup.string().required('RAM is required'),
      storage: yup.string().required('Storage is required'),
      graphics: yup.string().required('Graphics is required'),
      screen: yup.string().required('Screen is required'),
      price: yup.number().required('Price is required').min(1, 'Price must be a positive number'),
      image: yup.string().url('Must be a valid URL'),
    })

    const validateForm = async () => {
      try {
        const preprocessedData = {
          ...localLaptopData.value,
          price: Number(localLaptopData.value.price),
        }

        await schema.validate(preprocessedData, { abortEarly: false })
        validationErrors.value = {}
        return true
      } catch (validationError) {
        validationErrors.value = validationError.inner.reduce((acc, err) => {
          acc[err.path] = err.message
          return acc
        }, {})
        return false
      }
    }

    const handleSave = async () => {
      const isValid = await validateForm()
      if (isValid) {
        emit('save', { ...localLaptopData.value })
      } else {
        console.log('Form is invalid, not emitting save event.')
      }
    }

    const handleCancel = () => {
      emit('cancel')
    }

    const getFieldType = (key) => {
      const numericFields = ['price']
      return numericFields.includes(key) ? 'number' : 'text'
    }

    return {
      localLaptopData,
      filteredLaptopData,
      validationErrors,
      handleSave,
      handleCancel,
      getFieldType,
    }
  },
}
</script>

<template>
  <div>
    <form @submit.prevent="handleSave">
      <InputField
        v-for="(value, key) in filteredLaptopData"
        :key="key"
        :id="key"
        :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'"
        :type="getFieldType(key)"
        v-model="localLaptopData[key]"
        :error="validationErrors[key]"
        placeholder="Enter value"
      />

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
