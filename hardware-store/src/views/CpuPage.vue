<script>
import { onBeforeMount } from "vue";
import { useCpuStore } from "@/stores/cpuStores";
import CpuCard from "@/components/ui/CpuCard.vue";

export default {
  name: "CpuPage",
  components: {
    CpuCard,
  },
  setup() {
    const cpuStore = useCpuStore();
    onBeforeMount(() => {
      cpuStore.fetchCpus();
    });

    return {
      cpuStore,
    };
  },
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center font-orbitron">CPU</h1>
        <div v-if="cpuStore.loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
      <div v-if="cpuStore.cpus.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CpuCard
          v-for="cpu in cpuStore.cpus"
          :key="cpu._id"
          :id="cpu._id"
          :name="cpu.name"
          :price="cpu.price"
          :image="cpu.image"
        />
      </div>

      <div
        v-else-if="!cpuStore.loading && cpuStore.cpus.length === 0"
        class="text-center text-gray-500"
      >
        No CPUs available.
      </div>
    </div>
  </div>
</template>

