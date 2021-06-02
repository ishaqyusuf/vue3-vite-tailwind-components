<template>
  <div
    class="h-60 flex flex-col items-center justify-center space-y-2 text-gray-500 font-bold"
  >
    <slot>
      <i-mdi-water-outline class="text-6xl" />
    </slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
