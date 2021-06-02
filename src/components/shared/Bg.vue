<template>
  <div
    :class="{
      'min-h-screen': fs,
      'bg-white': primary,
      'bg-gray-50': secondary,
      'bg-gray-100': tertiary,
    }"
  >
    <App v-if="app"><slot></slot></App>
    <slot v-else></slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    fs: Boolean,
    app: Boolean,
    primary: Boolean,
    secondary: Boolean,
    tertiary: Boolean,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
