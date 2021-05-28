<template>
  <div
    :class="{
      'min-h-screen py-4 sm:py-6': !simple,
    }"
    class="max-w-xs mx-auto sm:max-w-lg md:max-w-4xl lg:max-w-5xl xl:max-w-6xl"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    simple: Boolean,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
