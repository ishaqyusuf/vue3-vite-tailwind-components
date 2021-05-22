<template>
  <span
    class="font-poppins"
    :class="[
      block && 'block',
      !lg && !md && !xl && 'text-sm',
      lg && 'text-lg',
      md && 'text-base',
      xl && 'text-xl',
      !light && 'font-medium',
      bold && 'font-semibold',
      big && 'font-bold text-3xl',
      { 'text-black-100': dark },
      { 'text-black-400': !dark },
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
    dark: Boolean,
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
