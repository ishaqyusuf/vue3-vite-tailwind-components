<template></template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    dataId: { type: Number, required: true },
    lsHook: { type: Object, required: true },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
