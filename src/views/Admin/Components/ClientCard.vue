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
      <Avatar v-bind="$props"></Avatar>
      <div class="">
        <Label>{{ client.full_name }}</Label>
        <Truncify class="text-sm text-gray-500">{{ client.email }}</Truncify>
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
    sm: Boolean,
  },
  setup(props, { emit }) {
    watch(props, (value, old) => {});
    return {};
  },
};
</script>

<style scoped></style>
