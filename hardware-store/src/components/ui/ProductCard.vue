<script>
export default {
  name: "ProductCard",
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type:{
      type:String,
      required:true
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: "",
    },
  },
  methods: {
    navigateToDetails() {
      this.$router.push(`/catalog/${this.type}/${this.id}`);
    }

  }
}
</script>

<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-center items-center hover:scale-105"
    @click="navigateToDetails"
  >
    <div>
      <img
        v-if="image"
        :src="image"
        :alt="name"
        class="w-52 object-fit"
      />
    </div>
    <div class="p-4 flex flex-col items-center">
      <h2 class="text-lg font-semibold text-gray-800 truncate">{{ name }}</h2>
      <p class="text-lg font-bold text-gray-800 mt-2">${{ price.toFixed(2) }}</p>
    </div>
  </div>
</template>

