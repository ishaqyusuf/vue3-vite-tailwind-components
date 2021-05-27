<template>
  <router-link
    :to="to"
    exact-active-class="border-b-4 border-purple-400 text-black-500"
    class="inline-flex text-black-400 space-x-2 items-center p-2 px-3"
  >
    <slot name="icon"></slot>
    <span>
      <slot></slot>
    </span>
  </router-link>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    tab: { type: Object },
    to: {
      type: Object,
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
