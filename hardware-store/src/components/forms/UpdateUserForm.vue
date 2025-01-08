<script>
import { ref, watch, computed } from "vue";
import * as yup from "yup";
import InputField from "@/components/ui/InputField.vue";
import DropdownField from "@/components/ui/DropdownField.vue";

export default {
  name: "UpdateUserForm",
  components: {
    InputField,
    DropdownField,
  },
  props: {
    userData: {
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
    const localUserData = ref({ ...props.userData });
    const validationErrors = ref({});

    const excludedFields = ["_id", "createdAt", "__v", "orders"];

    const filteredUserData = computed(() => {
      return Object.keys(localUserData.value)
        .filter((key) => !excludedFields.includes(key))
        .reduce((obj, key) => {
          obj[key] = localUserData.value[key];
          return obj;
        }, {});
    });

    watch(
      () => props.userData,
      (newVal) => {
        localUserData.value = { ...newVal };
      }
    );

    const schema = yup.object({
      username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username must be at most 20 characters"),
      email: yup
        .string()
        .email("Must be a valid email")
        .required("Email is required"),
      roles: yup
        .array()
        .of(
          yup
            .string()
            .oneOf(["admin", "user"], "Role must be either 'admin' or 'user'")
            .required("Role is required")
        )
        .transform((value) => (typeof value === "string" ? [value] : value))
        .min(1, "At least one role must be selected"),
    });

    const validateForm = async () => {
      try {
        const preprocessedData = { ...localUserData.value };
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
        emit("save", { ...localUserData.value });
      } else {
        console.log("Form is invalid, not emitting save event.");
      }
    };

    const handleCancel = () => {
      emit("cancel");
    };

    const isDropdownField = (key) => key === "roles";

    const getFieldType = (key) => {
      const emailField = ["email"];
      return emailField.includes(key) ? "email" : "text";
    };

    return {
      localUserData,
      filteredUserData,
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
      <template v-for="(value, key) in filteredUserData">
        <InputField v-if="!isDropdownField(key)" :key="`input-${key}`" :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'" :type="getFieldType(key)"
          v-model="localUserData[key]" :error="validationErrors[key]" placeholder="Enter value" />
        <DropdownField v-else :key="`dropdown-${key}`" :id="key"
          :label="key.charAt(0).toUpperCase() + key.slice(1) + ':'" :options="['user', 'admin']"
          v-model="localUserData[key]" :error="validationErrors[key]" />
      </template>

      <div class="flex justify-end space-x-2">
        <button type="button" @click="handleCancel"
          class="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Save
        </button>
      </div>
    </form>
  </div>
</template>
