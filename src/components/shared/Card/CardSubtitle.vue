<template>
  <div
    class="font-poppins text-gray-700"
    :class="{
      'p-4 pt-0': !dense,
      '-mt-6': !flatY,
      'py-0': flatY,
      'px-0': flatX,
    }"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    dense: Boolean,
    flatX: Boolean,
    flatY: Boolean,
    flatT: Boolean,
    flatB: Boolean,
  },
};
</script>

<style scoped></style>
