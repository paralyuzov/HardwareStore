<script>
import { ref, watch, computed } from "vue";
import * as yup from "yup";
import InputField from "@/components/ui/InputField.vue";

export default {
  name: "CpuForm",
  components: {
    InputField,
  },
  props: {
    cpuData: {
      type: Object,
      required: true,
    },
    errors: {
      type: Object,
      required: false,
      default: () => ({}),
    },
  },
  emits: ["save", "cancel"],
  setup(props, { emit }) {
    const localCpuData = ref({ ...props.cpuData });
    const validationErrors = ref({});

    const excludedFields = ["_id", "createdAt", "__v"];

    const filteredCpuData = computed(() => {
      return Object.keys(localCpuData.value)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = localCpuData.value[key];
          return obj;
        }, {});
    });

    watch(
      () => props.cpuData,
      (newVal) => {
        localCpuData.value = { ...newVal };
      }
    );

    const schema = yup.object({
      name: yup.string().required("Name is required").min(3, "Name must be at least 3 characters"),
      brand: yup.string().required("Brand is required"),
      model: yup.string().required("Model is required"),
      price: yup.number().required("Price is required").min(1, "Price must be a positive number"),
      cores: yup.number().required("Cores are required").min(1, "Cores must be at least 1"),
      threads: yup.number().required("Threads are required").min(1, "Threads must be at least 1"),
      base_clock: yup.string().required("Base Clock is required"),
      boost_clock: yup.string().required("Boost Clock is required"),
      socket: yup.string().required("Socket is required"),
      image: yup.string().url("Must be a valid URL").required("Image is required"),
    });

    const validateForm = async () => {
      console.log("VALIDATION FORM")
      try {
        const preprocessedData = {
          ...localCpuData.value,
          price: Number(localCpuData.value.price),
          cores: Number(localCpuData.value.cores),
          threads: Number(localCpuData.value.threads),
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
        emit("save", { ...localCpuData.value });
      } else {
        console.log("Form is invalid, not emitting save event.");
      }
    };


    const handleCancel = () => {
      emit("cancel");
    };

    const getFieldType = (key) => {
      const numericFields = ["price", "cores", "threads"];
      return numericFields.includes(key) ? "number" : "text";
    };

    return {
      localCpuData,
      filteredCpuData,
      validationErrors,
      handleSave,
      handleCancel,
      getFieldType,
    };
  },
};
</script>

<template>
  <div>
    <form @submit.prevent="handleSave">
      <InputField v-for="(value, key) in filteredCpuData" :key="key" :id="key"
        :label='key.charAt(0).toUpperCase() + key.slice(1) + ":"' :type="getFieldType(key)" v-model="localCpuData[key]"
        :error="validationErrors[key]" placeholder="Enter value" />

      <div class="flex justify-end space-x-2">
        <button type="button" @click="handleCancel" class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Save
        </button>
      </div>
    </form>
  </div>
</template>
