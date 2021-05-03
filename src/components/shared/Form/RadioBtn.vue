<template>
  <i-mdi-loading v-if="isLoading" />
  <span>{{ label }}</span>
</template>

<script lang="ts">
import { computed, ref } from "vue";

export default {
  props: {
    loading: Boolean,
    label: String,
  },
  setup(props, { emit }) {
    return {
      isLoading: computed(() => props.loading),
    };
  },
};
</script>

<style scoped></style>
