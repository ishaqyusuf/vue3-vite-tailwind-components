<template>
  <div
    class="max-w-xs mx-auto sm:max-w-lg md:max-w-2xl lg:max-w-5xl xl:max-w-7xl"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {},
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
