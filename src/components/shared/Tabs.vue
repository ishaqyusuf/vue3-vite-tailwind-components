<template>
  <Card class="">
    <div class="inline-flex space-x-2 items-start px-4">
      <slot>
        <TabItem
          v-for="(item, index) in items"
          :tab="item"
          :key="index"
        ></TabItem>
      </slot>
    </div>
  </Card>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    items: { type: Array },
  },
  setup(props, { emit }) {
    return {};
  },
};
</script>

<style scoped></style>
