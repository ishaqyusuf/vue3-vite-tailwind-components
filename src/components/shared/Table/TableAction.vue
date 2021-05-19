<template>
  <Container
    simple
    class="fixed z-50 transform transition-all -translate-y-5 inline-flex origin-bottom justify-between shadow-xl bottom-0 mb-4 w-full p-4 rounded-full bg-black-800 text-gray-50"
  >
    <div class="inline-flex space-x-4 items-center" tertiary>
      <Btn icon><i-mdi-close class="text-black-200" /></Btn>
      <div class="space-x-3">
        <span class="rounded-full px-2 bg-black-400 text-sm">{{
          selection
        }}</span>
        <span>items selected</span>
      </div>
    </div>
    <div class="space-x-4">
      <Btn dark rounded large color="gray-700">
        <i-mdi-dots-horizontal />
        <span>More</span>
      </Btn>
      <Btn dark rounded large color="gray-700">
        <i-mdi-printer />
        <span>Print</span>
      </Btn>
      <Btn dark rounded large color="gray-700">
        <i-mdi-pencil-outline />
        <span>Edit</span>
      </Btn>
      <Btn dark rounded large color="red-700">
        <i-mdi-trash-can-outline />
        <span>Delete</span>
      </Btn>
    </div>
  </Container>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  props: {
    items: Object,
  },
  setup(props, { emit }) {
    return {
      selection: props.items.filter((i) => i.checked).length,
    };
  },
};
</script>

<style scoped></style>
