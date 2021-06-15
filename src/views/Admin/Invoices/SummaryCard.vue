<template>
  <div class="grid w-full grid-cols-2 sm:grid-cols-12 gap-4">
    <div
      class="rounded-md p-4 sm:col-span-3 sm:p-6 inline-flex justify-between items-center"
      v-for="(item, index) in items"
      :class="[`bg-${item.color}-100`]"
      :key="index"
    >
      <div class="rounded-lg p-2" :class="[`bg-${item.color}-400`]">
        <div
          :class="[`bg-${item.color}-200`]"
          class="w-8 h-8 rounded-full text-gray-100 inline-flex items-center justify-center"
        >
          <i-mdi-receipt />
        </div>
      </div>
      <div class="inline-flex flex-col items-center">
        <span class="text-sm">{{ item.title }}</span>
        <span class="font-semibold bg- text-xl">$ 40k</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    const items = ref([
      {
        color: "green",
        title: "Paid",
      },
      { color: "yellow", title: "Unpaid" },
      { color: "red", title: "Overdue" },
      { color: "indigo", title: "Drafts" },
    ]);
    return { items };
  },
};
</script>

<style scoped></style>
