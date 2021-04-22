<template>
  <router-link
    :to="to"
    class="text-base font-medium text-gray-500 hover:text-gray-900"
  >
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    to: {},
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
