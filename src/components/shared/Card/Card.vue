<template>
  <div
    class="font-poppins shadow-lg bg-white flex flex-col"
    :class="[!tile && 'rounded-lg']"
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
