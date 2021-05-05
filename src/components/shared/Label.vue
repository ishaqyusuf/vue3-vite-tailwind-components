<template>
  <span
    class="font-poppins text-gray-800"
    :class="[
      block && 'block',
      !lg && !md && !xl && 'text-sm',
      lg && 'text-lg',
      md && 'text-base',
      xl && 'text-xl',
      !light && 'font-medium',
      bold && 'font-semibold',
      big && 'font-bold text-3xl',
    ]"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    big: Boolean,
    block: Boolean,
    light: Boolean,
    sm: Boolean,
    md: Boolean,
    lg: Boolean,
    xl: Boolean,
    bold: Boolean,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
