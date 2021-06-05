<template>
  <RadioItem class="cursor-pointer" v-bind="$props">
    <template v-slot:default="{ active, checked }">
      <div class="inline-flex space-x-2">
        <i-mdi-radiobox-blank class="text-gray-500" v-if="!checked" />
        <i-mdi-radiobox-marked class="text-blue-500" v-else />
        <Label class="">
          <slot :active="active" :checked="checked"></slot>
        </Label>
      </div>
    </template>
  </RadioItem>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    value: [String, Number, Object, Boolean],
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
