<template>
  <span
    class="font-poppins"
    :class="[
      block && 'block',
      sm && 'text-sm',
      lg && 'text-lg',
      md && 'text-base',
      xl && 'text-xl',
      !light && 'font-semibold',
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
    big: { type: Boolean },
    block: { type: Boolean },
    light: { type: Boolean },
    sm: { type: Boolean },
    md: { type: Boolean },
    lg: { type: Boolean },
    xl: { type: Boolean },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
