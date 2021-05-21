<template>
  <div class="rounded-lg absolute origin-bottom-left">
    <div v-for="(item, index) in results" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import input from "@/hooks/input";
export default {
  props: {
    ...input.props,
    results: { type: Array, required: true },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
