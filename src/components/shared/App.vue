<template>
  <div
    :class="{
      'min-h-screen': fs,
      'bg-white': primary,
      'bg-gray-50': secondary,
      'bg-gray-100': tertiary,
    }"
    class="max-w-xs mx-auto sm:max-w-lg md:max-w-4xl lg:max-w-5xl xl:max-w-6xl"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    fs: Boolean,
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
