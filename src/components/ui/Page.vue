<template>
  <div class="py-4 flex justify-center bg-gray-50">
    <div class="sm:w-11/12" :class="[]">
      <v-label big block>{{ title }}</v-label>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {},
    sub: {},
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
