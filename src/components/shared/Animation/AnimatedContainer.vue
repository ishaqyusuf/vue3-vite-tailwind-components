<template>
  <transition
    enter-active-class="transition transform duration-100 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-75 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <slot></slot>
  </transition>
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
