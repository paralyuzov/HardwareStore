<script>
import { ref, watch, computed } from "vue";
import * as yup from "yup";
import InputField from "@/components/ui/InputField.vue";
import DropdownField from "@/components/ui/DropdownField.vue";

export default {
  name: "PSUForm",
  components: {
    InputField,
    DropdownField,
  },
  props: {
    psuData: {
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
    const localPSUData = ref({ ...props.psuData });
    const validationErrors = ref({});

    const excludedFields = ["_id", "createdAt", "__v"];

    const filteredPSUData = computed(() => {
      return Object.keys(localPSUData.value)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = localPSUData.value[key];
          return obj;
        }, {});
    });

    watch(
      () => props.psuData,
      (newVal) => {
        localPSUData.value = { ...newVal };
      }
    );

    const schema = yup.object({
      name: yup.string().required("Name is required"),
      brand: yup.string().required("Brand is required"),
      wattage: yup.string().required("Wattage is required"),
      efficiency: yup.string().required("Efficiency is required"),
      modularity: yup
        .string()
        .oneOf(
          ["Fully Modular", "Semi-Modular", "Non-Modular"],
          "Modularity must be Fully Modular, Semi-Modular, or Non-Modular"
        )
        .required("Modularity is required"),
      price: yup.number().required("Price is required").min(1, "Price must be a positive number"),
      image: yup.string().url("Must be a valid URL"),
    });

    const validateForm = async () => {
      try {
        const preprocessedData = {
          ...localPSUData.value,
          price: Number(localPSUData.value.price),
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
        emit("save", { ...localPSUData.value });
      } else {
        console.log("Form is invalid, not emitting save event.");
      }
    };

    const handleCancel = () => {
      emit("cancel");
    };

    const isDropdownField = (key) => key === "modularity";

    const getFieldType = (key) => {
      const numericFields = ["price"];
      return numericFields.includes(key) ? "number" : "text";
    };

    return {
      localPSUData,
      filteredPSUData,
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
      <template v-for="(value, key) in filteredPSUData">
        <InputField
          v-if="!isDropdownField(key)"
          :key="`input-${key}`"
          :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'"
          :type="getFieldType(key)"
          v-model="localPSUData[key]"
          :error="validationErrors[key]"
          placeholder="Enter value"
        />
        <DropdownField
          v-else
          :key="`dropdown-${key}`"
          :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'"
          :options="['Fully Modular', 'Semi-Modular', 'Non-Modular']"
          v-model="localPSUData[key]"
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
