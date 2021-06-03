<template>
  <div
    :class="{
      'min-h-screen': fs,
      'bg-white': primary,
      'bg-gray-50': secondary,
      'bg-gray-100': tertiary,
      'px-2 md:px-4 sm:px-6 lg:px-8 xl:px-10': !vintage,
      'py-4': padY,
    }"
    class=""
  >
    <!-- 'max-w-xs mx-auto sm:max-w-lg md:max-w-4xl lg:max-w-3xl xl:max-w-6xl': !vintage, -->
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
    padY: Boolean,
    tertiary: Boolean,
    vintage: Boolean,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
