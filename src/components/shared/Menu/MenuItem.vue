<template>
  <div
    class="inline-flex items-center w-full cursor-default p-2 space-x-2"
    :class="{ 'text-gray-50': dark, 'text-gray-700': !dark }"
  >
    <i-mdi-cog class=""></i-mdi-cog>
    <span><slot></slot></span>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    dark: Boolean,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
