<template>
  <div
    class="rounded-md p-4 sm:col-span-3 sm:p-6 inline-flex justify-between items-center"
    :class="[`bg-${item.color}-100`]"
  >
    <div class="rounded-lg p-2" :class="[`bg-${item.color}-400`]">
      <div
        :class="[`bg-${item.color}-200`]"
        class="w-8 h-8 rounded-full text-gray-100 inline-flex items-center justify-center"
      >
        <slot name="icon"> <i-mdi-receipt /></slot>
      </div>
    </div>
    <div class="inline-flex flex-col items-center">
      <span class="text-sm">
        <slot name="title" :item="item">
          {{ item.title }}
        </slot>
      </span>
      <span class="font-semibold text-xl">
        <slot name="value" :item="item">
          <slot name="value_prefix"> </slot>
          <span>{{ item.value }}</span>
          <slot name="value_prefix"> </slot>
        </slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    item: { type: Object, required: true },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
