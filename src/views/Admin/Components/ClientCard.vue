<template>
  <slot v-if="!client" name="empty"></slot>
  <div v-else class="inline-flex items-center space-x-4">
    <Avatar></Avatar>
    <div class="">
      <Label>{{ client.full_name }}</Label>
      <Truncify class="text-sm">{{ client.email }}</Truncify>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, toRef, watch } from "vue";
import { Recipient } from "@/@types/Interface";
export default {
  props: {
    client: { type: Object },
  },
  setup(props, { emit }) {
    watch(props, (value, old) => {});
    return {};
  },
};
</script>

<style scoped></style>
