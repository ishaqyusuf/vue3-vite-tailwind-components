<template>
  <router-link
    class="focus:outline-none inline-flex items-center w-full p-2 text-sm space-x-2"
    exact-active-class="bg-purple-100 border-l-2 text-purple-500 font-semibold border-purple-500"
    :to="to"
    :class="{
      'hover:bg-purple-500 hover:text-white': true,
    }"
  >
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    to: {
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
