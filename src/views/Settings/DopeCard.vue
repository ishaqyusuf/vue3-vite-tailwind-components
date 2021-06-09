<template>
  <Card class="border divide-y">
    <div v-if="!hideHead" class="inline-flex items-center pr-4 justify-between">
      <div class="py-2 opacity-70">
        <CardTitle v-if="title" flat-t lg>{{ title }}</CardTitle>
        <CardSubtitle v-if="subtitle" class="pb-0">{{ subtitle }}</CardSubtitle>
      </div>
      <slot name="action"></slot>
    </div>
    <CardContent class="py-4">
      <slot></slot>
    </CardContent>
  </Card>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    hideHead: Boolean,
    title: String,
    subtitle: String,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
