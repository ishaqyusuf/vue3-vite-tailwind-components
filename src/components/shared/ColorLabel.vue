<template>
  <span
    class="inline-block rounded-lg px-1"
    :class="[`bg-${color}-${bg} text-${color}-${text}`]"
  >
    <slot></slot>
  </span>
</template>

<script lang="ts">
export default {
  props: {
    bg: { default: "100", type: String },
    text: { default: "700", type: String },
    color: String,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
