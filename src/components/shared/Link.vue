<template>
  <router-link :to="to" class="link-style">
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
