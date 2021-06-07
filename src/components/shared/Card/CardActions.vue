<template>
  <div
    class="inline-flex space-x-3 justify-end"
    :class="[
      !tile && 'rounded-b-lg',
      {
        'bg-gray-50': !plain,
        'px-4 py-3 sm:px-6': !pilot,
      },
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    tile: Boolean,
    plain: Boolean,
    pilot: Boolean,
  },
};
</script>

<style scoped></style>
