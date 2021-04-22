<template>
  <div
    class="bg-gray-50 px-4 py-3 sm:px-6 inline-flex space-x-3 justify-end"
    :class="[!tile && 'rounded-b-lg']"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    tile: Boolean,
  },
};
</script>

<style scoped></style>
