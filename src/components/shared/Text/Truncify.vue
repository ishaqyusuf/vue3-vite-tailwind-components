<template>
  <div class="truncate w-full">
    <div class="overflow-x-hidden whitespace-nowrap overflow-ellipsis">
      <slot>
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    value: String,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
