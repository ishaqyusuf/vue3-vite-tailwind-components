<template>
  <slot v-if="!client || !client.id" name="emtpy">
    <Btn tertiary>Add Client</Btn>
  </slot>
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
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    client: { type: Object },
    dense: Boolean,
    sm: Boolean,
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
