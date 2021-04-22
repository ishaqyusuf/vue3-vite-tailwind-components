<template>
  <!-- :class="[sm && 'p-1 px-4', lg && 'p-2 px-4', block && 'block w-full']" -->
  <button
    class="bg-primary text-white focus:ring-2 rounded-lg border-primary focus:outline-none"
  >
    <i-mdi-account-box style="font-size: 2em; color: red" />
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    block: Boolean,
    sm: Boolean,
    md: Boolean,
    lg: Boolean,
    xl: Boolean,
  },
  setup() {},
};
</script>

<style></style>
