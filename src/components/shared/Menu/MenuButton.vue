<template>
  <div
    class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
  >
    <slot />
    <slot name="icon">
      <i-mdi-chevron-down
        class="w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
        aria-hidden="true"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  props: {},
  component: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
