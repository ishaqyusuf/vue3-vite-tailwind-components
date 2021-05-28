<template>
  <div>
    <slot v-if="!client || !client.id" name="empty"></slot>
    <div
      v-else
      class="inline-flex items-center"
      :class="{
        'space-x-4': !dense,
        'space-x-2': dense,
      }"
    >
      <Avatar></Avatar>
      <div class="">
        <Label>{{ client.full_name }}</Label>
        <Truncify class="text-sm">{{ client.email }}</Truncify>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, toRef, watch } from "vue";
import { Recipient } from "@/@types/Interface";
export default {
  props: {
    client: { type: Object, required: true },
    dense: Boolean,
  },
  setup(props, { emit }) {
    watch(props, (value, old) => {});
    return {};
  },
};
</script>

<style scoped></style>
