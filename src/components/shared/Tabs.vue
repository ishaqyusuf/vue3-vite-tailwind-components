<template>
  <div class="inline-flex space-x-2">
    <TabItem v-for="(item, index) in items" :tab="item" :key="index"></TabItem>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    items: { type: Array, required: true },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
