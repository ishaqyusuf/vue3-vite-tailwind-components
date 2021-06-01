<template>
  <div
    :class="{
      'sm:text-2xl': !lg && !xl,
      'sm:text-lg': lg,
      'sm:text-xl': xl,
      'p-4': !dense,
      'py-0': flatY,
      'px-0': flatX,
    }"
    class="font-poppins text-xl leading-7 mb-1 font-semibold text-gray-900 inline-flex"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    lg: Boolean,
    flatX: Boolean,
    flatY: Boolean,
    flatT: Boolean,
    flatB: Boolean,
    xl: Boolean,
    dense: Boolean,
  },
};
</script>
<style scoped></style>
