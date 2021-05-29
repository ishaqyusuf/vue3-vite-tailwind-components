<template>
  <router-link :to="to">
    <MenuItem>
      <slot />
    </MenuItem>
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
