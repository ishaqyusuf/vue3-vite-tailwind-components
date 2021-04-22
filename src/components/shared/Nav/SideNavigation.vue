<template>
  <!-- <div class="w-56 border-r"></div> -->
  <div class="w-56 h-screen fixed left-0 top-0 bg-purple-800">
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
